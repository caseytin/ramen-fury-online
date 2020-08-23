import React from "react";
import { useParams } from "react-router-dom";

export default function Game() {
  let { id } = useParams();
  return (
    <div>
      <h1>game lobby</h1>
      <div>game id: {id}</div>
    </div>
  );
}
