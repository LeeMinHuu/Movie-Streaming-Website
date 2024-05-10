import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [headers, setHeader] = useState("");

  // if (loggedIn) {
  //   // State to hold the authentication token
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const token = user.token;
  // }

  useEffect(() => {
    if (loggedIn) {
      setHeader({
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    // If the token exists, verify it with the auth server to see if it is valid
    fetch("http://localhost:5000/verify", {
      method: "POST",
      headers: {
        "jwt-token": user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn("success" === r.message);
        setUsername(user.username || "");
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              username={username}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />
          }
        />
        <Route path="/browse" element={<Browse headers={headers} />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
