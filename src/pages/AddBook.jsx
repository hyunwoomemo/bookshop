import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import TableEx from "../components/TableEx";
import { BookPostItem } from "../slices/BookSlice";
import styled from "@emotion/styled";

const AddBook = () => {
  const dispatch = useDispatch();
  /* const { loading } = useSelector((state) => state.BookSlice); */

  const onAddBookSubmit = useCallback((e) => {
    e.preventDefault();

    const current = e.currentTarget;

    dispatch(
      BookPostItem({
        bookTitle: current.bookTitle.value,
        pubName: current.pubName.value,
        pubDate: current.pubDate.value,
        authNo: current.authNo.value,
        price: current.price.value,
        count: current.count.value,
        selling: current.selling.value,
        bookDesc: current.bookDesc.value,
        bookIndex: current.bookIndex.value,
        img: current.img.value,
        content: current.content.value,
        ctgNo: current.ctgNo.value,
        ISBNum: current.ISBNum.value,
        page: current.page.value,
        bannerImg: current.bannerImg.value,
        size: current.size.value,
        bannerText: current.bannerText.value,
      })
    );
    current.bookTitle.value = "";
    current.pubName.value = "";
    current.pubDate.value = "";
    current.authNo.value = "";
    current.price.value = "";
    current.count.value = "";
    current.selling.value = "";
    current.bookDesc.value = "";
    current.bookIndex.value = "";
    current.img.value = "";
    current.content.value = "";
    current.ctgNo.value = "";
    current.ISBNum.value = "";
    current.page.value = "";
    current.bannerImg.value = "";
    current.size.value = "";
    current.bannerText.value = "";
  });
  return (
    <Base>
      {/* <Spinner loading={loading} /> */}
      <h1>책 추가</h1>
      <form onSubmit={onAddBookSubmit}>
        <TableEx>
          <colgroup>
            <col width="120" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>책이름</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="bookTitle" />
              </td>
            </tr>
            <tr>
              <th>출판사명</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="pubName" />
              </td>
            </tr>
            <tr>
              <th>출판일</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="pubDate" />
              </td>
            </tr>
            <tr>
              <th>작가번호</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="authNo" />
              </td>
            </tr>
            <tr>
              <th>가격</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="price" />
              </td>
            </tr>
            <tr>
              <th>재고</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="count" />
              </td>
            </tr>
            <tr>
              <th>판매량</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="selling" />
              </td>
            </tr>
            <tr>
              <th>책 설명</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="bookDesc" />
              </td>
            </tr>
            <tr>
              <th>책 목차</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="bookIndex" />
              </td>
            </tr>
            <tr>
              <th>책 표지 이미지 파일 경로</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="img" />
              </td>
            </tr>
            <tr>
              <th>책 내용 이미지 파일 경로</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="content" />
              </td>
            </tr>
            <tr>
              <th>카테고리 번호</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="ctgNo" />
              </td>
            </tr>
            <tr>
              <th>ISBNum</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="ISBNum" />
              </td>
            </tr>
            <tr>
              <th>총 쪽수</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="page" />
              </td>
            </tr>
            <tr>
              <th>책 크기</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="size" />
              </td>
            </tr>
            <tr>
              <th>배너 이미지</th>
              <td className="inputWrapper">
                <input className="field" type="url" name="bannerImg" />
              </td>
            </tr>
            <tr>
              <th>배너 텍스트</th>
              <td className="inputWrapper">
                <input className="field" type="text" name="bannerText" />
              </td>
            </tr>
          </tbody>
        </TableEx>

        <div style={{ textAlign: "center" }}>
          <button type="submit">저장하기</button>
        </div>
      </form>
    </Base>
  );
};

const Base = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export default AddBook;
