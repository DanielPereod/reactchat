import React, { useEffect, useContext, useState } from "react";
import "./FriendsList.css";

import {
  getUser,
  getFriendList,
  acceptFriendRequest,
  rejectFriendRequest,
  createChat,
} from "../firebase/helpers";
import { User } from "../App";

export default function FriendsList(props) {
  const { user } = useContext(User);
  const { setisLoading } = props;
  const [friendRequestList, setFriendRequestList] = useState([]);

  const handleAcceptRequestButton = (friend) => {
    const frienduid = friend.uid;
    acceptFriendRequest(user.uid, frienduid);
    acceptFriendRequest(frienduid, user.uid);
    console.log(friend);
    createChat(user, friend);
    setisLoading(true);
  };

  const handleRejectRequestButton = (frienduid) => {
    rejectFriendRequest(user.uid, frienduid);
    rejectFriendRequest(frienduid, user.uid);
    setisLoading(true);
  };
  const getFriendRequestList = () =>
    getUser(user.uid, (res) => {
      getFriendList(res.friends, false, (res) => {
        setFriendRequestList((prevState) => [...prevState, res]);
      });
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
            <div className="friend-profile-box">
              <div
                className="friend-image"
                style={{ backgroundImage: `url(${friend.photoURL})` }}
              ></div>
              <div className="friend-info">
                <div className="friend-name">{friend.displayName}</div>
              </div>
            </div>
            <div className="friend-profile-btns">
              <button
                className="accept-request-btn friend-profile-btn"
                onClick={() => handleAcceptRequestButton(friend)}
              >
                Accept
              </button>
              <button
                className="reject-request-btn friend-profile-btn"
                onClick={() => handleRejectRequestButton(friend.uid)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
