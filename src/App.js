import React, { useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./components/ProtectedRoute/appRoutes";
import AuthVerify from "./components/ProtectedRoute/authVerify";
import { useDispatch } from "react-redux";
import { logoutHandler } from "./redux/userAuth";
import { FetchId } from "./FetchId"; // Import the FetchId component from FetchId.js

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
          <FetchId>
            <AppRoutes />
            <AuthVerify logOut={logOut} />
          </FetchId>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
