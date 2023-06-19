import React, { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/login";
import Reset from "./components/Reset Password/Reset";
import Overview from "./pages/home/Overview";
import Customers from "./pages/Customers/Customers";
import Team from "./pages/Team/Team";
import Hardware from "./pages/Hardware/Hardware";
import Defaults from "./pages/Layouts/Defaults";
import Single from "./pages/singlle/Single";
import New from "./pages/new/New";
import Finishes from "./pages/Finishes/Finishes";
import Estimates from "./pages/Estimates/Estimates";
import AppRoutes from "./components/ProtectedRoute/AppRoutes";
import AuthVerify from "./components/ProtectedRoute/AuthVerify";
import { useDispatch } from "react-redux";
import { logoutHandler } from "./redux/userAuth";

function App() {
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logoutHandler());
  }, [dispatch]);
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Overview />} />
            <Route path="login" element={<Login />} />
            <Route path="Extimates" element={<Estimates />} />

            <Route path="Customers">
              <Route index element={<Customers />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
            <Route path="Team" element={<Team />} />
            <Route path="Hardware" element={<Hardware />} />
            <Route path="Finishes" element={<Finishes />} />

            <Route path="Defaults" element={<Defaults />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <AppRoutes />
        <AuthVerify logOut={logOut} />
      </BrowserRouter>
      {/* {
         CurrentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Reset onFormSwitch={toggleForm} />
          } */}
    </div>
  );
}

export default App;

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/login" component={Login} />
//         <ProtectedRoute
//           paths={['/dashboard', '/profile']}
//           component={Dashboard}
//         />
//         <ProtectedRoute
//           paths={['/profile']}
//           component={Profile}
//         />
//         <Route path="*">
//           <Redirect to="/login" />
//         </Route>
//       </Switch>
//     </Router>
//   );
// };

// export default App;
