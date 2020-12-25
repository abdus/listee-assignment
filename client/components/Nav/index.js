import { useEffect, useState } from "react";
import MainView from "../MainView/";
import HTTP from "../../utils/xhr.js";

function Nav(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    new HTTP()
      .isLoggedIn()
      .then((r) => setLoggedIn(r.message))
      .catch((e) => setLoggedIn(false));
  }, []);

  return (
    <>
      <MainView>
        <nav onLoad={() => {}}>
          <div className="logo">QuizApp</div>
          <div className="links">
            <a href={isLoggedIn ? `/profile` : "/signin"}>
              {isLoggedIn ? "Profile" : "SignIn"}
            </a>
            {isLoggedIn && (
              <span
                style={{ marginLeft: "1rem", cursor: "pointer" }}
                onClick={() => {
                  window.sessionStorage.setItem("session_token", "");
                  window.location.href = "/";
                }}
              >
                LogOut
              </span>
            )}
          </div>
        </nav>

        <style jsx>{`
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}</style>
      </MainView>
    </>
  );
}

export default Nav;
