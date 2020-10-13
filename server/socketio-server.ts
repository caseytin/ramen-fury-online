// todo: refactor this ugly monolith

const cards = require("./cards.js");
const { NUMBER_OF_COPIES, CARD_OBJECTS } = cards;

type Player = {
  sid: string; // player's socket ID
  username: string; // readable username for the player
};

type GameState = {
  leader: string; // room leader's socket ID
  started: boolean; // whether the game has begun
  turnOrder?: Player[]; // player turn order
  turnIndex?: number; // keeping track of whose turn it is
  pantry?: Card[]; // cards in the pantry: there should always be four
};

const sio = require("socket.io")();

// mapping from room IDs to players in that room
const openRooms = new Map<string, Set<Player>>([]);

// mapping from room IDs to game states in those rooms
const gameStates = new Map<string, GameState>([]);

// mapping from room IDs to private deck info for that room
const privateDecks = new Map<string, Card[]>([]);

// mapping from room IDs to private hand info for that room
const privateHands = new Map<string, Map<string, Card[]>>([]);

// Shuffles an array using the Fisher-Yates shuffle algorithm.
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffle<T>(deck: T[]) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// gives a list of usernames in the given room
function getPlayerList(room: string): Array<string> {
  const playerSet = openRooms.get(room);
  if (playerSet == null) {
    return [];
  }
  const playerArray = Array.from(playerSet.values());
  return playerArray.map((player) => player.username);
}

function getLeader(room: string): string {
  return gameStates.get(room)!.leader;
}

function initializeDeck(): Card[] {
  let initialDeck: Card[] = [];
  for (let cardType in NUMBER_OF_COPIES) {
    for (let i = 0; i < NUMBER_OF_COPIES[cardType]; i++) {
      initialDeck.push(makeCard(cardType));
    }
  }
  return shuffle(initialDeck);
}

function makeCard(cardType: string): Card {
  return { ...CARD_OBJECTS[cardType] };
}

// has the side effect of updating the private deck
function drawFromDeck(room: string): Card | null {
  const deck = privateDecks.get(room);
  if (deck == null || deck.length === 0) {
    return null;
  }

  const deckCopy = [...deck];
  const draw = deckCopy.shift();
  privateDecks.set(room, deckCopy);

  return draw;
}

function getDeck(room: string): Card[] | null {
  const deck = privateDecks.get(room);
  if (deck == null) {
    return null;
  }
  return deck;
}

// updates server's state of rooms whenever a player joins a room
function handleJoin(
  socket: SocketIO.Socket,
  room: string,
  username: string
): void {
  const players = openRooms.get(room);
  const player = {
    sid: socket.id,
    username: username,
  };
  if (players != null) {
    players.add(player);
  } else {
    openRooms.set(room, new Set([player]));
    // make this player the room leader
    gameStates.set(room, { leader: socket.id, started: false });
  }

  socket.join(room);

  const playerlist = getPlayerList(room);
  sio.in(room).emit("lobby update", {
    playerlist,
    leader: getLeader(room),
  });
}

// updates server's state of rooms whenever a player leaves a room
function handleDisconnecting(socket: SocketIO.Socket) {
  for (let room of Object.keys(socket.rooms)) {
    const players = openRooms.get(room);
    if (players == null) {
      continue;
    }

    const isLeader = getLeader(room) === socket.id;

    players.forEach((player) => {
      if (player.sid === socket.id) {
        players.delete(player);
      }
    });

    if (players.size === 0) {
      openRooms.delete(room);
    } else if (isLeader) {
      // pick a new leader
      const newLeader: Player = players.values().next().value;
      gameStates.get(room)!.leader = newLeader.sid;
    }

    const playerlist = getPlayerList(room);
    sio.in(room).emit("lobby update", {
      playerlist,
      leader: getLeader(room),
    });
  }
}

function handleGameStart(
  socket: SocketIO.Socket,
  room: string,
  username: string
) {
  // get the list of players
  const players = Array.from(openRooms.get(room)!.values());

  // make a player turn order
  const turnOrder = shuffle(players);

  // set current turn
  // set status to 'started'
  let state = gameStates.get(room)!;
  state = Object.assign(state, {
    turnOrder,
    turnIndex: 0,
    started: true,
  });

  // initialize the deck
  const newDeck = initializeDeck();
  privateDecks.set(room, newDeck);

  // every player gets three cards each
  const hands = new Map<string, Card[]>([]);
  for (let player of turnOrder) {
    let hand: Card[] = [];
    for (let i = 0; i < 3; i++) {
      const card = drawFromDeck(room);
      hand.push(card);
    }
    hands.set(player.sid, hand);
    sio.to(player.sid).emit("hand update", { hand });
  }
  privateHands.set(room, hands);

  // the pantry gets four cards
  const pantry: Card[] = [];
  for (let i = 0; i < 4; i++) {
    const card = drawFromDeck(room);
    pantry.push(card);
  }
  state = Object.assign(state, { pantry });

  // emit the current game state to all players
  sio.in(room).emit("public state update", state);
}

// runs every time a new client connects to the server
sio.on("connection", (socket: SocketIO.Socket) => {
  socket.on("join room", (room: string, username: string) =>
    handleJoin(socket, room, username)
  );
  socket.on("disconnecting", () => handleDisconnecting(socket));
  socket.on("start game", (room: string, username: string) =>
    handleGameStart(socket, room, username)
  );
});

const port = 8000;
sio.listen(port);
console.log(`socket.io server running on port ${port}`);
