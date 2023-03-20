import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";

const Base = styled.div`
  flex: 1 1 auto;
  height: 100%;
`;

const Main = () => {
  return (
    <Base>
      <Header />
    </Base>
  );
};

export default Main;
