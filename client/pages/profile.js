import React, { useEffect, useState, useRef } from "react";
import MainView from "../components/MainView";
import HTTP from "../utils/xhr.js";
import Nav from "../components/Nav";

function Profile(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    new HTTP()
      .getUserProfile()
      .then((r) => {
        setUser(r.data);
      })
      .catch((err) => {
        setUser(null);
        console.error(err.message);
      });
  }, []);

  return (
    <>
      <Nav />

      <MainView>
        {(user && user.username && `${user.username} is currently logged-in`) ||
          "Something Went Wrong while Fetching the User"}
      </MainView>
    </>
  );
}

export default Profile;
