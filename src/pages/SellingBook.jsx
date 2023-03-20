import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import TableEx from "../components/TableEx";
import { sellingPostItem } from "../slices/SellingSlice";
import styled from "@emotion/styled";

const Sellingbook = () => {
  const dispatch = useDispatch();
  /* const { loading } = useSelector((state) => state.BookSlice); */

  const onSellingbookSubmit = useCallback((e) => {
    e.preventDefault();

    const current = e.currentTarget;

    dispatch(
      sellingPostItem({
        sellDate: current.sellDate.value,
        amount: current.amount.value,
        bookNo: current.bookNo.value,
      })
    );
    current.sellDate.value = "";
    current.amount.value = "";
    current.bookNo.value = "";
  });
  return (
    <Base>
      {/* <Spinner loading={loading} /> */}
      <h1>판매 테스트</h1>
      <form onSubmit={onSellingbookSubmit}>
        <TableEx>
          <colgroup>
            <col width="120" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>판매일</th>
              <td className="inputWrapper">
                <input className="field" type="date" name="sellDate" />
              </td>
            </tr>
            <tr>
              <th>수량</th>
              <td className="inputWrapper">
                <input className="field" type="number" name="amount" />
              </td>
            </tr>
            <tr>
              <th>책번호</th>
              <td className="inputWrapper">
                <input className="field" type="number" name="bookNo" />
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

export default Sellingbook;
