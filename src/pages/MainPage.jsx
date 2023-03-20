import React, { memo, useEffect } from "react";
import { Reset } from "styled-reset";
import Header from "../components/Header";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Banner from "../components/main/Banner";
import BestBooks from "../components/main/BestBooks";
import EmptyBlock from "../components/main/EmptyBlock";
import NewBooks from "../components/main/NewBooks";
import ChoiceBooks from "../components/main/ChoiceBooks";
import Event from "../components/main/Event";
import { BookGetItem, BookGetList, getCurrentData } from "../slices/BookSlice";
import { useDispatch, useSelector } from "react-redux";

const Base = styled.div`
  @font-face {
    font-family: "NanumSquareNeo-Variable";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "NanumSquareNeo-Variable";
`;

const ServiceList = styled.ul`
  display: flex;
  max-width: 1200px;
  margin: 4rem auto;
  gap: 3rem;
  justify-content: center;
`;

const ServiceItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ServiceBlock = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background-color: #cacaca;
`;

const ServiceName = styled.p`
  font-size: 14px;
`;

const MainPage = memo(() => {
  return (
    <Base>
      <Reset />
      <Header />
      <Banner />
      <ServiceList>
        {[...Array(10)].map((item, i) => (
          <ServiceItem key={i}>
            <ServiceBlock></ServiceBlock>
            <ServiceName>{`Service${i + 1}`}</ServiceName>
          </ServiceItem>
        ))}
      </ServiceList>
      <ChoiceBooks />
      <EmptyBlock />
      <BestBooks />
      <EmptyBlock />
      <NewBooks />
      <EmptyBlock />
      <Event />
    </Base>
  );
});

export default MainPage;
