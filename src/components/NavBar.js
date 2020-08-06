import React, { useContext } from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";
import firebase from "../firebase/config";
import { User } from "../App";

export default function NavBar() {
  const { user, setUser } = useContext(User);
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    setUser(null);
  };
  return (
    <div className="left-bar">
      <ul>
        <div>
          <Link to="/chats">
            <li className="icon chat-icon"></li>
          </Link>
          <Link to="/friends">
            <li className="icon friend-icon"></li>
          </Link>
        </div>
        <button onClick={logout}>
          <li className="icon logout-icon"></li>
        </button>
      </ul>
    </div>
  );
}
