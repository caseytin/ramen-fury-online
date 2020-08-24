import React from "react";

import styled from "styled-components";

import { CardInfo as CardProps } from "../utils/cards";

const CardWrapper = styled.div`
  margin: 20px;
  padding: 20px;
  width: 200px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
`;

export default function Card(props: CardProps) {
  const { name, isMeat, isVeggie, isFlavor } = props;

  return (
    <CardWrapper>
      <Title>{name}</Title>
      <div>meat? {`${isMeat}`}</div>
      <div>veggie? {`${isVeggie}`}</div>
      <div>flavor? {`${isFlavor}`}</div>
    </CardWrapper>
  );
}
