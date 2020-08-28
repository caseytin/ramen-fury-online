import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

function PlayerList(props) {
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

export default function Game(props) {
  const { socket } = props;
  let { room } = useParams();
  let [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("playerlist update", (list) => {
      setPlayers(list);
    });

    socket.emit("join", room);
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
