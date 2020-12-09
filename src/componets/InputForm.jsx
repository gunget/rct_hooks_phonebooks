import React, { useContext, useRef, useState, useCallback } from "react";
import { FbContext } from "./FbStore";

const InputForm = ({ dispatch }) => {
  // const { dispatch } = useContext(FbContext);
  let [idx, setIdx] = useState(2);
  const nameRef = useRef();
  const numberRef = useRef();

  const addFbook = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_Fb_DATA",
      payload: {
        id: idx + 1,
        name: nameRef.current.value,
        number: numberRef.current.value,
        editing: false,
      },
    });
    nameRef.current.value = "";
    numberRef.current.value = "";
    setIdx(++idx);
  }, []);

  console.log("InputForm 실행");
  return (
    <>
      <form>
        <input type="text" placeholder="이름" ref={nameRef}></input>
        <input type="text" placeholder="전화번호" ref={numberRef}></input>
        <button onClick={addFbook}>저장</button>
      </form>
    </>
  );
};

export default React.memo(InputForm); //단순히 props의 값이 같은지만 얕은 비교 한다고 함. 해서 다를때만 다시 렌더링

// 깊은 비교를 하고 싶을 경우 추가
// function areEqual(preProps, nextProps) {
//   return preProps !== nextProps;
// }

// export default React.memo(InputForm, areEqual);
