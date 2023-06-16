import React, { useState } from "react";
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
import Estimates from "./pages/Estimates/Extimates";

function App() {
  const [CurrentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
      {/* {
         CurrentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Reset onFormSwitch={toggleForm} />
          } */}
    </div>
  );
}

export default App;



