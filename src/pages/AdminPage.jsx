import React from "react";
import Header from "../components/adminpage/Header";
import Sidebar from "../components/adminpage/Sidebar";
import styled from "@emotion/styled";
import { Reset } from "styled-reset";
import Main from "../components/adminpage/Main";

const Base = styled.div`
  display: flex;
  height: 100vh;
  @font-face {
    font-family: "NanumSquareNeo-Variable";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "NanumSquareNeo-Variable";
`;

const AdminPage = () => {
  return (
    <Base>
      <Reset />
      <Sidebar />
      <Main>
        <Header />
      </Main>
    </Base>
  );
};

export default AdminPage;
