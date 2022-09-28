import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <HomePage /> } />
          <Route path="/signup" element={ <SignUp /> } />
          <Route path="/login" element={ <Login /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
