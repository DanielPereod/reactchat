import React from "react";
import "./FriendsList.css";

export default function ChatList(props) {
  const { chats, user, setCurrentChat } = props;
  return (
    <div>
      {chats.map((chat, key) => {
        let friend_profile = chat.user_id_1;
        if (chat.user_id_1[0] === user.uid) {
          friend_profile = chat.user_id_2;
        }
        return (
          <button
            key={key}
            className="friend-profile"
            onClick={() => setCurrentChat([chat.chat_id, ...friend_profile])}
          >
            <div className="friend-profile-box">
              <div
                className="friend-image"
                style={{ backgroundImage: `url(${friend_profile[2]})` }}
              ></div>
              <div className="friend-info">
                <div className="friend-name">{friend_profile[1]}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
