import mongoose from "mongoose";

const schema = new mongoose.Schema({
  question: { type: String, required: true, unique: true },
  options: [String],
  correct_answer: { type: String, required: true },
  partOf: { type: mongoose.ObjectId, required: true },
});

const model = mongoose.model("Question", schema);
export default model;
