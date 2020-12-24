import mongoose from "mongoose";
import "../config/env.js";
import User from "./user.model.js";
import Question from "./question.model.js";
import Quiz from "./quizSet.model.js";

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to databse"))
  .catch((err) => console.log(`database error: ${err.message}`));

export { User, Question, Quiz };
