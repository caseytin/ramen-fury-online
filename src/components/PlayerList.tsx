import React from "react";
import styled from "styled-components";

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
  username: string;
  players: Array<string>;
};

export const PlayerList = (props: PlayerListProps) => {
  const { username, players } = props;

  return (
    <PlayerListWrapper>
      <div>players</div>
      <ul>
        {players.map((player) => (
          <li key={player}>
            {username === player ? `${player} (you!)` : `${player}`}
          </li>
        ))}
      </ul>
    </PlayerListWrapper>
  );
};
