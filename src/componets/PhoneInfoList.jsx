import React, { useContext } from "react";
import { FbContext } from "./FbStore";
import PhoneInfo from "./PhoneInfo";

const PhoneInfoList = () => {
  console.log("PhoneInfoList 컴포넌트 실행됨");
  const { loading, Fbooks } = useContext(FbContext);
  console.log(`phoneInfoList Loading=${loading}`);
  let list =
    loading? (
      <li>"Loading..."</li>
    ) : (
      Fbooks.information.map((data) => {
        return <PhoneInfo key={data.id} data={data} />;
        // arrow function사용시 한문장이면 {return}생략 가능
        // 여러줄일 경우 {}를 쓰고 반드시 return을 넣어줘야 함. map API만 그런듯.
      })
    );

  return <ul>{list}</ul>;
};

export default PhoneInfoList;
