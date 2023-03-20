import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Reset } from "styled-reset";
import Header from "../components/Header";
import { GrFormSubtract, GrLocation } from "react-icons/gr";
import { AiFillCheckCircle, AiOutlineCheckCircle, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HambugerContext } from "../context/HambugerContext";
// 상태값을 로드하기 위한 hook과 action함수를 dispatch할 hook 참조
import { useSelector, useDispatch } from "react-redux";
// Slice에 정의된 액션함수들 참조
import CartSlice, { plus, minus } from "../slices/CartSlice.jsx";

const Base = styled.div`
  @font-face {
    font-family: "NanumSquareNeo-Variable";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "NanumSquareNeo-Variable";
`;

const CartWrapper = styled.div`
  max-width: 1200px;
  margin: 4rem auto;

  ${({ isHambuger }) =>
    isHambuger
      ? css`
          z-index: -1;
        `
      : css``}
`;

const CartHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1rem 0;
  background-color: #fff;
`;

const CartTitle = styled.h1`
  font-size: 24px;
`;

const DeliveryButton = styled.button`
  margin: 0 auto 0 0;
  background: none;
  border: 1px solid gray;
  padding: 3px 7px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Content = styled.span``;

const StepWrapper = styled.ol`
  display: flex;
  gap: 1rem;
`;

const Step = styled.li`
  font-size: 12px;
  display: flex;
  /*   gap: 0.5rem; */
`;

const StepNumber = styled.span`
  padding: 2px 6px;
  border-radius: 50%;
  ${({ active }) =>
    active == "true"
      ? css`
          background-color: #4dac27;
          color: #fff;
        `
      : css``}
`;

const StepContents = styled.span`
  padding: 2px;
  ${({ active }) =>
    active == "true"
      ? css`
          font-weight: bold;
        `
      : css``}
`;

const CartBody = styled.div`
  margin-top: 4rem;
  display: flex;
  position: relative;
`;

const CartUtilBox = styled.div`
  width: 70%;
  margin: 2rem 0;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: #f7f7f7;
  padding: 15px 17px;
  font-size: 12px;
  border-radius: 10px;
  box-sizing: border-box;
  width: 890px;
`;

const UtilBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 18px;
  ${({ isAll }) =>
    isAll == true
      ? css`
          color: #5055b1;
        `
      : css`
          color: gray;
        `}
`;

const UtilLabel = styled.label`
  margin: 0 auto 0 0;
  cursor: pointer;
`;

const LikeBtn = styled.button`
  background-color: #fff;
  border: 1px solid #cccccc;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  background-color: #fff;
  border: 1px solid #cccccc;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
`;

const CartBooksWrapper = styled.div`
  border-top: 1px solid black;
  width: 890px;
`;

const CartBook = styled.div`
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  gap: 1rem;
`;

const CartBookWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1 1 auto;
  padding: 1rem 2rem;
`;

const CartBookImg = styled.img`
  max-width: 100px;
`;

const CartBookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 14px;
  line-height: 22px;
`;

const CartBookName = styled.div``;

const CartBookPrice = styled.div``;

const CartBookAmountBox = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #ebebeb;
  border-right: 1px solid #ebebeb;
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
`;

const CartBookAmountPrice = styled.p``;

const CartBookAmount = styled.div``;

const CartSubtractBtn = styled.button``;

const CartAmount = styled.input`
  width: 35px;
`;

const CartPlusBtn = styled.button``;

const CartBookDelivery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
`;

const CartBookMethod = styled.span`
  font-size: 10px;
  padding: 4px 6px;
  align-self: flex-start;
  background-color: #5055b1;
  color: #fff;
  border-radius: 10px;
`;

const CartBookArriveDate = styled.span`
  line-height: 19px;
  font-size: 13px;
  font-weight: 700;
`;

const PaymentsInfo = styled.div`
  width: 273px;
  position: absolute;
  right: 0;
  border: 1px solid #ebebeb;
  padding: 10px 16px;
  box-sizing: border-box;
  border-radius: 15px;
  font-size: 12px;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentsPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaymentsPriceText = styled.p``;

const PaymentsPrice = styled.p`
  font-weight: 700;
  font-size: 14px;
`;

const PaymentsDeliveryBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 1rem;
`;

const PaymentsDeliveryText = styled.p``;

const PaymentsDelivery = styled.p``;

const PaymentsTotalBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const PaymentsTotalText = styled.p``;

const PaymentsTotal = styled.p`
  font-size: 18px;
`;

const PaymentsPointBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #595959;
`;

const PaymentsPointText = styled.p``;

const PaymentsPoint = styled.p``;

