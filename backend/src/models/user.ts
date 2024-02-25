import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: { type: String},
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true, select:false },
  password: { type: String, required: true, select: false }, // if not using OAuth exclusively
  age: { type: Number },
  weight: { type: Number }, // Specify units (lbs/kg)
  sex: { type: String },
  bestSquat: { type: Number },
  bestBenchPress: { type: Number },
  bestDeadlift: { type: Number },
  bestTotal: { type: Number },
  squatGoal: { type: Number },
  benchPressGoal: { type: Number },
  deadliftGoal: { type: Number },
  totalGoal: { type: Number },
  googleId: { type: String }, // Store Google ID if using Google OAuth
  accessToken: { type: String },
  refreshToken: { type: String },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);

