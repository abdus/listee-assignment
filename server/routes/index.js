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
router.post("/isloggedin", authenticateReq, (req, res) =>
  res.json({ message: req.isAuthinticated })
);
router.get("/profile", authenticateReq, (req, res) => {
  if (req.isAuthinticated) {
    req.user.password = req.user.__v = req.user.salt = null;
    console.log(req.user);
    res.json({ message: "success", data: req.user });
  } else {
    res.status(403).json({ message: "you are not logged in" });
  }
});

// get all quiz sets
router.get("/quizes", getAllQuizes);
router.get("/questions/:quizid", authenticateReq, getQuestionByQuizID);

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
  console.log(req.body);

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

    res.json({ correct: counter, total: answers.length });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

export default router;
