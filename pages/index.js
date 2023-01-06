import Login from "./Login";
import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

import ConnectWalletButton from "../components/ConnectWalletButton";
import WrongNetworkMessage from "../components/WrongNetworkMessage";

export default function Home() {
  const {
    correctNetwork,
    networkError,
    isUserLoggedIn,
    connectWallet,
  } = useContext(ChatContext);

  return (
    <div>
      {!isUserLoggedIn && !networkError ? (
        <ConnectWalletButton connectWallet={connectWallet} />
      ) : correctNetwork && !networkError ? (
        <Login />
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  );
}
