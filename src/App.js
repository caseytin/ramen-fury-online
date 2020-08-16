import React from "react";
import "./App.css";

import Card from "./Card";
import useDeck from "./useDeck";

function App() {
  const { deck, lastCard, handleDraw } = useDeck();

  return (
    <div className="App">
      <button onClick={handleDraw}>draw</button>
      <div>cards in deck: {deck.length}</div>
      {lastCard && <Card {...lastCard} />}
    </div>
  );
}

export default App;
