import React from "react";

function ErrorView(props) {
  return (
    <>
      <section>
        <p>
          <span>{props.error.code || "ERROR"}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
          {props.error.message || "SOMETHING WENT WRONG"}
        </p>
      </section>

      <style jsx>{`
        section {
          padding: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
          text-transform: uppercase;
        }

        span {
          color: red;
        }
      `}</style>
    </>
  );
}

export default ErrorView;
