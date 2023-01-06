import React, {useContext} from "react";
import { ChatContext } from "../context/ChatContext";

const Input = () => {
  const {setMessageInput, sendMessage } =
    useContext(ChatContext);

  return (
    <div className="input">
      <input
        required
        type="text"
        placeholder="Type something..."
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <div className="send">
        <button onClick={sendMessage}><img src="https://i.ibb.co/wKpcJgK/send-message.png"/></button>
      </div>
    </div>
  );
};

export default Input;
