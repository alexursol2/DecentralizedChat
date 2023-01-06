import React, {useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";

const Messages = ({ message }) => {
  const ref = useRef();

  const {currentAccount, messagesList, showMessages} = useContext(ChatContext);

  useEffect(() => {
    showMessages();
  }, []);

  console.log(messagesList);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="messages">
      {messagesList.map((item) => (
        <>
          <div
            ref={ref}
            key={item.sender}
            className={`message ${
              item.sender.toLowerCase() === currentAccount.toLowerCase() &&
              "owner"
            }`}
          >
            {console.log(item.sender, "sender", currentAccount, "current")}
            <div className="messageInfo">
              <img src="https://cdn-icons-png.flaticon.com/512/6070/6070879.png"/>
              <span>
                {new Date(item.timestamp.toNumber() * 1000).toLocaleTimeString()}
                <br/>
                {new Date(item.timestamp.toNumber() * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="messageContent">
              <p>{item.msg}</p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Messages;
