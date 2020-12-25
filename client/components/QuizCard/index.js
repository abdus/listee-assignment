import React from "react";

function QuizCard(props) {
  return (
    <>
      <a href={`/quiz?id=` + (props.id || "")}>
        <h3>{props.name}</h3>
        <span>{props.difficulty}</span>
      </a>

      <style jsx>{`
        a {
          margin: 0.2rem;
          padding: 1rem;
          width: 250px;
          border-radius: 0.6rem;
          box-shadow: 0 0.8px 3.8px rgba(0, 0, 0, 0.02),
            0 1.9px 9.2px rgba(0, 0, 0, 0.028),
            0 3.5px 17.3px rgba(0, 0, 0, 0.035),
            0 6.3px 30.8px rgba(0, 0, 0, 0.042),
            0 11.7px 57.7px rgba(0, 0, 0, 0.05),
            0 28px 138px rgba(0, 0, 0, 0.07);
          display: flex;
          flex-direction: column;
          z-index: 100;
          text-decoration: none;
          color: #141414;
          background: #fff;
        }

        @media (max-width: 900px) {
          a {
            width: 100%;
          }
        }

        a h3 {
          margin: 0 0 0.9rem 0;
        }

        a span {
          font-size: 0.7em;
          padding: 0.3rem 0.7rem;
          background: #d1ffd5;
          border-radius: 1rem;
          text-transform: uppercase;
          align-self: start;
        }
      `}</style>
    </>
  );
}

export default QuizCard;
