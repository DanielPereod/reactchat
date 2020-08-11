import React, { useContext, useEffect, useState } from "react";
import { getChats, getUser } from "../firebase/helpers";

import { User } from "../App";
import LoadScreen from "./LoadScreen";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";

export default function Chats() {
  const { user } = useContext(User);
  const [chats, setChats] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState(null);

  const getChatList = () => {
    getUser(user.uid, (res) => {
      getChats(res.chats, (res) => {
        chats.push(res.data());
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    getChatList();
  }, []);

  if (Loading) {
    return <LoadScreen />;
  }
  return (
    <div className="friends-box">
      <ChatList chats={chats} user={user} setCurrentChat={setCurrentChat} />
      <Chat user={user} currentChat={currentChat} />
    </div>
  );
}
