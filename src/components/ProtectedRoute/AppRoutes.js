import { useDispatch, useSelector } from "react-redux";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";

const AppRoutes = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  if(token)
  console.log(token, "token");

  //   const ValidateToken = async (currToken) => {
  //     const resp = await axios({
  //       method: "POST",
  //       url: `${backend}/api/login`,
  //       headers: {
  //         authorization: `Bearer ${currToken}`,
  //       },
  //     })
  //       .then((res) => {
  //         setIsLoading(false);
  //         const checkExpiry = true;
  //         if (checkExpiry) {
  //           dispatch(
  //             settingInitialValues({ userToken: currToken, userLoggedIn: true })
  //           );
  //         } else {
  //           dispatch(logoutHandler());
  //         }
  //       })
  //       .catch((er) => {
  //         dispatch(logoutHandler());
  //       });
  //   };

  //   if (!token) {
  //     dispatch(logoutHandler);
  //   } else {
  //     ValidateToken(token);
  //   }

  return <>{token ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}</>;
};

export default AppRoutes;
