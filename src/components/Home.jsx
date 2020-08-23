import React from "react";

import { useHistory } from "react-router-dom";

import { randomString } from "../utils";

export default function Home(props) {
  const { socket } = props;
  const history = useHistory();

  const createRoom = () => {
    const roomCode = randomString();
    history.push(`/g/${roomCode}`);
  };

  return (
    <div>
      <h1>Ramen Fury</h1>
      <button onClick={createRoom}>create room</button>
    </div>
  );
}
