import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';


const URL = "http://localhost:3001/book";
// 다중행 데이터 조회
export const BookGetList = createAsyncThunk("BookSlice/BookGetList", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.get(URL, {
      params: {
        page: payload?.page || 1,
        rows: payload?.rows || 30,
        query: payload?.keyword || ''
      }
    });
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

// 화제의 신상 데이터 조회
export const BookGetListHotPotato = createAsyncThunk("BookSlice/BookGetListHotPotato", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.get(`${URL}/hotpotato`);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});
// 단일행 데이터 조회
export const BookGetItem = createAsyncThunk("BookSlice/BookGetItem", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    const response = await axios.get(`${URL}/${payload?.bookNo}`);
    result = response.data;
  } catch (err) {
    console.log(err);
    result = rejectWithValue(err.response);
  }
  return result;
});

// 데이터 추가
export const BookPostItem = createAsyncThunk("BookSlice/BookPostItem", async (payload, { rejectWithValue }) => {

  let result = null;
  try {
    const response = await axios.post(URL, payload);
    result = response.data;
    alert('책이 추가되었습니다.');
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

//  데이터 수정
export const BookPutItem = createAsyncThunk("BookSlice/BookPutItem", async (payload, { rejectWithValue }) => {

  let result = null;
  const params = null;

  try {
    const response = await axios.put(`${URL}/${payload?.bookNo}`, payload);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

//  데이터 삭제
export const BookDeleteItem = createAsyncThunk("BookSlice/BookDeleteItem", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    const response = await axios.delete(`${URL}/${payload?.bookNo}`);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** Slice 정의   */
const BookSlice = createSlice({
  name: 'BookSlice',
  initialState: {
    // backend 
    data: null,
    pagination: null,
    loading: false,
    error: null
  },

  //  외부 action 및 비동기 action (Ajax용)
  //  동기 : reducers
  //  비동기: extraReducers
  reducers: {
    getCurrentData: (state, action) => {
      return state;
    }
  },
  extraReducers: {

    // 로딩중임을 표시

    [BookGetList.pending]: pending,
    [BookGetList.fulfilled]: fulfilled,
    [BookGetList.rejected]: rejected,

    [BookGetListHotPotato.pending]: pending,
    [BookGetListHotPotato.fulfilled]: fulfilled,
    [BookGetListHotPotato.rejected]: rejected,

    [BookGetItem.pending]: pending,
    [BookGetItem.fulfilled]: fulfilled,
    [BookGetItem.rejected]: rejected,

    [BookPostItem.pending]: pending,
    [BookPostItem.fulfilled]: fulfilled,
    [BookPostItem.rejected]: rejected,


    [BookPutItem.pending]: pending,
    [BookPutItem.fulfilled]: fulfilled,
    [BookPutItem.rejected]: rejected,


    [BookDeleteItem.pending]: pending,
    [BookDeleteItem.fulfilled]: fulfilled,
    [BookDeleteItem.rejected]: rejected
  },
});

export const { getCurrentData } = BookSlice.actions;
export default BookSlice.reducer;