const PaymentsOrderBtn = styled.button`
  width: 100%;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid transparent;
  background-color: #5055b1;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;

const cartBooks = [
  {
    id: "1",
    category: "국내도서",
    name: "인버스",
    price: "15,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791159098253.jpg",
    amount: 1,
  },
  {
    id: "2",
    category: "국내도서",
    name: "인버스",
    price: "13,500원",
    img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791190977937.jpg",
    amount: 1,
  },
];

const Cart = () => {
  const { isHambuger, setIsHambuger } = useContext(HambugerContext);
  console.log(isHambuger);
  const [isAll, setIsAll] = useState(false);
  const handleClick = () => {
    setIsAll(!isAll);
  };
  const day = ["일", "월", "화", "수", "목", "금", "토"];

  const today = `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate() + 2}일(${day[new Date().getDay() + 2]}) 도착예정`;

  const amountRef = useRef();

  const handleSubtract = (e) => {
    if (e.target.parentElement.parentElement.querySelector("input").value > 0) e.target.parentElement.parentElement.querySelector("input").value--;
  };

  const handlePlus = (e) => {
    e.target.parentElement.parentElement.querySelector("input").value++;
  };

  let cartItem = useSelector((state) => state.CartSlice);

  // dispathch 함수 생성
  const dispatch = useDispatch();

  return (
    <Base>
      <Reset />
      <Header short="true" noSticky="true" />
      <CartWrapper isHambuger={isHambuger}>
        <CartHeader>
          <CartTitle>장바구니</CartTitle>
          <DeliveryButton>
            <GrLocation />
            <Content>기준배송지</Content>
          </DeliveryButton>
          <StepWrapper>
            <Step>
              <StepNumber active="true">1</StepNumber>
              <StepContents active="true">장바구니</StepContents>
            </Step>
            <Step>
              <StepNumber>2</StepNumber>
              <StepContents>사은품선택</StepContents>
            </Step>
            <Step>
              <StepNumber>3</StepNumber>
              <StepContents>주문/결제</StepContents>
            </Step>
            <Step>
              <StepNumber>4</StepNumber>
              <StepContents>주문완료</StepContents>
            </Step>
          </StepWrapper>
        </CartHeader>
        <CartUtilBox>
          <UtilBtn id="utilBtn" onClick={handleClick} isAll={isAll}>
            {isAll ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
          </UtilBtn>
          <UtilLabel htmlFor="utilBtn">전체</UtilLabel>
          <LikeBtn>
            <AiOutlineHeart />
          </LikeBtn>
          <DeleteBtn>
            <RiDeleteBin6Line />
          </DeleteBtn>
        </CartUtilBox>
        <CartBody>
          <CartBooksWrapper>
            {cartItem.map((item, i) => {
              return (
                <CartBook key={item.id} item={item}>
                  <CartBookWrapper>
                    <CartBookImg src={item.img}></CartBookImg>
                    <CartBookInfo>
                      <CartBookName>{`[${item.category}]${item.name}`}</CartBookName>
                      <CartBookPrice>{item.price}</CartBookPrice>
                    </CartBookInfo>
                  </CartBookWrapper>
                  <CartBookAmountBox>
                    <CartBookAmountPrice>{item.price * item.amount}</CartBookAmountPrice>
                    <CartBookAmount>
                      <CartSubtractBtn
                        onClick={() => {
                          dispatch(minus(cartItem[i].id));
                        }}
                        price={item.price}
                        id={item.id}
                      >
                        <GrFormSubtract />
                      </CartSubtractBtn>
                      <CartAmount type="number" defaultValue="1" ref={amountRef} min="1" value={item.amount}></CartAmount>
                      <CartPlusBtn
                        onClick={() => {
                          dispatch(plus(cartItem[i].id));
                        }}
                        price={item.price}
                        id={item.id}
                      >
                        <AiOutlinePlus />
                      </CartPlusBtn>
                    </CartBookAmount>
                  </CartBookAmountBox>
                  <CartBookDelivery>
                    <CartBookMethod>택배배송</CartBookMethod>
                    <CartBookArriveDate>{today}</CartBookArriveDate>
                  </CartBookDelivery>
                </CartBook>
              );
            })}
          </CartBooksWrapper>
          <PaymentsInfo>
            <PaymentsPriceBox>
              <PaymentsPriceText>상품금액</PaymentsPriceText>
              <PaymentsPrice>{cartItem.reduce((acc, cur) => acc.total + cur.total)}</PaymentsPrice>
            </PaymentsPriceBox>
            <PaymentsDeliveryBox>
              <PaymentsDeliveryText>배송비</PaymentsDeliveryText>
              <PaymentsDelivery>+ 0원</PaymentsDelivery>
            </PaymentsDeliveryBox>
            <PaymentsTotalBox>
              <PaymentsTotalText>결제 예정 금액</PaymentsTotalText>
              <PaymentsTotal>{`${cartItem.reduce((acc, cur) => acc.total + cur.total)}원`} </PaymentsTotal>
            </PaymentsTotalBox>
            <PaymentsPointBox>
              <PaymentsPointText>적립예정 포인트</PaymentsPointText>
              <PaymentsPoint>{`${cartItem.reduce((acc, cur) => acc.total + cur.total) * 0.1}P`}</PaymentsPoint>
            </PaymentsPointBox>
            <PaymentsOrderBtn>{`주문하기 (${cartBooks.length})`}</PaymentsOrderBtn>
          </PaymentsInfo>
        </CartBody>
      </CartWrapper>
    </Base>
  );
};

export default Cart;
