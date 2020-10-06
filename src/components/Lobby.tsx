import React from "react";

import { PlayerList } from "./PlayerList";
import { H1 } from "./typography";

type LobbyProps = {
  room: string;
  username: string;
  players: string[];
  isLeader: boolean;
  startGame: () => void;
};

export const Lobby = ({
  room,
  username,
  players,
  isLeader,
  startGame,
}: LobbyProps) => {
  return (
    <div>
      <H1>Game Lobby</H1>
      <div>room id: {room}</div>
      <PlayerList username={username} players={players} />
      {isLeader && (
        <>
          <div>you are the room leader</div>
          <button onClick={startGame}>start game</button>
        </>
      )}
    </div>
  );
};
