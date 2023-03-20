import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';


const URL = "http://localhost:3001/selling";
// 다중행 데이터 조회
export const sellingGetList = createAsyncThunk("SellingSlice/sellingGetList", async (payload, { rejectWithValue }) => {
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
// 단일행 데이터 조회
export const sellingGetItem = createAsyncThunk("SellingSlice/sellingGetItem", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    const response = await axios.get(`${URL}/${payload?.sellNo}`);
    result = response.data;
  } catch (err) {
    console.log(err);
    result = rejectWithValue(err.response);
  }
  return result;
});

// 데이터 추가
export const sellingPostItem = createAsyncThunk("SellingSlice/sellingPostItem", async (payload, { rejectWithValue }) => {

  let result = null;
  try {
    const response = await axios.post(URL, payload);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

//  데이터 수정
export const sellingPutItem = createAsyncThunk("SellingSlice/sellingPutItem", async (payload, { rejectWithValue }) => {

  let result = null;
  const params = null;

  try {
    const response = await axios.put(`${URL}/${payload?.sellNo}`, payload);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

//  데이터 삭제
export const sellingDeleteItem = createAsyncThunk("SellingSlice/sellingDeleteItem", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    const response = await axios.delete(`${URL}/${payload?.sellNo}`);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** Slice 정의   */
const SellingSlice = createSlice({
  name: 'SellingSlice',
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

    [sellingGetList.pending]: pending,
    [sellingGetList.fulfilled]: (state, { meta, payload }) => {
      if (meta.page > 1) {
        payload.item = state.data.concat(payload.item);
      }

      return {
        pagination: payload.pagination,
        data: payload.item,
        loading: false,
        error: null,
      };
    },
    [sellingGetList.rejected]: rejected,


    [sellingGetItem.pending]: pending,
    [sellingGetItem.fulfilled]: fulfilled,
    [sellingGetItem.rejected]: rejected,

    [sellingPostItem.pending]: pending,
    [sellingPostItem.fulfilled]: fulfilled,
    [sellingPostItem.rejected]: rejected,


    [sellingPutItem.pending]: pending,
    [sellingPutItem.fulfilled]: fulfilled,
    [sellingPutItem.rejected]: rejected,


    [sellingDeleteItem.pending]: pending,
    [sellingDeleteItem.fulfilled]: fulfilled,
    [sellingDeleteItem.rejected]: rejected
  },
});

export const { getCurrentData } = SellingSlice.actions;
export default SellingSlice.reducer;