import React from "react";
import type { Card, Player } from "./types";

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
      <div>active game!</div>
      {turnOrder != null && turnIndex != null && (
        <>
          <div>you are: {username}</div>
          <div>
            turn order: {turnOrder.map((player) => player.username).join(", ")}
          </div>
          <div>current turn: {turnOrder[turnIndex].username}</div>
          {hand && (
            <div>your hand: {hand.map((card) => card.name).join(", ")}</div>
          )}
          {pantry && (
            <div>pantry: {pantry.map((card) => card.name).join(", ")}</div>
          )}
        </>
      )}
    </>
  );
};
