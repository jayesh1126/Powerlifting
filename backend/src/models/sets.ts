import { InferSchemaType, Schema, model } from "mongoose";

// Schema for my Set type
const setsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  exerciseName: {type: String, required: true},
  weight: {type: Number, required: true},
  repetitions: {type: Number, required: true},
  rpe: {type: Number, required: true},
  date: {type: Date, required: true},  
});

type Sets = InferSchemaType<typeof setsSchema>;

export default model<Sets>("Sets", setsSchema);

