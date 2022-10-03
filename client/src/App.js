import { useState } from "react";
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

function App() {
  const [currentUser, setCurrentUser] = useState("")

  const updateUser = (user) => setCurrentUser(user)
  console.log(currentUser)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <HomePage /> } />
          <Route path="/signup" element={ <SignUp updateUser={updateUser} /> } />
          <Route path="/login" element={ <Login updateUser={updateUser} /> } />
          <Route path="/dashboard" element={ <Dashboard currentUser={currentUser} updateUser={updateUser} /> } />
          <Route path="/game" element={ <Game /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
