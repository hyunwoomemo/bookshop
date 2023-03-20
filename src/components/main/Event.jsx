import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideHeader from "./SlideHeader";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Base = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
`;

const SlideWrapper = styled.div`
  margin-top: 4rem;
  position: relative;
  border-radius: 20px;
`;

const SlideImg = styled.img``;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  right: 2%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  padding: 5px 10px;
  border-radius: 25px;
`;

const Button = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  height: 16px;
  color: #fff;
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

const CustomPagination = styled.span`
  position: unset;
  color: #fff;
  height: 16px;
  font-size: 14px;
`;

const imgArr = [
  "https://contents.kyobobook.co.kr/pmtn/2022/event/b8a47b01e7b440efb0efa868113d7a8b.jpg",
  "https://contents.kyobobook.co.kr/pmtn/2022/event/ea2fd988d67f4cb8899659701c6a2f50.jpg",
  "https://contents.kyobobook.co.kr/display/i_1200_150%20(2)_78796c5e52344f8cbd93f3d4958e3694.jpg",
  "https://contents.kyobobook.co.kr/display/i_1200_150_fd7581fe8c274a1b9f8a58a26378a190.jpg",
  "https://contents.kyobobook.co.kr/display/i_1200_150%20(1)_dfed1bf7c2e74be083980a5aa248201b.jpg",
  "https://contents.kyobobook.co.kr/pmtn/2022/event/63f2d5f3d88f4e5c832861e0f0ff39fe.jpg",
];

const Event = () => {
  return (
    <Base>
      <SlideHeader text="이벤트" />
      <SlideWrapper>
        <Swiper
          loop="true"
          modules={[Pagination, Navigation]}
          navigation={{
            nextEl: ".swiper-button-next3",
            prevEl: ".swiper-button-prev3",
          }}
          pagination={{
            type: "fraction",
            el: ".swiper-pagination",
          }}
          style={{ borderRadius: "20px" }}
        >
          {imgArr.map((item, i) => {
            return (
              <SwiperSlide>
                <SlideImg src={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <ButtonWrapper>
          <Button pos="left" className="swiper-button-prev3">
            <IoIosArrowBack />
            {imgArr.index}
          </Button>
          <CustomPagination className="swiper-pagination"></CustomPagination>
          <Button pos="right" className="swiper-button-next3">
            <IoIosArrowForward />
          </Button>
        </ButtonWrapper>
      </SlideWrapper>
    </Base>
  );
};

export default Event;
