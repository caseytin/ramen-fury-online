import React from "react";

import { Hand } from "./Hand";
import { Pantry } from "./Pantry";
import { TurnList } from "./TurnList";
import type { Card, Player } from "../types";

type Props = {
  username?: string;
  turnOrder?: Player[];
  turnIndex?: number;
  pantry?: Card[];
  hand?: Card[];
};

export const ActiveGame = ({
  username,
  turnOrder,
  turnIndex,
  pantry,
  hand,
}: Props) => {
  return (
    <>
      <div>you are: {username}</div>
      {turnOrder != null && turnIndex != null && (
        <TurnList turnOrder={turnOrder} turnIndex={turnIndex} />
      )}
      {pantry && <Pantry pantry={pantry} />}
      {hand && <Hand hand={hand} />}
    </>
  );
};
