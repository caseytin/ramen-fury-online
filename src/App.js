import React, { useState } from "react";
import "./App.css";

import useDeck from "./useDeck";

function App() {
  const { deck, lastCard, handleDraw } = useDeck();

  return (
    <div className="App">
      <button onClick={handleDraw}>draw</button>
      <div>last card drawn: {lastCard}</div>
      <div>cards in deck: {deck.length}</div>
    </div>
  );
}

export default App;
