import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Game(props) {
  const { socket } = props;
  let { room } = useParams();
  let [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("playerlist update", (list) => {
      console.log("ok", list);
      setPlayers(list);
    });

    socket.emit("join", room);
  }, []);

  return (
    <div>
      <h1>game lobby</h1>
      <div>room id: {room}</div>
      <div>players: {players}</div>
    </div>
  );
}
