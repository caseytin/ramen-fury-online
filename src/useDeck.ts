import { useState } from "react";
import { NUMBER_OF_COPIES, CARD_OBJECTS } from "./utils/cards";
import shuffle from "./utils/shuffle";

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

const makeCard = (card: string) => {
  return { ...CARD_OBJECTS[card] };
};
