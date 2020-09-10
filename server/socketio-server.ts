type Player = {
  sid: string; // player's socket ID
  username: string; // readable username for the player
};

const io = require("socket.io")();

// a mapping from room IDs to players in that room
const openRooms = new Map<string, Set<Player>>([]);

// a mapping from client socket IDs to usernames
const usernames = new Map<string, string>([]);

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
  }

  socket.join(room);

  const playerlist = constructPlayerlist(room);
  io.in(room).emit("playerlist update", playerlist);
}

// updates server's state of rooms whenever a player leaves a room
function handleDisconnecting(socket: SocketIO.Socket) {
  for (let room of Object.keys(socket.rooms)) {
    const players = openRooms.get(room);
    if (players == null) {
      continue;
    }

    players.forEach((player) => {
      if (socket.id === player.sid) {
        players.delete(player);
      }
    });

    if (players.size === 0) {
      openRooms.delete(room);
    }

    const playerlist = constructPlayerlist(room);
    io.in(room).emit("playerlist update", playerlist);
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
console.log(`listening on port ${port}`);
