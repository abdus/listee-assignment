import React, { useEffect, useState, useRef } from "react";
import MainView from "../components/MainView";
import HTTP from "../utils/xhr.js";

function Quiz(props) {
  const formRef = useRef();
  return (
    <>
      <MainView>
        <form ref={formRef} onSubmit={(e) => {}}>
          <h2>Login/Sign-up</h2>

          <label>
            <small>Username</small>
            <input name="username" type="text" required={true} />
          </label>

          <label>
            <small>Password</small>
            <input name="password" type="password" required={true} />
          </label>

          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const formData = new FormData(formRef.current);
              const server = new HTTP();

              server
                .login({
                  username: formData.get("password"),
                  password: formData.get("password"),
                })
                .then(console.log);
            }}
          >
            Submit
          </button>
        </form>
        <style jsx>{`
          form {
            max-width: 20rem;
          }

          label {
            display: flex;
            flex-direction: column;
          }

          input,
          button {
            margin-bottom: 0.7rem;
            padding: 0.5rem 0.9rem;
            font: inherit;
          }
        `}</style>
      </MainView>
    </>
  );
}

export default Quiz;
