import React, { useEffect, useContext } from "react";
import LeftColumn from "../components/LeftColumn";
import Chat from "../components/RightColumn";
import { ChatContext } from "../context/ChatContext";

function ChatHome() {
  const { connectWallet } = useContext(ChatContext);

  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <div className="home">
      <div className="container">
        <LeftColumn />
        <Chat />
      </div>
    </div>
  );
}

export default ChatHome;
