import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  difficulty: { type: String, required: true, unique: true },
});

const model = mongoose.model("Quiz", schema);
export default model;
