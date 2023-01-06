import React, {useContext} from "react";
import { ChatContext } from "../context/ChatContext";
import Address from "./Address";

const Navbar = () => {
  const {logoutUser} = useContext(ChatContext);
  return (
    <div className="navbar">
      <span className="logo"><Address /></span>
      <div className="user">
        <button onClick={logoutUser}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;