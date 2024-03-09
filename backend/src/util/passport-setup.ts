import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from '../models/user';
import env from "./validateEnv";

// Those values are stored in my .env and imported from validateEnv
const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserModel.findOne({ googleId: profile.id });

    if (!user && profile.emails && profile.emails.length > 0) {
      const email = profile.emails[0].value;
      user = new UserModel({
        username: profile.displayName,
        email: email,
        googleId: profile.id,
      });
      await user.save();
    }

    if (user) {
      done(null, user); // Successfully found or created a user
    } else {
      done(null, false); // User not found or created, authentication failed without an error
    }
  } catch (error) {
    done(error as Error); // Pass the error to Passport
  }
}));

// Disabling ESLint rule for using 'any' due to dynamic user object structure from Passport
// TODO: Refine the user type for better type safety
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => { 
  done(null, user._id.toString());
});

passport.deserializeUser(async (id: string, done) => {
  try {
    // console.log(id);
    const user = await UserModel.findById(id);
    done(null, user ? user : undefined);
    // console.log(user);
  } catch (error) {
    done(error, undefined);
  }
});

export default passport;