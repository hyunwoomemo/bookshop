import React from "react";
import styled from "@emotion/styled";
import { RxAvatar } from "react-icons/rx";

const Base = styled.div`
  width: 250px;
  background-color: #282e33;
  color: #fff;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Administrator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid white;
  width: 100%;
  padding: 3rem;
`;

const Avatar = styled.span`
  color: gray;
  width: 45px;
  height: 45px;

  > svg {
    width: 100%;
    height: 100%;
  }
`;

const Name = styled.p``;

const Sidebar = () => {
  return (
    <Base>
      <Administrator>
        <Avatar>
          <RxAvatar />
        </Avatar>
        <Name>hyunwoo.lee</Name>
      </Administrator>
    </Base>
  );
};

export default Sidebar;
