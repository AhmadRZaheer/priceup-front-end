import { parseJwt } from "./AuthVerify";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  const decodedToken = parseJwt(token);
  // console.log(decodedToken.role, "decodedToken-ar");

  if (!token || token === "undefined") {
    console.log("UnAuthenticatedRoutes");
    return <UnAuthenticatedRoutes />;
  } else {
    // Token has a value
    console.log(token, "token token");
    return <AuthenticatedRoutes token={token} />;
  }
};

export default AppRoutes;
