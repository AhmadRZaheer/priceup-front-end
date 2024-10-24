import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
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
import { CustomHooks } from "@/utilities/CustomHooks";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SplashScreen from "@/components/ui-components/SplashScreen";
import { getChangeLocation } from "./redux/refetch";


function App() {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const [splashLoadings, setSplashLoadings] = useState(() => localStorage.getItem('splashLoading'));
  const splashLoading = localStorage.getItem('splashLoading')
  const logOut = useCallback(() => {
    dispatch(logoutHandler());
  }, [dispatch]);
  const snackbar = useSelector(selectSnackbar);

  const closeSnackbarHandler = () => {
    dispatch(closeSnackbar());
  };

  const [showSplash, setShowSplash] = useState(true);
  const LocationsRefetch = useSelector(getChangeLocation);

useEffect(()=>{
  if (splashLoading === 'true') {
    localStorage.setItem('splashLoading', 'false');
    setSplashLoadings('false'); 
  } }, [splashLoading,LocationsRefetch]);

  // useEffect(() => {
  //   const navigationEntries = performance.getEntriesByType('navigation');
  //   // Check if it's a full page reload (navigation type 1 or 'reload')
  //   if ((navigationEntries.length > 0 && navigationEntries[0].type === 'reload')) {
  //     setTimeout(() => {
        
  //       setShowSplash(false);
  //     }, 500); // Adjust the splash screen duration
  //   } else {
  //     // Direct route navigation (no splash screen needed)
  //     setShowSplash(false);
  //   }
  // }, []);
 
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
      {splashLoading === 'true' ? (
         <SplashScreen /> 
      ) : (
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={10000}
            transitionDuration={{ enter: 200, exit: 800 }}
          >
            <BrowserRouter>
              <FetchId2>
                <CustomHooks />
                <AppRoutes />
                <AuthVerify logOut={logOut} />
              </FetchId2>
            </BrowserRouter>
          </SnackbarProvider>
        </LocalizationProvider>
      </QueryClientProvider>
      )}
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
