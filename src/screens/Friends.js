import React from "react";
import "./Friends.css";
import FriendRequestForm from "../components/FriendRequestForm";
import FriendsList from "../components/FriendsList";

export default function Friends() {
  return (
    <div className="friends-box">
      <FriendsList />
      <FriendRequestForm />
    </div>
  );
}
