import styled from "styled-components";

export const H1 = styled.div`
  font-weight: bold;
  font-family: "Do Hyeon", sans-serif;
  font-size: 40px;
`;

export const Text = styled.div`
  text-align: ${({ textAlign }) => textAlign};
  font-family: Verdana, sans-serif;
  font-size: 14px;
`;
