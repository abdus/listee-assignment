import { Question, Quiz } from "../database/index.js";
import mongoose from "mongoose";

export async function getAllQuizes(req, res) {
  try {
    const quiz = await Quiz.find();
    res.json({ message: "success", data: quiz });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      message: "internal server error",
    });
  }
}

export async function getQuestionByQuizID(req, res, next) {
  try {
    const { quizid } = req.params;
    const quiz = await Question.find({
      partOf: mongoose.Types.ObjectId(quizid),
    });
    res.json({ message: "success", data: quiz });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      message: "internal server error",
    });
  }
}

// below function is not a middleware
export async function findQuestionsByID(objectIDs = []) {
  try {
    const data = await Question.find({
      _id: {
        $in: objectIDs.map((id) => {
          return mongoose.Types.ObjectId(id);
        }),
      },
    });

    const questionsMap = {};
    for (let i in data) {
      questionsMap[data[i]._id] = data[i];
    }

    return questionsMap;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}
