import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ChatContext } from "../context/ChatContext";

const Register = () => {
  const {
    networkError,
    isUserLoggedIn,
    connectWallet,
    setUsername,
    setPassword,
    registerUser,
  } = useContext(ChatContext);

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">DApp Chat</span>
        <span className="title">Registration</span>
        <form onSubmit={registerUser}>
          <input
            required
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign up</button>
        </form>
        <p>
          You do have an account? <span class="register_login"><Link href="/Login">Login</Link>{" "}</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
