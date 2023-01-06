import React, { useState, useEffect, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Friendlist = () => {
  const {friendsList, getMyFriendList, showMessages, setSelectedUserName} = useContext(ChatContext);

  useEffect(() => {
    getMyFriendList();
  }, []);

  console.log(friendsList);

  return (
    <div className="chats">
      {friendsList.map((item) => (
        <>
          <div
            className="userChat"
            key={item.pubkey}
            onClick={() => {
              showMessages(item.pubkey);
              setSelectedUserName(item.name);
            }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/6070/6070879.png"/>
            <div className="userChatInfo">
              <span>{item.name}</span>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Friendlist;
