import React from "react";
import "./Login.css";
import firebase from "../firebase/config";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  const handleClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .getRedirectResult()
      .then((res) => {
        if (!res.user) {
          firebase.auth().signInWithRedirect(provider);
        } else {
          props.setUser(res.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login">
      <button className="login-button" onClick={handleClick}>
        <div className="google-icon"></div>
        <span className="login-btn-text">Login with Google</span>
      </button>
      <div className="footer">
        <span className="photoby">
          Photo by{" "}
          <a href="https://unsplash.com/@nate_dumlao?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Nathan Dumlao
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/dark?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
        <div className="social">
          <a
            href="https://github.com/DanielPereod/reactchat"
            className="social-icon"
          >
            <div className="github-icon"></div>
            <span>View on Github</span>
          </a>
        </div>
      </div>
    </div>
  );
}
