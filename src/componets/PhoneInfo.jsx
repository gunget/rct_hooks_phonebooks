import React, { useContext } from "react";
import { FbContext } from "./FbStore";

const PhoneInfo = ({ data }) => {
  // props로 받음
  const style = {
    border: "1px solid black",
    backgroundColor: "orange",
    margin: "50x auto",
    width: "50%",
  };

  return (
    <div style={style}>
      <div>{data.name}</div>
      <div>{data.number}</div>
      <button>삭제</button>
      <button>수정</button>
    </div>
  );
};

export default PhoneInfo;
