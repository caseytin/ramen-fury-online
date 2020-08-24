import React from "react";
import { useHistory } from "react-router-dom";

import { randomString } from "../utils";
import { H1 } from "./typography";

export default function Home(props) {
  const history = useHistory();

  const createRoom = () => {
    const roomCode = randomString();
    history.push(`/g/${roomCode}`);
  };

  return (
    <div>
      <H1>Ramen Fury</H1>
      <button onClick={createRoom}>create room</button>
    </div>
  );
}
