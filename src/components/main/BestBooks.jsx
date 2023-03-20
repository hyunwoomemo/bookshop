import React, { useState } from "react";
import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";
import { FaMedal } from "react-icons/fa";
import SlideHeader from "./SlideHeader";

const Base = styled.div`
  position: relative;
`;

const BestBooksList = styled.div`
  margin-top: 3rem;
  max-width: 1200px;
  margin: 5rem auto;
`;

const BestBooksWrapper = styled.div`
  display: flex;
  max-width: 1100px;
  margin: 2rem auto;
  justify-content: center;
  gap: 10rem;
  height: 600px;
`;

const BestBooksGold = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BestBooksGoldImg = styled.img`
  width: 100%;
  margin-bottom: 2rem;
`;

const BestBooksGoldContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const BestBooksGoldMedal = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  left: -10px;
  font-size: 24px;
  font-weight: bold;
  color: goldenrod;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 50%;
`;

const BestBooksGoldContentsName = styled.h1`
  font-size: 24px;
`;

const BestBooksGoldContentsAuthor = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: #595959;
`;

const BestBooksGoldContentsDescription = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #595959;
  line-height: 22px;
  overflow: hidden;
`;

const BestBooksBasic = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: space-around;
  align-self: center;
`;

const BestBooksBasicItem = styled.div`
  width: 26%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;

  &:before {
    content: attr(data-grade);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    text-align: center;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    top: 3px;
    left: 0;
    background-color: #acacac;
    color: #fff;

    ${({ grade }) =>
      grade == 2 || grade == 3
        ? css`
            width: 20px;
            height: 20px;
            font-weight: bold;
            background-color: #f3de69;
          `
        : false}
  }
`;

const BestBooksBasicItemImg = styled.img`
  width: 80%;
  transition: all 0.3s;
`;

const BestBooksBasicItemName = styled.h1`
  font-size: 14px;
`;

const bestBooks = [
  {
    index: "1",
    salesRate: 234,
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791159098253.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
  {
    index: "2",
    salesRate: 4356,
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791190977937.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
  {
    index: "3",
    salesRate: 123,
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791197894527.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
  {
    index: "4",
    salesRate: 43,
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791160949919.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
  {
    index: "5",
    salesRate: 468,
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/211x0/pdt/9791190538510.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
  {
    index: "6",
    salesRate: 4123,
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/211x0/pdt/9788997575169.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
  {
    index: "7",
    salesRate: 4234,
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/211x0/pdt/9788959897094.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
];

const BestBooks = () => {
  const today = `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate() - 1}일 기준`;

  const [isEnter, setIsEnter] = useState(false);

  const handleMouseEnter = (e) => {
    console.log(e.target.src);
    setIsEnter(e.target.src);
  };

  const handleMouseLeave = () => {
    setIsEnter(false);
  };

  return (
    <Base>
      <BestBooksList>
        <SlideHeader text="베스트 도서" today={today} />
        <BestBooksWrapper>
          <BestBooksGold>
            <BestBooksGoldImg src={isEnter ? isEnter : bestBooks[0].img} />
            <BestBooksGoldContents>
              <BestBooksGoldContentsName>{bestBooks[0].name}</BestBooksGoldContentsName>
              <BestBooksGoldContentsAuthor>{bestBooks[0].author}</BestBooksGoldContentsAuthor>
              <BestBooksGoldContentsDescription>{bestBooks[0].description}</BestBooksGoldContentsDescription>
              <BestBooksGoldMedal>{isEnter ? false : <FaMedal />}</BestBooksGoldMedal>
            </BestBooksGoldContents>
          </BestBooksGold>
          <BestBooksBasic onMouseLeave={handleMouseLeave}>
            {bestBooks
              .filter((item, i) => i !== 0)
              .map((item) => {
                return (
                  <BestBooksBasicItem grade={item.index} data-grade={item.index}>
                    <BestBooksBasicItemImg src={item.img} onMouseEnter={handleMouseEnter} />
                    <BestBooksBasicItemName>{item.name}</BestBooksBasicItemName>
                  </BestBooksBasicItem>
                );
              })}
          </BestBooksBasic>
        </BestBooksWrapper>
      </BestBooksList>
    </Base>
  );
};

export default BestBooks;
