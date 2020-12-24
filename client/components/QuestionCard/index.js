import React from "react";

function QuestionCard(props) {
  return (
    <>
      <div>
        <h3
          dangerouslySetInnerHTML={{
            __html: `Q${props.count + 1}. ${props.question}`,
          }}
        />

        <section>
          {props.options.map((o, i) => {
            return (
              <label key={i}>
                <input type="radio" value={o} name={props.id} />
                <span>{o}</span>
              </label>
            );
          })}
        </section>
      </div>

      <style jsx>{`
        div {
          padding: 1rem;
          box-shadow: 0 0.6px 10.9px rgba(0, 0, 0, 0.011),
            0 1.5px 26.3px rgba(0, 0, 0, 0.016),
            0 2.9px 49.5px rgba(0, 0, 0, 0.02),
            0 5.1px 88.2px rgba(0, 0, 0, 0.024),
            0 9.6px 165px rgba(0, 0, 0, 0.029), 0 23px 395px rgba(0, 0, 0, 0.04);
          margin: 2rem 0;
          border-radius: 0.3rem;
        }

        h3 {
          margin-top: 0;
          font-weight: 400;
          line-height: 1.7;
        }

        label {
          position: relative;
          display: inline-block;
          margin: 0.3rem;
        }

        input {
          position: absolute;
          margin: 0;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
          cursor: pointer;
        }

        span {
          padding: 0.5rem 1rem;
          display: inline-block;
          min-width: 80px;
          text-align: center;
          border: 1px solid lightgray;
          border-radius: 0.4rem;
        }

        input:checked ~ span {
          background: #3381fb;
          color: #fff;
          border-color: #3381fb;
        }
      `}</style>
    </>
  );
}

export default QuestionCard;
