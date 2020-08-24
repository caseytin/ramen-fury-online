import { useState } from "react";
import { NUMBER_OF_COPIES, CARD_OBJECTS } from "./utils/cards";

export default function useDeck() {
  const initialDeck = initializeDeck();
  const [deck, setDeck] = useState(initialDeck);
  const [lastCard, setLastCard] = useState(null);

  const handleDraw = () => {
    const deckCopy = [...deck];
    setLastCard(deckCopy.shift());
    setDeck(deckCopy);
  };

  return { deck, lastCard, handleDraw };
}

const initializeDeck = () => {
  let initialDeck = [];
  for (let cardType in NUMBER_OF_COPIES) {
    for (let i = 0; i < NUMBER_OF_COPIES[cardType]; i++) {
      initialDeck.push(makeCard(cardType));
    }
  }
  return shuffle(initialDeck);
};

const makeCard = (card) => {
  return { ...CARD_OBJECTS[card] };
};

// Shuffles an array using the Fisher-Yates shuffle algorithm.
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
const shuffle = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
