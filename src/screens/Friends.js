import React, { useState, useEffect } from "react";
import "./Friends.css";
import FriendRequestForm from "../components/FriendRequestForm";
import FriendsList from "../components/FriendsList";
import LoadScreen from "./LoadScreen";

export default function Friends() {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(false);
  }, [isLoading]);

  if (isLoading) {
    return <LoadScreen />;
  }
  return (
    <div className="friends-box">
      <FriendsList setisLoading={setisLoading} />
      <FriendRequestForm setisLoading={setisLoading} />
    </div>
  );
}
