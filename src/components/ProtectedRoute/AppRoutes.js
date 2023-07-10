import { parseJwt } from "./AuthVerify";
import AuthenticatedRoutesAdmin from "./AuthenticatedRoutes";
import AuthenticatedRouteStaff from "./AuthenticatedRoutesStaff";
import AuthenticatedRouteSuperAdmin from "./AuthenticatedRoutesSuperAdmin";
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
    } else if (decodedToken?.role === "admin")
      return <AuthenticatedRoutesAdmin />;
    else if (decodedToken?.role === "super_admin")
      return <AuthenticatedRouteSuperAdmin />;
  }
};

export default AppRoutes;
