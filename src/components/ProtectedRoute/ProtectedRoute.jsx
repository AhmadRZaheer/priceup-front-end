import { useEffect, useState } from "react";

const ProtectedRoute = ({ component: Component, paths, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    // Verify the token on the server-side or decode it using the JWT library
    // ...

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
