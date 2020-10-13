import React from "react";
import styled from "styled-components";

import type { Player } from "../types";

const TurnListWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 1em;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const PlayerWrapper = styled.div`
  padding: 3px;
`;

const HighlightedPlayer = styled(PlayerWrapper)`
  font-weight: bold;
  background-color: #b4ecb4;
`;

type Props = {
  turnOrder: Player[];
  turnIndex: number;
};

export const TurnList = ({ turnOrder, turnIndex }: Props) => {
  return (
    <TurnListWrapper>
      {turnOrder.map((player, index) => {
        if (turnIndex === index) {
          return (
            <HighlightedPlayer key={index}>{player.username}</HighlightedPlayer>
          );
        }
        return <PlayerWrapper key={index}>{player.username}</PlayerWrapper>;
      })}
    </TurnListWrapper>
  );
};
