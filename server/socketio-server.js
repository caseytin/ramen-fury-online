"use strict";
var io = require("socket.io")();
// a mapping from room IDs to players in that room
var openRooms = new Map([]);
// a mapping from client socket IDs to usernames
var usernames = new Map([]);
// gives a list of usernames in the given room
function constructPlayerlist(room) {
    var playerSet = openRooms.get(room);
    if (playerSet == null) {
        return [];
    }
    var playerArray = Array.from(playerSet.values());
    return playerArray.map(function (player) { return player.username; });
}
// updates server's state of rooms whenever a player joins a room
function handleJoin(socket, room, username) {
    var players = openRooms.get(room);
    var player = {
        sid: socket.id,
        username: username,
    };
    if (players != null) {
        players.add(player);
    }
    else {
        openRooms.set(room, new Set([player]));
    }
    socket.join(room);
    var playerlist = constructPlayerlist(room);
    io.in(room).emit("playerlist update", playerlist);
}
// updates server's state of rooms whenever a player leaves a room
function handleDisconnecting(socket) {
    var _loop_1 = function (room) {
        var players = openRooms.get(room);
        if (players == null) {
            return "continue";
        }
        players.forEach(function (player) {
            if (socket.id === player.sid) {
                players.delete(player);
            }
        });
        if (players.size === 0) {
            openRooms.delete(room);
        }
        var playerlist = constructPlayerlist(room);
        io.in(room).emit("playerlist update", playerlist);
    };
    for (var _i = 0, _a = Object.keys(socket.rooms); _i < _a.length; _i++) {
        var room = _a[_i];
        _loop_1(room);
    }
}
// runs every time a new client connects to the server
io.on("connection", function (socket) {
    socket.on("join", function (room, username) {
        return handleJoin(socket, room, username);
    });
    socket.on("disconnecting", function () { return handleDisconnecting(socket); });
});
var port = 8000;
io.listen(port);
console.log("listening on port " + port);
