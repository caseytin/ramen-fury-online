import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Game(props) {
  const { socket } = props;
  let { id } = useParams();

  useEffect(() => {
    socket.emit("join", id);
  });

  return (
    <div>
      <h1>game lobby</h1>
      <div>game id: {id}</div>
    </div>
  );
}
