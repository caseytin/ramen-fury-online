type Player = {
  sid: string; // player's socket ID
  username: string; // readable username for the player
};

type GameState = {
  leader: string; // room leader's socket ID
};

const io = require("socket.io")();

// a mapping from room IDs to players in that room
const openRooms = new Map<string, Set<Player>>([]);

// a mapping from client socket IDs to usernames
const usernames = new Map<string, string>([]);

// a mapping from room IDs to game states in those rooms
const gameStates = new Map<string, GameState>([]);

// gives a list of usernames in the given room
function constructPlayerlist(room: string): Array<string> {
  const playerSet = openRooms.get(room);
  if (playerSet == null) {
    return [];
  }
  const playerArray = Array.from(playerSet.values());
  return playerArray.map((player) => player.username);
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
    gameStates.set(room, { leader: socket.id });
  }

  socket.join(room);

  const playerlist = constructPlayerlist(room);
  const leader = gameStates.get(room)!.leader;

  io.in(room).emit("room update", {
    playerlist,
    leader,
  });
}

// updates server's state of rooms whenever a player leaves a room
function handleDisconnecting(socket: SocketIO.Socket) {
  for (let room of Object.keys(socket.rooms)) {
    const players = openRooms.get(room);
    if (players == null) {
      continue;
    }

    const isLeader = gameStates.get(room)!.leader === socket.id;

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
      gameStates.set(room, { leader: newLeader.sid });
    }

    const playerlist = constructPlayerlist(room);
    const leader = gameStates.get(room)!.leader;

    io.in(room).emit("room update", {
      playerlist,
      leader,
    });
  }
}

// runs every time a new client connects to the server
io.on("connection", (socket: SocketIO.Socket) => {
  socket.on("join", (room: string, username: string) =>
    handleJoin(socket, room, username)
  );
  socket.on("disconnecting", () => handleDisconnecting(socket));
});

const port = 8000;
io.listen(port);
console.log(`socket.io server running on port ${port}`);
