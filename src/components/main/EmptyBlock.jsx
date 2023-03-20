import styled from "@emotion/styled/macro";
import React from "react";

const Base = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: #e0e0e0;
`;

const EmptyBlock = () => {
  return <Base>Contents block</Base>;
};

export default EmptyBlock;
