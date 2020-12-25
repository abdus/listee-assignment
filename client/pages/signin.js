import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import MainView from "../components/MainView";
import HTTP from "../utils/xhr.js";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/Nav";

function Quiz(props) {
  const formRef = useRef(null);
  return (
    <>
      <Nav />
      <ToastContainer />

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
                  username: formData.get("username"),
                  password: formData.get("password"),
                })
                .then(() => {
                  toast.dark("🦄 Login Successful.", {
                    position: "top-center",
                  });

                  window.location.href = "/";
                })
                .catch((e) => {
                  toast.error(e.message, {
                    position: "top-center",
                  });
                });
            }}
          >
            LogIn
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const formData = new FormData(formRef.current);
              const server = new HTTP();

              server
                .signUp({
                  username: formData.get("username"),
                  password: formData.get("password"),
                })
                .then(() => {
                  toast.dark("🦄 Account Created. Please SignIn", {
                    position: "top-center",
                  });
                })
                .catch((e) => {
                  toast.error(e.message, {
                    position: "top-center",
                  });
                });
            }}
          >
            SignUp
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

          button {
            margin-right: 0.5rem;
            cursor: pointer;
          }
        `}</style>
      </MainView>
    </>
  );
}

export default Quiz;
