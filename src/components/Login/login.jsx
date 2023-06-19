import React, { useState } from "react";
import Logo from "../../Assets/logo.svg";
import "./login.css";
import axios from "axios";
import { backendURL } from "../../utilities/common";
import { loginHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(email);
  // };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("inside login");
    // try {
    axios
      .post(`${backendURL}/users/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("email", email);
        console.log(response.data, "response");
        dispatch(loginHandler(response.data.data));
        // navigate("/estimates");
        window.location.href = "/estimates";
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
    // const token = response.data.data.token;

    //   localStorage.setItem("email", email);
    //   console.log(response.data, "response");
    //   // dispatch(loginHandler(response.data));
    //   // window.location.href = "/estimates";
    // } catch (error) {
    //   console.error("Login failed", error);
    // }
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          margin: "auto",
          background: "#8888",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <img className="logo-img" src={Logo} />
        </div>
        <div className="auth-form-container">
          <h3>Login</h3>
          <form className="login-form">
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
            <button
              onClick={(e) => handleLogin(e)}
              className="login"
              type="submit"
            >
              Login as Admin
            </button>
            <button className="loginAsfield">Login as Field Agent</button>
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
