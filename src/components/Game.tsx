import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { randomUsername } from "../utils";

import { ActiveGame } from "./ActiveGame";
import { Lobby } from "./Lobby";
import type { Player, GameState } from "./types";

export const Game = (props: { socket: SocketIOClient.Socket }) => {
  const { socket } = props;
  let { room } = useParams<{ room: string }>();

  let [username, setUsername] = useState<string>(randomUsername());
  let [isLeader, setIsLeader] = useState<boolean>(false);
  let [started, setStarted] = useState<boolean>(false);
  let [players, setPlayers] = useState<string[]>([]);
  let [turnOrder, setTurnOrder] = useState<Player[] | undefined>(undefined);
  let [turnIndex, setTurnIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    socket.on(
      "lobby update",
      (data: { playerlist: string[]; leader: string }) => {
        setPlayers(data.playerlist);
        setIsLeader(data.leader === socket.id);
      }
    );

    socket.on(
      "state update",
      ({ started, turnOrder, turnIndex }: GameState) => {
        setStarted(started);
        setTurnOrder(turnOrder);
        setTurnIndex(turnIndex);
      }
    );

    socket.emit("join", room, username);
    // eslint-disable-next-line
  }, []);

  const startGame = () => {
    console.log("game started by room leader!");
    socket.emit("start game", room, username);
  };

  if (started) {
    return <ActiveGame turnOrder={turnOrder} turnIndex={turnIndex} />;
  }

  return (
    <Lobby
      room={room}
      username={username}
      players={players}
      isLeader={isLeader}
      startGame={startGame}
    />
  );
};
