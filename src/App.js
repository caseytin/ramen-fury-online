import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from "socket.io-client";

import "./App.css";
import { Home, Game } from "./components";

function App() {
  const socket = io("http://localhost:8000");

  return (
    <Router>
      <Switch>
        <Route path="/g/:id">
          <Game socket={socket} />
        </Route>
        <Route path="/">
          <Home socket={socket} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
