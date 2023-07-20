import { useEffect, useState } from "react";

const ProtectedRoute = ({ component: Component, paths, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      setIsAuthenticated(false);
      return;
    }



    setIsAuthenticated(true);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default ProtectedRoute;
