const express = require('express');
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const BookService = require("../services/BookService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
  const url = "/book";
  const router = express.Router();

  /** 전체 목록 조회 --> Read(SELECT) */
  router.get(url, async (req, res, next) => {
    // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
    const { query, page = 1, rows = 5 } = req.query;

    // 검색어를 MyBatis에 전달하기 위한 객체로 구성
    const params = {};
    if (query) {
      params.bookTitle = query;
    }

    // 데이터 조회
    let json = null;

    try {
      // 전체 데이터 수 얻기
      const totalCount = await BookService.getCount(params);
      pageInfo = pagination(totalCount, page, rows);

      params.offset = pageInfo.offset;
      params.listCount = pageInfo.listCount;
      json = await BookService.BookGetList(params);
    } catch (err) {
      return next(err);
    }

    res.sendResult({ pagination: pageInfo, item: json });
  });

  /** 화제의 신상 조회 --> Read(SELECT) */
  router.get(`${url}/hotpotato`, async (req, res, next) => {
    // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
    const { query, page = 1, rows = 5 } = req.query;

    // 검색어를 MyBatis에 전달하기 위한 객체로 구성
    const params = {};
    if (query) {
      params.bookTitle = query;
    }

    // 데이터 조회
    let json = null;

    try {
      // 전체 데이터 수 얻기
      const totalCount = await BookService.getCount(params);
      pageInfo = pagination(totalCount, page, rows);

      params.offset = pageInfo.offset;
      params.listCount = pageInfo.listCount;
      json = await BookService.getListHotPotato(params);
    } catch (err) {
      return next(err);
    }

    res.sendResult({ pagination: pageInfo, item: json });
  });
  /** 단일행 조회 --> Read(SELECT) */
  router.get(`${url}/:bookNo`, async (req, res, next) => {
    // 파라미터 받기
    const { bookNo } = req.params;

    // 파라미터 유효성검사
    try {
      regexHelper.value(bookNo, "해당하는 책이 없습니다.");
    } catch (err) {
      return next(err);
    }
    // 데이터 조회
    let json = null;
    try {
      json = await BookService.getItem({
        bookNo: bookNo,
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult({ item: json });
  });

  /** 데이터 추가 --> Create(INSERT) */
  router.post(url, async (req, res, next) => {
    // 파라미터 받기
    const { bookTitle, pubName, pubDate, authNo, price, count, selling, bookDesc, bookIndex, ctgNo, img, content, ISBNum, page, size, bannerImg, bannerText } = req.body;
    // 유효성 검사
    try {
      regexHelper.value(bookTitle, "책 이름 입력바람.");
      regexHelper.maxLength(bookTitle, 20, "책 제목은 최대 20자까지 입력 가능합니다.");
    } catch (err) {
      return next(err);
    }

    // 데이터 저장
    let json = null;

    try {
      json = await BookService.addItem({
        bookTitle: bookTitle,
        pubName: pubName,
        pubDate: pubDate,
        authNo: authNo,
        price: price,
        count: count,
        selling: selling,
        bookDesc: bookDesc,
        bookIndex: bookIndex,
        ctgNo: ctgNo,
        img: img,
        content: content,
        ISBNum: ISBNum,
        page: page,
        size: size,
        bannerImg: bannerImg,
        bannerText: bannerText
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult({ item: json });
  });

  /** 데이터 수정 --> Update(UPDATE) */
  router.put(`${url}/:bookNo`, async (req, res, next) => {
    // 파라미터 받기
    const { bookNo } = req.params;
    const { bookTitle, pubName, pubDate, authNo, price, count, selling, bookDesc, bookIndex, ctgNo, img, content, ISBNum, page, size, bannerImg, bannerText } = req.body;

    // 데이터 저장
    let json = null;

    try {
      json = await BookService.editItem({
        bookNo: bookNo,
        bookTitle: bookTitle,
        pubName: pubName,
        pubDate: pubDate,
        authNo: authNo,
        price: price,
        count: count,
        selling: selling,
        bookDesc: bookDesc,
        bookIndex: bookIndex,
        ctgNo: ctgNo,
        img: img,
        content: content,
        ISBNum: ISBNum,
        page: page,
        size: size,
        bannerImg: bannerImg,
        bannerText: bannerText,
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult({ item: json });
  });

  /** 데이터 삭제 --> Delete(DELETE) */
  router.delete(`${url}/:bookNo`, async (req, res, next) => {
    // 파라미터 받기
    const { bookNo } = req.params;

    // 유효성 검사
    try {
      regexHelper.value(bookNo, "해당하는 책이 없습니다.");
    } catch (err) {
      return next(err);
    }

    try {
      await BookService.deleteItem({
        bookNo: bookNo,
      });
    } catch (err) {
      return next(err);
    }

    res.sendResult();
  });

  return router;
})();