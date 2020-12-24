import express from "express";
import {
  handleSignup,
  handleSignin,
  authenticateReq,
} from "../controllers/index.js";
import {
  getAllQuizes,
  getQuestionByQuizID,
  findQuestionsByID,
} from "../controllers/quiz.js";

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/signin", handleSignin);

// get all quiz sets
router.get("/quizes", getAllQuizes);
router.get("/questions/:quizid", getQuestionByQuizID);

// handle quiz submit
router.post("/submit", authenticateReq, async (req, res) => {
  if (!req.isAuthinticated) {
    return res.status(403).json({ message: "please login again" });
  }

  const userID = req.user._id;
  const answers = req.body.answers;
  let questionsID = [];
  let questionsFromDB = null;
  let counter = 0;

  for (let i = 0; i < answers.length; i++) {
    questionsID.push(answers[i][0]);
  }

  try {
    questionsFromDB = await findQuestionsByID(questionsID);

    for (let a of answers) {
      questionsFromDB[a];
      if (questionsFromDB[a[0]].correct_answer === a[1]) {
        counter++;
      }
    }

    res.json({ counter });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

export default router;
