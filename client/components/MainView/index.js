import React from "react";

function MainView({ children }) {
  return (
    <>
      <main>{children}</main>

      <style jsx>{`
        main {
          max-width: 60rem;
          margin: auto;
          padding: 1rem;
          font-family: 'IBM Plex Sans', sans-serif;
        }
      `}</style>
    </>
  );
}

export default MainView;
