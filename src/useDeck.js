import { useState } from "react";

export default function useDeck() {
  const initialDeck = ["naruto", "beef flavor", "nori", "chili pepper"];
  const [deck, setDeck] = useState(initialDeck);
  const [lastCard, setLastCard] = useState("");

  const handleDraw = () => {
    const deckCopy = [...deck];
    setLastCard(deckCopy.shift());
    setDeck(deckCopy);
  };

  return { deck, lastCard, handleDraw };
}
