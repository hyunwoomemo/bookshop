import React from "react";
import styled from "styled-components";

const Test = () => {
  return (
    <Base className="overflow_footer" style={{}}>
      <button>
        <span className="">펼치기</span>
        <span>sdf</span>

        <span className="">접기</span>
        <span>sdf</span>
      </button>
    </Base>
  );
};

const Base = styled.div`
  .overflow_footer {
    button {
      display: flex;
      align-content: center;
      background: none;
      border: none;
      font-size: 11px;
      padding: 0;
      padding-top: 2px;
      &:hover {
        cursor: pointer;
      }

      span {
        :first-of-type {
          text-decoration: underline;
          margin-right: 5px;
        }
        :nth-of-type(2) {
          width: 10px;
          height: 10px;
          background-color: black;
          border-radius: 50px;
        }
        :nth-of-type(3) {
          display: none;
        }
        :last-of-type {
          display: none;
        }
      }
      &.active {
        span {
          :first-of-type {
            display: none;
          }
          :nth-of-type(2) {
            display: none;
          }
          :nth-of-type(3) {
            display: block;
            text-decoration: underline;
            margin-right: 5px;
          }
          :last-of-type {
            display: block;
            width: 10px;
            height: 10px;
            background-color: black;
            border-radius: 50px;
          }
        }
      }
    }
  }
`;

export default Test;
