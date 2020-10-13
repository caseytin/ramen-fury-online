import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { randomUsername } from "../utils";

import ActiveGame from "./ActiveGame";
import { Lobby } from "./Lobby";
import type { GameState, Card, HandState, Player } from "./types";

export const Game = (props: { socket: SocketIOClient.Socket }) => {
  const { socket } = props;
  let { room } = useParams<{ room: string }>();
  let [username, setUsername] = useState<string>(randomUsername());

  let [playerlist, setPlayerlist] = useState<string[]>([]);
  let [isLeader, setIsLeader] = useState<boolean>(false);

  let [started, setStarted] = useState<boolean>(false);
  let [turnOrder, setTurnOrder] = useState<Player[] | undefined>(undefined);
  let [turnIndex, setTurnIndex] = useState<number | undefined>(undefined);
  let [pantry, setPantry] = useState<Card[] | undefined>(undefined);

  let [hand, setHand] = useState<Card[] | undefined>(undefined);

  useEffect(() => {
    socket.on(
      "lobby update",
      (data: { playerlist: string[]; leader: string }) => {
        setPlayerlist(data.playerlist);
        setIsLeader(data.leader === socket.id);
      }
    );

    socket.on(
      "public state update",
      ({ started, turnOrder, turnIndex, pantry }: GameState) => {
        setStarted(started);
        setTurnOrder(turnOrder);
        setTurnIndex(turnIndex);
        setPantry(pantry);
      }
    );

    socket.on("hand update", ({ hand }: HandState) => {
      setHand(hand);
    });

    socket.emit("join room", room, username);
    // eslint-disable-next-line
  }, []);

  const startGame = () => {
    console.log("game started by room leader!");
    socket.emit("start game", room, username);
  };

  if (started) {
    return (
      <ActiveGame
        username={username}
        turnOrder={turnOrder}
        turnIndex={turnIndex}
        pantry={pantry}
        hand={hand}
      />
    );
  }

  return (
    <Lobby
      username={username}
      room={room}
      playerlist={playerlist}
      isLeader={isLeader}
      startGame={startGame}
    />
  );
};
