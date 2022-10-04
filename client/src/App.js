import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"
import Game from "./components/Game"
import { UserProvider } from "./context/user"

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
