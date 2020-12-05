import React, { useContext, useRef } from "react";
import { FbContext } from "./FbStore";

const PhoneInfo = ({ data }) => {
  // props로 받음
  console.log("--data", data);
  const { dispatch } = useContext(FbContext);

  const PbRemove = (e) => {
    e.preventDefault();
    dispatch({ type: "DEL_Fb_DATA", payload: e.target.parentNode.dataset.id });
  };

  const style = {
    backgroundColor: "skyblue",
    width: "100%",
    opacity: "0.85",
  };

  return (
    <div style={style} data-id={data.id}>
      {data.name} {data.number}
      <span> </span>
      <button onClick={PbRemove}>삭제</button>
      <button>수정</button>
    </div>
  );
};

export default PhoneInfo;
