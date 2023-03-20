import React, { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { BookGetList } from "../../slices/BookSlice";
import { css } from "@emotion/react";

const Base = styled.div`
  margin-left: calc((100% - 1200px) / 2 - 64px);
  padding-top: 60px;
`;

const SlideItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SldieTitle = styled.span`
  font-size: 32px;
  font-weight: bold;

  > p {
    position: absolute;

    &:last-of-type {
      transform: translateY(2rem);
    }
  }
`;

const Img = styled.img``;

const BannerCategory = styled.ul`
  position: absolute;
  z-index: 999;
  bottom: 0;
  display: flex;
  padding: 1rem 5rem;
  background-color: #fff;
  opacity: 0.8;
  width: 100%;
  left: 30%;
  height: 30px;
  align-items: center;
  color: gray;

  ${({ active }) =>
    active
      ? css`
          > li:nth-of-type(${active}) {
            color: #000000;
            font-weight: bold;
          }
        `
      : undefined}
`;

const BannerCategoryItem = styled.li`
  &:not(:first-of-type) {
    margin-left: 3rem;
  }
  cursor: pointer;
`;

const BannerCategoryButton = styled.button`
  border: none;
  background: none;
  font-size: 24px;
  margin-left: 2rem;
  &:first-of-type {
    margin-left: 5rem;
  }
  cursor: pointer;
`;

const Banner = () => {
  const dispatch = useDispatch();
  const { meta, data, loading, error } = useSelector((state) => state.BookSlice);
  console.log(data, loading);

  let hotData = [];
  if (!loading) {
    hotData = data?.slice(0, 3).filter((v) => v.bannerText !== null);
  }

  let newData = [];
  if (!loading) {
    newData = data?.slice(3, 6).filter((v) => v.bannerText !== null);
  }

  useEffect(() => {
    dispatch(BookGetList());
  }, []);

  const [active, setActive] = useState(1);

  const handleHot = () => {
    setActive(1);
  };

  const handleNew = () => {
    setActive(2);
  };

  const handleSale = () => {
    setActive(3);
  };

  return (
    <Base>
      <Swiper
        speed={700}
        spaceBetween={30}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        effect={"fade"}
        fadeEffect={{
          crossFade: true,
        }}
        modules={[EffectFade, Navigation]}
        className="mySwiper"
      >
        {active === 1
          ? hotData?.map((v) => {
              const bannerText =
                v.bannerText.indexOf("/") !== -1 ? (
                  <>
                    <p>{v.bannerText.slice(0, v.bannerText.indexOf("/"))}</p>
                    <br />
                    <p>{v.bannerText.slice(v.bannerText.indexOf("/"))}</p>
                  </>
                ) : (
                  v.bannerText
                );
              return (
                <SwiperSlide>
                  <SlideItem>
                    <SldieTitle>{bannerText}</SldieTitle>
                    <Img src={v.bannerImg} />
                  </SlideItem>
                </SwiperSlide>
              );
            })
          : newData?.map((v) => {
              const bannerText =
                v.bannerText.indexOf("/") !== -1 ? (
                  <>
                    <p>{v.bannerText.slice(0, v.bannerText.indexOf("/"))}</p>
                    <br />
                    <p>{v.bannerText.slice(v.bannerText.indexOf("/") + 1)}</p>
                  </>
                ) : (
                  v.bannerText
                );
              return (
                <SwiperSlide>
                  <SlideItem>
                    <SldieTitle>{bannerText}</SldieTitle>
                    <Img src={v.bannerImg} />
                  </SlideItem>
                </SwiperSlide>
              );
            })}
        <BannerCategory active={active}>
          <BannerCategoryItem onClick={handleHot}>인기도서</BannerCategoryItem>
          <BannerCategoryItem onClick={handleNew}>신규도서</BannerCategoryItem>
          <BannerCategoryItem onClick={handleSale}>할인혜택</BannerCategoryItem>
          <BannerCategoryButton className="swiper-button-prev">
            <IoIosArrowBack />
          </BannerCategoryButton>
          <BannerCategoryButton className="swiper-button-next">
            <IoIosArrowForward />
          </BannerCategoryButton>
        </BannerCategory>
      </Swiper>
    </Base>
  );
};

export default Banner;
