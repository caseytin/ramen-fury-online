const io = require("socket.io")();

const openRooms = new Map();

function handleJoin(socket, room) {
  if (openRooms.has(room)) {
    openRooms.get(room).set(socket.id, true);
  } else {
    const newMap = new Map([[socket.id, true]]);
    openRooms.set(room, newMap);
  }
  socket.join(room);
  const playerlist = Array.from(openRooms.get(room).keys());
  io.in(room).emit("playerlist update", playerlist);
}

function handleDisconnecting(socket) {
  for (let room of Object.keys(socket.rooms)) {
    if (openRooms.has(room)) {
      const players = openRooms.get(room);
      players.delete(socket.id);
      if (players.size === 0) {
        openRooms.delete(room);
      }
    }
  }
}

io.on("connection", (socket) => {
  socket.on("join", (room) => handleJoin(socket, room));
  socket.on("disconnecting", () => handleDisconnecting(socket));
});

const port = 8000;
io.listen(port);
console.log(`listening on port ${port}`);
