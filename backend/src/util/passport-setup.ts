import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from '../models/user'; // Make sure this path is correct
import env from "./validateEnv"; // Ensure this module correctly loads environment variables

const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => { // Use 'done' to align with Passport's convention
  try {
    let user = await UserModel.findOne({ googleId: profile.id });

    if (!user && profile.emails && profile.emails.length > 0) {
      const email = profile.emails[0].value;
      user = new UserModel({
        username: profile.displayName,
        email: email,
        googleId: profile.id,
        // Add any additional fields you require
      });
      await user.save(); // Explicitly call save for clarity and consistency
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
passport.serializeUser((user: any, done) => { // Keeping 'any' for flexibility, consider refining
  done(null, user._id.toString()); // Ensure '_id' exists on your user model
});

passport.deserializeUser(async (id: string, done) => {
  try {
    // console.log(id);
    const user = await UserModel.findById(id); // No need for .exec() if using async/await
    done(null, user ? user : undefined); // Directly pass 'user' or 'undefined' if not found
    // console.log(user);
  } catch (error) {
    done(error, undefined); // Pass 'undefined' for the user if an error occurs
  }
});

export default passport;