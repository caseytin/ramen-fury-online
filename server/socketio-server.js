"use strict";
var sio = require("socket.io")();
// a mapping from room IDs to players in that room
var openRooms = new Map([]);
// a mapping from client socket IDs to usernames
var usernames = new Map([]);
// a mapping from room IDs to game states in those rooms
var gameStates = new Map([]);
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
        // make this player the room leader
        gameStates.set(room, { leader: socket.id });
    }
    socket.join(room);
    var playerlist = constructPlayerlist(room);
    var leader = gameStates.get(room).leader;
    sio.in(room).emit("room update", {
        playerlist: playerlist,
        leader: leader,
    });
}
// updates server's state of rooms whenever a player leaves a room
function handleDisconnecting(socket) {
    var _loop_1 = function (room) {
        var players = openRooms.get(room);
        if (players == null) {
            return "continue";
        }
        var isLeader = gameStates.get(room).leader === socket.id;
        players.forEach(function (player) {
            if (player.sid === socket.id) {
                players.delete(player);
            }
        });
        if (players.size === 0) {
            openRooms.delete(room);
        }
        else if (isLeader) {
            // pick a new leader
            var newLeader = players.values().next().value;
            gameStates.set(room, { leader: newLeader.sid });
        }
        var playerlist = constructPlayerlist(room);
        var leader = gameStates.get(room).leader;
        sio.in(room).emit("room update", {
            playerlist: playerlist,
            leader: leader,
        });
    };
    for (var _i = 0, _a = Object.keys(socket.rooms); _i < _a.length; _i++) {
        var room = _a[_i];
        _loop_1(room);
    }
}
// runs every time a new client connects to the server
sio.on("connection", function (socket) {
    socket.on("join", function (room, username) {
        return handleJoin(socket, room, username);
    });
    socket.on("disconnecting", function () { return handleDisconnecting(socket); });
    socket.on("start game", function (room, username) {
        console.log("game started in room " + room + " by " + username);
    });
});
var port = 8000;
sio.listen(port);
console.log("socket.io server running on port " + port);
