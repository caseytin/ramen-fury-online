export type Player = {
  sid: string; // player's socket ID
  username: string; // readable username for the player
};

export type GameState = {
  leader: string; // room leader's socket ID
  started: boolean; // whether the game has begun
  turnOrder?: Player[]; // player turn order
  turnIndex?: number; // keeping track of whose turn it is
  pantry?: Card[]; // cards in the pantry: there should always be four
};

export type Card = {
  name: string;
  isMeat: boolean;
  isVeggie: boolean;
  isFlavor: boolean;
};

export type HandState = {
  hand: Card[];
};
