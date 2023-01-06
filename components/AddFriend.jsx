import React, {useContext} from "react";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const { setSearchAccount, searchAndAddFriend } = useContext(ChatContext);

  return (
    <div className="search">
      <div className="searchForm">
        <form onSubmit={searchAndAddFriend}>
          <input
            required
            type="text"
            placeholder="Write the Address to Add Friend"
            onChange={(e) => setSearchAccount(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Search;
