import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  // slice의 name은 store의 reducer key값과 일치해야한다.
  name: "CartSlice",
  // 이 모듈이 관리하고자하는 상태값들을 명시
  initialState: [
    {
      id: "1",
      category: "국내도서",
      name: "인버스",
      price: 15500,
      img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791159098253.jpg",
      amount: 1,
      total: 15500,
    },
    {
      id: "2",
      category: "국내도서",
      name: "인버스",
      price: 13500,
      img: "https://contents.kyobobook.co.kr/sih/fit-in/234x0/pdt/9791190977937.jpg",
      amount: 1,
      total: 13500,
    },
  ],
  // 상태값을 갱신하기 위한 함수들을 구현
  // 컴포넌트에서 이 함수들을 호출할 때 전달되는 파라미터는 action.payload로 전달된다.
  // initialState와 동일한 구조의 JSON을 리턴한다.
  reducers: {
    plus: (state, action) => {
      let nums = state.findIndex((a) => a.id === action.payload);
      state[nums].amount++;
      state[nums].total = state[nums].price * state[nums].amount;
    },
    minus: (state, action) => {
      let nums = state.findIndex((a) => a.id === action.payload);
      if (state[nums].amount > 1) {
        state[nums].amount--;
        state[nums].total = state[nums].price * state[nums].amount;
      }
    },
  },
});
// 액션함수들    내보내기
export const { plus, minus } = CartSlice.actions; // 리듀서 객체 내보내기

export default CartSlice.reducer;
