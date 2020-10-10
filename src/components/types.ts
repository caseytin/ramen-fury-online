export type Player = {
  sid: string; // player's socket ID
  username: string; // readable username for the player
};

export type GameState = {
  leader: string; // room leader's socket ID
  started: boolean; // whether the game has begun
  turnOrder?: Player[]; // player turn order
  turnIndex?: number; // keeping track of whose turn it is
};
