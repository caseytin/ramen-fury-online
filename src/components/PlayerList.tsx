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

type Props = {
  username: string;
  playerlist: string[];
};

export const PlayerList = (props: Props) => {
  const { username, playerlist } = props;

  return (
    <PlayerListWrapper>
      <div>players</div>
      <ul>
        {playerlist.map((player) => (
          <li key={player}>
            {username === player ? `${player} (you!)` : `${player}`}
          </li>
        ))}
      </ul>
    </PlayerListWrapper>
  );
};
