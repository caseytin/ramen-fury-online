import React from "react";
import styled from "styled-components";

import type { Card } from "../types";

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 1em;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const CardWrapper = styled.div`
  width: 80px;
  height: 120px;
  border: 1px solid black;
  padding-top: 5px;
  text-align: center;
  margin-right: 1em;
  &:last-child {
    margin-right: 0;
  }
`;

const Title = styled.div`
  font-weight: bold;
  text-align: center;
  margin-bottom: 1em;
`;

const PantryWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

type Props = {
  pantry: Card[];
};

export const Pantry = ({ pantry }: Props) => {
  return (
    <Container>
      <Title>pantry</Title>
      <PantryWrapper>
        {pantry.map((card, index) => (
          <CardWrapper key={index}>{card.name}</CardWrapper>
        ))}
      </PantryWrapper>
    </Container>
  );
};
