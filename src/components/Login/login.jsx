import React, { useState } from "react";
import Logo from "../../Assets/logo.svg";
import "./login.css";
import axios from "axios";
import { backendURL } from "../../utilities/common";
import { loginHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import Snackbars from "../Modal/snackBar";
import desktopImage from "../../Assets/desktop.svg";
import { showSnackbar } from "../../redux/snackBarSlice";

const Login = (props) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const showSnackbarHandler = (message, severity) => {
    dispatch(showSnackbar({ message, severity }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${backendURL}/users/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("email", email);
        dispatch(loginHandler(response.data.data));
        window.location.href = "/";
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
        showSnackbarHandler(errorMessage, "error");
      });
  };

  const handleLoginAgent = (e) => {
    e.preventDefault();
    axios
      .post(`${backendURL}/staffs/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("email", email);

        dispatch(loginHandler(response.data.data));
        window.location.href = "/staff";
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
        showSnackbarHandler(errorMessage, "error");
      });
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          margin: "auto",
          background: "#8477DA",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${desktopImage})`,
        }}
      >
        <div>
          <img className="logo-img" src={Logo} />
        </div>
        <div style={{ marginTop: 30 }} className="auth-form-container">
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

            <button
              className="loginAsfield"
              onClick={(e) => handleLoginAgent(e)}
            >
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
