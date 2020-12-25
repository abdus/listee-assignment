import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import MainView from "../components/MainView";
import ErrorView from "../components/ErrorView";
import QuestionCard from "./../components/QuestionCard";
import HTTP from "../utils/xhr.js";
import Nav from "../components/Nav";

function Quiz(props) {
  const [quizID, setQuizID] = useState(null);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("id");

      if (!id) {
        return setError({ message: "Quiz ID Not Found" });
      }

      setQuizID(id);
    } catch (ex) {
      setError({ message: `Exception while parsing URLSearchParams` });
    }
  }, []);

  // when there's a change in `quizID`,
  // fetch new data for that id
  useEffect(() => {
    const server = new HTTP();
    if (quizID) {
      server
        .getQuestionByQuizId(quizID)
        .then((resp) => setQuestions(resp.data))
        .catch((error) => setError({ message: error.message }));
    }
  }, [quizID]);

  return (
    <>
      <Nav />
      <ToastContainer />

      <MainView>
        <h2>Quiz Name</h2>
        {error && <ErrorView error={error} />}

        {questions && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const server = new HTTP();
              const formData = new FormData(e.target);
              const data = [];
              for (let d of formData) {
                data.push(d);
              }

              server
                .submitQuiz(data)
                .then((res) => {
                  toast.dark(
                    `🦄 ${res.correct} answers are correct, out of ${res.total} attempted questions.`,
                    {
                      position: "top-center",
                    }
                  );
                })
                .catch(console.error);
            }}
          >
            {questions.map((q, i) => (
              <QuestionCard
                key={i}
                count={i}
                id={q._id}
                question={q.question}
                options={q.options}
              />
            ))}
            <button
              style={{ color: "white", background: "blue" }}
              type="submit"
            >
              SUBMIT
            </button>
            <button style={{ color: "white", background: "red" }} type="reset">
              RESET
            </button>

            <style jsx>{`
              button {
                padding: 0.7rem 1.5rem;
                font: inherit;
                margin: 0.5rem;
                border: none;
                border-radius: 0.3rem;
                font-weight: bold;
              }

              div {
                padding: 2rem 0;
                font-size: 1.3em;
              }
            `}</style>
          </form>
        )}
      </MainView>
    </>
  );
}

export default Quiz;
