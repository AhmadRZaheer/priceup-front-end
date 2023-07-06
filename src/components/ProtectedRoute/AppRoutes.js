import { parseJwt } from "./AuthVerify";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import AuthenticatedRouteStaff from "./AuthenticatedRoutesStaff";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";

const AppRoutes = () => {
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);
  console.log(decodedToken?.role, "parseJwt");

  if (!token || token === "undefined") {
    return <UnAuthenticatedRoutes />;
  } else {
    if (decodedToken?.role === "staff") {
      return <AuthenticatedRouteStaff />;
    } else return <AuthenticatedRoutes />;
  }
};

export default AppRoutes;
