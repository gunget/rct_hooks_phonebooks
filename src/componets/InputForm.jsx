import React, { useContext, useRef, useState, useCallback } from "react";
import { FbContext } from "./FbStore";

const InputForm = () => {
  const { dispatch } = useContext(FbContext);
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

function areEqual(predispatch, nextdispatch) {
  return predispatch === nextdispatch;
}


export default React.memo(InputForm, areEqual);
