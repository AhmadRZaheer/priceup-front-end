

import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined") {
    // Token is empty or undefined
    // console.log("UnAuthenticatedRoutes");
    return <UnAuthenticatedRoutes />;
  } else {
    // Token has a value
    // console.log(token, "token token");
    return <AuthenticatedRoutes />;
  }
};

export default AppRoutes;
