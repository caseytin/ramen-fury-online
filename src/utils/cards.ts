type CardInfo = {
  name: string;
  isMeat: boolean;
  isVeggie: boolean;
  isFlavor: boolean;
};

interface Dictionary<T> {
  [key: string]: T;
}

const NUMBER_OF_COPIES: Dictionary<number> = {
  chiliPeppers: 12,
  noriGarnish: 8,
  scallion: 6,
  mushroom: 6,
  corn: 6,
  chashu: 6,
  eggs: 6,
  naruto: 6,
  tofu: 6,
  chickenFlavor: 6,
  shrimpFlavor: 6,
  beefFlavor: 6,
  soySauceFlavor: 6,
  furyFlavor: 3,
};

const CARD_OBJECTS: Dictionary<CardInfo> = {
  chiliPeppers: {
    name: "Chili Peppers",
    isMeat: false,
    isVeggie: false,
    isFlavor: false,
  },
  noriGarnish: {
    name: "Nori Garnish",
    isMeat: false,
    isVeggie: false,
    isFlavor: false,
  },
  scallion: {
    name: "Scallion",
    isMeat: false,
    isVeggie: true,
    isFlavor: false,
  },
  mushroom: {
    name: "Mushroom",
    isMeat: false,
    isVeggie: true,
    isFlavor: false,
  },
  corn: {
    name: "Corn",
    isMeat: false,
    isVeggie: true,
    isFlavor: false,
  },
  chashu: {
    name: "Chashu",
    isMeat: true,
    isVeggie: false,
    isFlavor: false,
  },
  eggs: {
    name: "Eggs",
    isMeat: true,
    isVeggie: false,
    isFlavor: false,
  },
  naruto: {
    name: "Naruto",
    isMeat: true,
    isVeggie: false,
    isFlavor: false,
  },
  tofu: {
    name: "Tofu",
    isMeat: true,
    isVeggie: true,
    isFlavor: false,
  },
  chickenFlavor: {
    name: "Chicken Flavor",
    isMeat: false,
    isVeggie: false,
    isFlavor: true,
  },
  shrimpFlavor: {
    name: "Shrimp Flavor",
    isMeat: false,
    isVeggie: false,
    isFlavor: true,
  },
  beefFlavor: {
    name: "Beef Flavor",
    isMeat: false,
    isVeggie: false,
    isFlavor: true,
  },
  soySauceFlavor: {
    name: "Soy Sauce Flavor",
    isMeat: false,
    isVeggie: false,
    isFlavor: true,
  },
  furyFlavor: {
    name: "Fury Flavor",
    isMeat: false,
    isVeggie: false,
    isFlavor: true,
  },
};

export { NUMBER_OF_COPIES, CARD_OBJECTS };
export type { CardInfo };
