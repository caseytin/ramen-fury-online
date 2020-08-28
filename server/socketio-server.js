"use strict";
var io = require("socket.io")();
var openRooms = new Map([]);
function handleJoin(socket, room) {
    var players = openRooms.get(room);
    if (players != null) {
        players.add(socket.id);
    }
    else {
        openRooms.set(room, new Set([socket.id]));
    }
    socket.join(room);
    var playerlist = Array.from(openRooms.get(room).values());
    io.in(room).emit("playerlist update", playerlist);
}
function handleDisconnecting(socket) {
    for (var _i = 0, _a = Object.keys(socket.rooms); _i < _a.length; _i++) {
        var room = _a[_i];
        var players = openRooms.get(room);
        if (players == null) {
            continue;
        }
        players.delete(socket.id);
        if (players.size === 0) {
            openRooms.delete(room);
        }
        var playerlist = Array.from(players.keys());
        io.in(room).emit("playerlist update", playerlist);
    }
}
io.on("connection", function (socket) {
    socket.on("join", function (room) { return handleJoin(socket, room); });
    socket.on("disconnecting", function () { return handleDisconnecting(socket); });
});
var port = 8000;
io.listen(port);
console.log("listening on port " + port);
