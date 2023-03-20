import React from "react";
import styled from "@emotion/styled";

const Header = styled.header`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 38px;
`;

const MoreBtn = styled.button`
  border: none;
  background: none;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:after {
    content: " +";
  }
`;

const ByDate = styled.p`
  font-size: 12px;
  color: #595959;
`;

const SlideHeader = ({ text, today }) => {
  return (
    <Header>
      <Title>{text}</Title>
      {today ? <ByDate>{today}</ByDate> : <MoreBtn>더보기</MoreBtn>}
    </Header>
  );
};

export default SlideHeader;
