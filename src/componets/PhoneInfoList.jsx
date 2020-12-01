import React, { useContext } from "react";
import { FbContext } from "./FbStore";
import PhoneInfo from "./PhoneInfo";

const PhoneInfoList = () => {
  const { information } = useContext(FbContext);
  const list = information.map((data) => {
    <PhoneInfo key={data.id} />;
  });
  // const list = [<PhoneInfo key="1" />, <PhoneInfo key="2" />];

  // 왜 map을해서 phoneinfo에 넣었는데 표현이 안될까.
  // map함수를 정확히 다시 공부 할 것
  return <ul>{list}</ul>;
};

export default PhoneInfoList;
