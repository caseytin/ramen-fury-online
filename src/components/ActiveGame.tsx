import React from "react";
import type { Player } from "./types";

type Props = {
  turnOrder?: Player[];
  turnIndex?: number;
};

export const ActiveGame = ({ turnOrder, turnIndex }: Props) => {
  return (
    <>
      <div>active game!</div>
      {turnOrder != null && turnIndex != null && (
        <>
          <div>
            turn order: {turnOrder.map((player) => player.username).join(", ")}
          </div>
          <div>current turn: {turnOrder[turnIndex].username}</div>
        </>
      )}
    </>
  );
};
