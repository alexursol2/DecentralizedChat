// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract ChatContract {
    event RegisterUser(address addr, string name, string password, bool isUserLoggedIn);
    event LoginUser(bool isUserLoggedIn);
    event LogoutUser(bool isUserLoggedIn);
    event AddFriend(address friend_key, string name);
    event SendMessage(address sender_key, address friend_key, string msg);

    // Each friend is identified by its address and name assigned by the second party
    struct friend {
        address pubkey;
        string name;
    }
    
    // Stores the default name of an user and her friends info
    struct user {
        address addr;
        string name;
        string password;
        bool isUserLoggedIn;
        friend[] friendList;
    }

    // message construct stores the single chat message and its metadata
    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    // Collection of users registered on the application
    mapping(address => user) userList;
    // Collection of messages communicated in a channel between two users
    mapping(bytes32 => message[]) allMessages; // key : Hash(user1,user2)

    // user registration function
    function registerUser( address _address, string memory _name, string memory _password) public returns (bool) {
        require(userList[_address].addr != msg.sender,  "User already exists!"); 
        userList[_address].addr = _address;
        userList[_address].name = _name;
        userList[_address].password = _password;
        userList[_address].isUserLoggedIn = false;
        emit RegisterUser(_address, _name, _password, false);
        return true;
    }

    // user login function
    function loginUser(address _address, string memory _name, string memory _password) public returns (bool){
        require(bytes(userList[_address].name).length > 0, "User is not registered!");
        if (
            keccak256(abi.encodePacked(userList[_address].password)) ==
            keccak256(abi.encodePacked(_password)) && 
            keccak256(abi.encodePacked(userList[_address].name)) ==
            keccak256(abi.encodePacked(_name)) &&
            userList[_address].addr == _address 
        ) {
            userList[_address].isUserLoggedIn = true;
            emit LoginUser(true);
            return userList[_address].isUserLoggedIn;
        } else {
            emit LoginUser(false);
            return false;

        }
    }

    // logout function
    function logoutUser(address _address) public {
        userList[_address].isUserLoggedIn = false;
        emit LogoutUser(false);
    }

    // Returns the default name provided by an user
    function getUsername(address pubkey) external view returns(string memory) {
        require(bytes(userList[pubkey].name).length > 0, "User is not registered!");
        return userList[pubkey].name;
    }

    // Adds new user as your friend with an associated nickname
    function addFriend(address friend_key, string calldata name) external {
//      require(userList[msg.sender].isUserLoggedIn, "Create an account first!");
        require(bytes(userList[friend_key].name).length > 0, "User is not registered!");
        require(msg.sender != friend_key, "Users cannot add themselves as friends!");
        require(checkAlreadyFriends(msg.sender,friend_key) == false, "These users are already friends!");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
        emit AddFriend(friend_key, name);
    }

    // Checks if two users are already friends or not
    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns(bool) {

        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length)
        {
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for(uint i = 0; i < userList[pubkey1].friendList.length; ++i)
        {
            if(userList[pubkey1].friendList[i].pubkey == pubkey2)
                return true;
        }
        return false;
    }

    // A helper function to update the friendList
    function _addFriend(address myadress, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key,name);
        userList[myadress].friendList.push(newFriend);
    }

    // Returns a unique code for the channel created between the two users
    // Hash(key1,key2) where key1 is lexicographically smaller than key2
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32) {
        if(pubkey1 < pubkey2)
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        else
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    // Sends a new message to a given friend
    function sendMessage(address friend_key, string calldata _msg) external {
        require(bytes(userList[friend_key].name).length > 0, "User is not registered!");
        require(checkAlreadyFriends(msg.sender,friend_key), "You are not friends with the given user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
        emit SendMessage(msg.sender, friend_key, _msg);
    }

    // Returns all the chat messages communicated in a channel
    function readMessage(address friend_key) external view returns(message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }
}