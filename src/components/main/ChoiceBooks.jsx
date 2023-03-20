import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useEffect, useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getList } from "../../slices/AuthorSlice";
import { BookGetList } from "../../slices/BookSlice";
import SlideHeader from "./SlideHeader";

const TodayChoiceBooksList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 5rem;
  position: relative;
`;

const TodayChoiceBooksSlide = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 368px;
  display: flex;
`;

const TodayChoiceBooksMainSlide = styled.div`
  max-width: 660px;
  width: 100%;
  height: 100%;
`;

const TodayChoiceBooksSubSlide = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const TodayChoiceMainSlideItem = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const TodayChoiceMainSlideItemImg = styled.img`
  width: 250px;
  object-fit: contain;
`;

const TodayChoiceMainSlideItemContents = styled.div`
  padding: 1rem 2rem;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TodayChoiceMainSlideItemHeader = styled.h1`
  font-size: 20px;
  line-height: 30px;
`;

const TodayChoiceMainSlideItemAuthor = styled.h4`
  font-size: 14px;
  line-height: 22px;
  color: #595959;
`;

const TodayChoiceMainSlideItemPrice = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const TodayChoiceMainSlideItemSummary = styled.h2`
  &:before {
    content: "";
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    background-image: url("https://contents.kyobobook.co.kr/resources/fo/images/common/ink/ico_md_comment@2x.png");
    top: 3px;
    left: 0;
  }

  position: relative;
  color: #474c98;
  margin-top: 30px;
  padding-left: 20px;
  font-weight: 700;
  line-height: 22px;
  font-size: 14px;
  width: 100%;
`;

const TodayChoiceMainSlideItemDescription = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #595959;
  line-height: 22px;
  overflow: hidden;
`;

const TodayChoiceSubSlideItem = styled.div`
  width: 142px;
  margin: 0 20px 0 0;
  box-sizing: border-box;
  height: 100%;
  box-sizing: border-box;
`;

const TodayChoiceSubSlideItemImg = styled.img`
  width: 100%;
  min-height: 50px;
  vertical-align: middle;
  border: 0;
  margin-bottom: 0.8rem;
`;

const TodayChoiceSubSlideItemName = styled.p`
  font-size: 13px;
  overflow: hidden;
  height: 38px;
  max-width: 38px;
  line-height: 19px;
  font-weight: 400;
  margin-left: 1px;
`;

const TodayChoiceBooksButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ pos }) =>
    pos === "left"
      ? css`
          right: 105%;
        `
      : css`
          left: 105%;
        `};
  transform: translate(-50%, -50%);
  border: none;
  background: none;
  font-size: 32px;
  color: gray;
  cursor: pointer;
`;

const todayChoiceBook = [
  {
    index: "1",
    category: "소설",
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791159098253.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
  {
    index: "2",
    category: "category1",
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791190977937.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
  {
    index: "3",
    category: "category2",
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791197894527.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
  {
    index: "4",
    category: "category3",
    name: "인버스",
    author: "단요·마카롱",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791160949919.jpg",
    summary: "나의 행복이 누군가의 불행이 된다면 나쁜 것일까?",
    description: "시장이 추락할수록 돈을 버는 세계, 인버스에 오세요! <<다이브>>로 주목받은 신예작가 단요가 말하는 돈이 미덕이 된 도시에서 살아남기 위한 스물셋의 욕망기",
  },
];

const ChoiceBooks = () => {
  const dispatch = useDispatch();
  const { meta, data, loading, error } = useSelector((state) => state.BookSlice);

  useEffect(() => {
    dispatch(BookGetList());
    dispatch(getList());
  }, []);

  const authorData = useSelector((state) => state.AuthorSlice).data;

  console.log(authorData);

  /* function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
  }

  const [randomArr, setRandomArr] = useState([getRandomIntInclusive(0, data.length - 1)]);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => {
      setDate(new Date());

      if (date?.getHours() === 0 && date?.getMinutes() === 0 && date?.getSeconds() === 0) {
        setRandomArr([getRandomIntInclusive(0, data.length - 1)]);
      }
    }, 1000);

    return () => clearInterval(tick);
  }, [data.length, date]); */

  return (
    <TodayChoiceBooksList>
      <SlideHeader text="오늘의 선택" />
      <TodayChoiceBooksSlide>
        <TodayChoiceBooksMainSlide>
          <Swiper
            speed={700}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next1",
              prevEl: ".swiper-button-prev1",
            }}
            loop={true}
            effect={"fade"}
            fadeEffect={{
              crossFade: true,
            }}
            modules={[EffectFade, Navigation]}
            className="mySwiper"
            style={{ height: "100%" }}
          >
            {data?.map((item, i) => {
              return (
                <SwiperSlide>
                  <TodayChoiceMainSlideItem>
                    <TodayChoiceMainSlideItemImg src={item.img}></TodayChoiceMainSlideItemImg>
                    <TodayChoiceMainSlideItemContents>
                      <TodayChoiceMainSlideItemHeader>{`[${item.ctgNo}] ${item.bookTitle}`}</TodayChoiceMainSlideItemHeader>
                      <TodayChoiceMainSlideItemAuthor>{authorData?.[item.authNo - 1]?.authName}</TodayChoiceMainSlideItemAuthor>
                      <TodayChoiceMainSlideItemPrice>{item.price}</TodayChoiceMainSlideItemPrice>
                      <TodayChoiceMainSlideItemSummary>{item.bannerText ? item.bannerText : undefined}</TodayChoiceMainSlideItemSummary>
                      <TodayChoiceMainSlideItemDescription>{item.bookDesc.slice(0, 20)}</TodayChoiceMainSlideItemDescription>
                    </TodayChoiceMainSlideItemContents>
                  </TodayChoiceMainSlideItem>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </TodayChoiceBooksMainSlide>
        <TodayChoiceBooksSubSlide>
          <Swiper
            speed={700}
            slidesPerView={3}
            spaceBetween={30}
            modules={[Navigation]}
            className="mySwiper"
            navigation={{
              nextEl: ".swiper-button-next1",
              prevEl: ".swiper-button-prev1",
            }}
            loop="true"
            initialSlide={1}
          >
            {data?.map((item, i, arr) => {
              return (
                <SwiperSlide>
                  <TodayChoiceSubSlideItem>
                    <TodayChoiceSubSlideItemImg src={item.img}></TodayChoiceSubSlideItemImg>
                    <TodayChoiceSubSlideItemName>{item.bookTitle}</TodayChoiceSubSlideItemName>
                  </TodayChoiceSubSlideItem>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </TodayChoiceBooksSubSlide>
      </TodayChoiceBooksSlide>
      <TodayChoiceBooksButton className="swiper-button-prev1" pos="left">
        <FiArrowLeftCircle />
      </TodayChoiceBooksButton>
      <TodayChoiceBooksButton className="swiper-button-next1" pos="right">
        <FiArrowRightCircle />
      </TodayChoiceBooksButton>
    </TodayChoiceBooksList>
  );
};

export default ChoiceBooks;
