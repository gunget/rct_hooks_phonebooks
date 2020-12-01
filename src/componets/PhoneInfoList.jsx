import React, { useContext } from "react";
import { FbContext } from "./FbStore";
import PhoneInfo from "./PhoneInfo";

const PhoneInfoList = () => {
  const { information } = useContext(FbContext);
  const list = information.map((data) => {
    return <PhoneInfo key={data.id} data={data} />;
    // arrow function사용시 한문장이면 {return}생략 가능
    // 여러줄일 경우 {}를 쓰고 반드시 return을 넣어줘야 함
  });

  return <ul>{list}</ul>;
};

export default PhoneInfoList;
