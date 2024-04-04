import React, { useCallback, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./components/ProtectedRoute/appRoutes";
import AuthVerify from "./components/ProtectedRoute/authVerify";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "./redux/userAuth";
import { FetchId2 } from "./utilities/ApiHooks/superAdmin";
import Snackbars from "./components/Modal/snackBar";
import { closeSnackbar, selectSnackbar } from "./redux/snackBarSlice";
import { SnackbarProvider } from "notistack";

function App() {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const logOut = useCallback(() => {
    dispatch(logoutHandler());
  }, [dispatch]);
  const snackbar = useSelector(selectSnackbar);

  const closeSnackbarHandler = () => {
    dispatch(closeSnackbar());
  };
  // Close the snackbar after 3 seconds
  useEffect(() => {
    if (snackbar.open) {
      const timeoutId = setTimeout(() => {
        dispatch(closeSnackbar());
      }, 3000);

      return () => {
        // Clear the timeout when the component unmounts or when the snackbar is closed
        clearTimeout(timeoutId);
      };
    }
  }, [snackbar.open, dispatch]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={10000}
          transitionDuration={{ enter: 200, exit: 800 }}
        >
          <BrowserRouter>
            <FetchId2>
              <AppRoutes />
              <AuthVerify logOut={logOut} />
            </FetchId2>
          </BrowserRouter>
        </SnackbarProvider>
      </QueryClientProvider>

      <Snackbars
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        closeSnackbar={closeSnackbarHandler}
      />
    </div>
  );
}

export default App;
