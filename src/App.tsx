import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";

import { Home, Game } from "./components";

const ContentWrapper = styled.div`
  margin: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: monospace;
`;

const App = () => {
  const socket = io("http://localhost:8000");

  return (
    <Router>
      <ContentWrapper>
        <Switch>
          <Route path="/g/:room">
            <Game socket={socket} />
          </Route>
          <Route path="/">
            <Home socket={socket} />
          </Route>
        </Switch>
      </ContentWrapper>
    </Router>
  );
};

export default App;
