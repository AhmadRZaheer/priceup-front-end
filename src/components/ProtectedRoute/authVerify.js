import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      const decodedJwt = parseJwt(userToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
        window.location.href = '/login';
      }
    }
  }, [location, props]);

  return;
};

export default AuthVerify;
