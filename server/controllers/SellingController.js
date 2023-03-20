const express = require('express');
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const SellingService = require("../services/SellingService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
  const url = "/selling";
  const router = express.Router();

  /** 전체 목록 조회 --> Read(SELECT) */
  router.get(url, async (req, res, next) => {
    // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
    const { query, page = 1, rows = 5 } = req.query;

    // 검색어를 MyBatis에 전달하기 위한 객체로 구성
    const params = {};
    if (query) {
      params.sellDate = query;
      params.bookNo = query;
    }

    // 데이터 조회
    let json = null;

    try {
      // 전체 데이터 수 얻기
      const totalCount = await SellingService.getCount(params);
      pageInfo = pagination(totalCount, page, rows);

      params.offset = pageInfo.offset;
      params.listCount = pageInfo.listCount;
      json = await SellingService.getList(params);
    } catch (err) {
      return next(err);
    }

    res.sendResult({ pagination: pageInfo, item: json });
  });

  /** 단일행 조회 --> Read(SELECT) */
  router.get(`${url}/:sellNo`, async (req, res, next) => {
    // 파라미터 받기
    const { sellNo } = req.params;

    // 파라미터 유효성검사
    try {
      regexHelper.value(sellNo, "해당하는 작가가 없습니다.");
    } catch (err) {
      return next(err);
    }
    // 데이터 조회
    let json = null;
    try {
      json = await SellingService.getItem({
        sellNo: sellNo,
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult({ item: json });
  });

  /** 데이터 추가 --> Create(INSERT) */
  router.post(url, async (req, res, next) => {
    // 파라미터 받기
    const { sellDate, amount, bookNo } = req.body;
    // 유효성 검사
    try {
      regexHelper.value(sellDate, "날짜 입력바람.");
      regexHelper.value(bookNo, "책번호 입력바람");
    } catch (err) {
      return next(err);
    }

    // 데이터 저장
    let json = null;

    try {
      json = await SellingService.addItem({
        sellDate: sellDate,
        amount: amount,
        bookNo: bookNo,
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult({ item: json });
  });

  /** 데이터 수정 --> Update(UPDATE) */
  router.put(`${url}/:sellNo`, async (req, res, next) => {
    // 파라미터 받기
    const { sellNo } = req.params;
    const { sellDate, amount, bookNo } = req.body;

    // 데이터 저장
    let json = null;

    try {
      json = await SellingService.editItem({
        sellNo: sellNo,
        sellDate: sellDate,
        amount: amount,
        bookNo: bookNo,
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult({ item: json });
  });

  /** 데이터 삭제 --> Delete(DELETE) */
  router.delete(`${url}/:sellNo`, async (req, res, next) => {
    // 파라미터 받기
    const { sellNo } = req.params;

    // 유효성 검사
    try {
      regexHelper.value(sellNo, "해당하는 판매 번호가 없습니다.");
    } catch (err) {
      return next(err);
    }

    try {
      await SellingService.deleteItem({
        sellNo: sellNo,
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult();
  });

  return router;
})();