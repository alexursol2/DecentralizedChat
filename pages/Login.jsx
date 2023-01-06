import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ChatContext } from "../context/ChatContext";
import Home from ".";
const Login = () => {
  const [err] = useState(false);

  const {
    networkError,
    isUserLoggedIn,
    connectWallet,
    setUsername,
    setPassword,
    loginUser,
  } = useContext(ChatContext);

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      {!isUserLoggedIn && !networkError ? (
        <Home />
      ) : (
        <div className="formContainer">
          <div className="formWrapper">
            <span className="logo">DApp Chat</span>
            <span className="title">Login</span>
            <form onSubmit={loginUser}>
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
              <button type="submit">Sign In</button>
              {err && <span>Something went wrong</span>}
            </form>
            <p>
              You don`t have an account?{" "}
              <span class="register_login"><Link href="/Register">Register</Link></span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
