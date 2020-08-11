import React, { useEffect, useState } from "react";
import { writeMessage, getMessages } from "../firebase/helpers";
import "./Chat.css";

export default function Chat(props) {
  const { user, currentChat } = props;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState();
  /*   const chat_id = currentChat[0]; */

  const handleSendButton = () => {
    const message = {
      sender_uid: user.uid,
      sender_displayName: user.displayName,
      message: messageText,
    };
    writeMessage(message, currentChat[0]);
  };

  useEffect(() => {
    console.log("RENDER");
    if (currentChat) {
      getMessages(currentChat[0], (res) => {
        const messages = [];
        res.forEach((doc) => {
          messages.push(doc.data());
        });
        setMessages(messages);
      });
    }
  }, [currentChat]);

  if (!currentChat) {
    return <div>Open a new chat</div>;
  }

  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="friend-back"></div>
        <div
          className="friend-image"
          style={{ backgroundImage: `url(${currentChat[3]})` }}
        ></div>
        <div className="friend-name">{currentChat[2]}</div>
      </div>
      <div className="chat-main">
        {messages.map((message, key) => {
          if (message.uid === user.uid) {
            return (
              <div key={key} className="self-message msg">
                {message.message}
              </div>
            );
          } else {
            return <div className="friend-message msg">{message.message}</div>;
          }
        })}
      </div>
      <div className="chat-input">
        <textarea
          onChange={(e) => setMessageText(e.target.value)}
          type="text"
          placeholder="Write a message"
        ></textarea>
        <div>
          <button onClick={handleSendButton}></button>
        </div>
      </div>
    </div>
  );
}
