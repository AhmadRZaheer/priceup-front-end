import React, { useState } from "react";
import Logo from "../../Assets/logo.svg";
import "./login.css";
import axios from "axios";
import { backendURL } from "../../utilities/common";

const Login = (props) => {
  const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(email);
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/users/login`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token); // Store the token in local storage
      // Redirect to the protected dashboard page or any other protected route
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <>
      <div>
        <div>
          <img className="logo-img" src={Logo} />
        </div>
        <div className="auth-form-container">
          <h3>Login</h3>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email or Username</label>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="login" type="button">
              Login as Admin
            </button>
            <button className="loginAsfield" type="submit">
              Login as Field Agent
            </button>
          </form>
          <button
            className="forget-pass"
            onClick={() => props.onFormSwitch("reset")}
          >
            Forget Password?
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
