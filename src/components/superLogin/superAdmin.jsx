import React, { useState } from "react";
import Logo from "../../Assets/logo.svg";
import "./login.css";
import axios from "axios";
import { backendURL } from "../../utilities/common";
import { loginHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import Snackbars from "../Model/SnackBar";

const SuperAdminLogin = (props) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    // try {
    axios
      .post(`${backendURL}/admins/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("email", email);

        console.log(response.data, "response");
        dispatch(loginHandler(response.data.data));
        window.location.href = "/admin";
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
        console.log(error.response.data, "erorrr");
        showSnackbar(errorMessage, "error");
      });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
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
              Login as Super Admin
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

      <Snackbars
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnackbar={closeSnackbar}
      />
    </>
  );
};

export default SuperAdminLogin;
