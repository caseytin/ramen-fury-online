import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { randomUsername } from "../utils";

import { H1 } from "./typography";

const PlayerListWrapper = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  padding: 20px 20px;
  margin: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 300px;
`;

type PlayerListProps = {
  players: Array<string>;
};

function PlayerList(props: PlayerListProps) {
  const { players } = props;

  return (
    <PlayerListWrapper>
      <div>players</div>
      <ul>
        {players.map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ul>
    </PlayerListWrapper>
  );
}

type GameProps = {
  socket: SocketIO.Socket;
};

export default function Game(props: GameProps) {
  const { socket } = props;
  let { room } = useParams<{ room: string }>();

  let [username, setUsername] = useState<string>(randomUsername());
  let [players, setPlayers] = useState<Array<string>>([]);

  useEffect(() => {
    socket.on("playerlist update", (list: Array<string>) => {
      setPlayers(list);
    });

    socket.emit("join", room, username);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <H1>Game Lobby</H1>
      <div>room id: {room}</div>
      <PlayerList players={players} />
    </div>
  );
}
