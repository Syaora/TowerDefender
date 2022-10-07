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
import NavBar from "./components/NavBar"
import NotFound from "./components/NotFound"


function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
