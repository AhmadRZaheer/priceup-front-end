import React, { useCallback } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./components/ProtectedRoute/appRoutes";
import AuthVerify from "./components/ProtectedRoute/authVerify";
import { useDispatch } from "react-redux";
import { logoutHandler } from "./redux/userAuth";
import { FetchId2 } from "./utilities/ApiHooks/superAdmin"

function App() {

  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const logOut = useCallback(() => {
    dispatch(logoutHandler());
  }, [dispatch]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <FetchId2>
            <AppRoutes />
            <AuthVerify logOut={logOut} />
            </FetchId2>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
