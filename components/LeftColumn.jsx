import React from "react";
import Navbar from "./Navbar"
import AddFriend from "./AddFriend"
import Friendlist from "./Friendlist"

const LeftColumn = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <AddFriend/>
      <Friendlist/>
    </div>
  );
};

export default LeftColumn;
