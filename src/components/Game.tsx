import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { randomUsername } from "../utils";

import { Lobby } from "./Lobby";

export const Game = (props: { socket: SocketIOClient.Socket }) => {
  const { socket } = props;
  let { room } = useParams<{ room: string }>();

  let [username, setUsername] = useState<string>(randomUsername());
  let [isLeader, setIsLeader] = useState<boolean>(false);
  let [players, setPlayers] = useState<Array<string>>([]);

  useEffect(() => {
    socket.on(
      "room update",
      (data: { playerlist: string[]; leader: string }) => {
        setPlayers(data.playerlist);
        setIsLeader(data.leader === socket.id);
      }
    );

    socket.emit("join", room, username);
    // eslint-disable-next-line
  }, []);

  const startGame = () => {
    console.log("game started by room leader!");
    socket.emit("start game", room, username);
  };

  return (
    // todo: show a different component when the game starts
    <Lobby
      room={room}
      username={username}
      players={players}
      isLeader={isLeader}
      startGame={startGame}
    />
  );
};
