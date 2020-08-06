import React, { useEffect, useContext, useState } from "react";
import "./FriendsList.css";

import {
  getFriendsList,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../firebase/helpers";
import { User } from "../App";

export default function FriendsList() {
  const { user } = useContext(User);
  const [friendRequestList, setFriendRequestList] = useState(null);

  const handleAcceptRequestButton = (frienduid) => {
    acceptFriendRequest(user.uid, frienduid);
    acceptFriendRequest(frienduid, user.uid);
  };

  const handleRejectRequestButton = (frienduid) => {
    rejectFriendRequest(user.uid, frienduid);
    rejectFriendRequest(frienduid, user.uid);
  };
  const getFriendRequestList = () =>
    getFriendsList(user.uid, false, (res) => {
      setFriendRequestList(res);
    });
  useEffect(() => {
    getFriendRequestList();
  }, []);

  if (!friendRequestList) {
    return <div></div>;
  }
  return (
    <div className="chats-box">
      <div className="chats-title">
        <span>Friend Requests</span>
      </div>
      <div className="chats">
        {friendRequestList.map((friend, key) => (
          <div key={key} className="friend-profile">
            <div
              className="friend-image"
              style={{ backgroundImage: `url(${friend.photoURL})` }}
            ></div>
            <div className="friend-info">
              <div className="friend-name">{friend.displayName}</div>
            </div>
            <button
              className="accept-request-btn"
              onClick={() => handleAcceptRequestButton(friend.uid)}
            >
              Accept
            </button>
            <button
              className="accept-request-btn"
              onClick={() => handleRejectRequestButton(friend.uid)}
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
