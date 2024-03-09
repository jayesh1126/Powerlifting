import { InferSchemaType, Schema, model } from "mongoose";

// Schema for my user type
const userSchema = new Schema({
  fullName: { type: String},
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true, select:false },
  password: { type: String, required: false, select: false }, // required false since we can log in using google
  age: { type: Number },
  weight: { type: Number },
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
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);

