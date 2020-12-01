import React, { useContext } from "react";
import { FbContext } from "./FbStore";

const PhoneInfo = ({ data }) => {
  const style = {
    border: "1px solid black",
    margin: "8px auto",
    width: "50%",
  };

  return (
    <div style={style}>
      {/* <div>{data.id}</div>
      <div>{data.name}</div> */}
      <button>삭제</button>
      <button>수정</button>
    </div>
  );
};

export default PhoneInfo;
