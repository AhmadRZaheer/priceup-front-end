import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/login";

const UnAuthenticatedRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
          </Route>
          <Route path='*' element={<Login />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default UnAuthenticatedRoutes;
