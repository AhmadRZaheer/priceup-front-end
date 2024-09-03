import React, { useState } from "react";
import Logo from "../../Assets/logo.svg";
import ColorLogo from "../../Assets/LogoIMG.svg";
import "./login.css";
import axios from "axios";
import { backendURL } from "../../utilities/common";
import { loginHandler } from "../../redux/userAuth";
import { useDispatch } from "react-redux";
import Snackbars from "../Modal/snackBar";
import desktopImage from "../../Assets/desktop.svg";
import LoginImg from '../../Assets/LoginImage.svg';
import { showSnackbar } from "../../redux/snackBarSlice";
import { getHomepageURL } from "../../utilities/authentications";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import CustomInputField from "../ui-components/CustomInput";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showSnackbarHandler = (message, severity) => {
    dispatch(showSnackbar({ message, severity }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${backendURL}/login`, {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("email", email);
        dispatch(loginHandler(response.data.data));
        const decodedToken = parseJwt(response.data.data.token);
        const redirection = getHomepageURL(decodedToken);
        window.location.href = redirection;
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
        showSnackbarHandler(errorMessage, "error");
      });
  };

  return (
    <>
      <Stack flexDirection={'row'} sx={{height: '100vh', overflow: 'hidden', width: '100%'}}>      
        <Box sx={{width: '50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Box sx={{width:'409px'}}>            
          <Box sx={{display:'flex',justifyContent:'center'}}>
            <img className="logo-img" src={ColorLogo} />
          </Box>
          <div style={{ marginTop: 30,display:'flex',flexDirection:'column',gap:'20px' }} className="auth-form-container">
            <Typography className='loginTxt'>Login</Typography>
            <Box>
            <form className="login-form" style={{display:'flex',flexDirection:'column',gap:'32px'}}>
              <Box sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
            <Box sx={{display:'flex',flexDirection:'column',gap:'6px'}}>
              <Typography htmlFor="email" className="input-label-text">Email or Username</Typography>
              <CustomInputField
                placeholder="Enter Email or Username"
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box sx={{display:'flex',flexDirection:'column',gap:'6px'}}>
              <Typography  htmlFor="password" className="input-label-text">Password</Typography>
              <CustomInputField
                placeholder="Enter Password"
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Box>
            </Box>
              {/* <label htmlFor="email">Email or Username</label> */}
              {/* <input
              className="custom-textfield"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> */}
              {/* <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}

              <button
                onClick={(e) => handleLogin(e)}
                className="login"
                type="submit"
              >
                Login
              </button>

              {/* <button
              className="loginAsfield"
              onClick={(e) => handleLoginAgent(e)}
            >
              Login as Field Agent
            </button> */}
            </form>
            <Box sx={{display:'flex',justifyContent:'center',mt:'8px'}}>
            <Button
            fullWidth
              className="forget-pass"
              onClick={() => props.onFormSwitch("reset")}
              sx={{p: '10px 18px !important'}}
            >
              Forget Password?
            </Button>
            </Box>
            </Box>
          </div>
          </Box>
        </Box>
        <Box sx={{width: '50%'}}>
          <img width={'100%'} height={'100%'} style={{objectFit:'cover'}} alt="not" src={LoginImg} />
        </Box>
      </Stack>
      {/* <div
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
              Login
            </button>

            {/* <button
              className="loginAsfield"
              onClick={(e) => handleLoginAgent(e)}
            >
              Login as Field Agent
            </button> */}
      {/* </form>
          <button
            className="forget-pass"
            onClick={() => props.onFormSwitch("reset")}
          >
            Forget Password?
          </button>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default Login;
