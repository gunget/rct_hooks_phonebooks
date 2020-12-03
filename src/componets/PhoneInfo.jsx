import React, { useContext } from "react";
import { FbContext } from "./FbStore";

const PhoneInfo = ({ data }) => {
  // props로 받음
  const style = {
    backgroundColor: "skyblue",
    width: "100%",
  };

  return (
    <div style={style}>
      <div>
        {data.name} {data.number}
        <span> </span>
        <button>삭제</button>
        <button>수정</button>
      </div>
    </div>
  );
};

export default PhoneInfo;
