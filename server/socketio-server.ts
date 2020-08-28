const io = require("socket.io")();

const openRooms = new Map<string, Set<string>>([]);

function handleJoin(socket: SocketIO.Socket, room: string): void {
  const players = openRooms.get(room);
  if (players != null) {
    players.add(socket.id);
  } else {
    openRooms.set(room, new Set([socket.id]));
  }

  socket.join(room);
  const playerlist = Array.from(openRooms.get(room)!.values());
  io.in(room).emit("playerlist update", playerlist);
}

function handleDisconnecting(socket: SocketIO.Socket) {
  for (let room of Object.keys(socket.rooms)) {
    const players = openRooms.get(room);
    if (players == null) {
      continue;
    }

    players.delete(socket.id);

    if (players.size === 0) {
      openRooms.delete(room);
    }

    const playerlist = Array.from(players.keys());
    io.in(room).emit("playerlist update", playerlist);
  }
}

io.on("connection", (socket: SocketIO.Socket) => {
  socket.on("join", (room: string) => handleJoin(socket, room));
  socket.on("disconnecting", () => handleDisconnecting(socket));
});

const port = 8000;
io.listen(port);
console.log(`listening on port ${port}`);
