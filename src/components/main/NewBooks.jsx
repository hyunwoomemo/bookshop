import styled from "@emotion/styled/macro";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { css } from "@emotion/react";
import { Navigation } from "swiper";
import SlideHeader from "./SlideHeader";

const Base = styled.div`
  max-width: 1200px;
  margin: 4rem auto 2rem;
`;

const SlideWrapper = styled.div`
  margin-top: 4rem;
  position: relative;
`;

const SlideItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Img = styled.img`
  max-width: 200px;
`;

const BookName = styled.h1`
  font-size: 15px;
  max-height: 46px;
  line-height: 23px;
  font-weight: bold;
`;

const BookAuthor = styled.p`
  font-size: 12px;
  color: gray;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  ${({ pos }) =>
    pos === "left"
      ? css`
          right: 105%;
        `
      : css`
          left: 105%;
        `}
  background: none;
  transform: translateY(-50%);
  font-size: 28px;
  border: none;
  cursor: pointer;
`;

const newBooks = [
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

const NewBooks = () => {
  return (
    <Base>
      <SlideHeader text="화제의 신상" />
      <SlideWrapper>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          loop="true"
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next2",
            prevEl: ".swiper-button-prev2",
          }}
        >
          {newBooks.map((item) => {
            return (
              <SwiperSlide>
                <SlideItem>
                  <Img src={item.img}></Img>
                  <BookName>{item.name}</BookName>
                  <BookAuthor>{item.author}</BookAuthor>
                </SlideItem>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Button pos="left" className="swiper-button-prev2">
          <IoIosArrowBack />
        </Button>
        <Button pos="right" className="swiper-button-next2">
          <IoIosArrowForward />
        </Button>
      </SlideWrapper>
    </Base>
  );
};

export default NewBooks;
