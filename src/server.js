const io = require("socket.io")();

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    console.log(`joining room ${room}`);
  });
  socket.emit("hello");
});

const port = 8000;
io.listen(port);
console.log(`listening on port ${port}`);
