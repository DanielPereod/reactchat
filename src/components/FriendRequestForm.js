import React, { useState, useContext } from "react";
import "./FriendRequestForm.css";
import { User } from "../App";
import { sendFriendRequest, getFriendByParam } from "../firebase/helpers";

export default function FriendRequestForm(props) {
  const [friendEmail, setFriendEmail] = useState("");
  const { user } = useContext(User);
  const { setisLoading } = props;

  const handleFriendRequestButton = () => {
    setisLoading(true);
    getFriendByParam("email", "==", friendEmail, (res) => {
      sendFriendRequest(user.uid, res.id);
    });
  };
  return (
    <div className="request-form">
      <input
        className="inpt email-inpt"
        type="text"
        placeholder="Search a friend by email"
        value={friendEmail}
        onChange={(e) => setFriendEmail(e.target.value)}
      />
      <button className="btn" onClick={handleFriendRequestButton}>
        Send friend request
      </button>
    </div>
  );
}
