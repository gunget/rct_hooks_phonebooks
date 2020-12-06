import React, { useContext, useRef } from "react";
import { FbContext } from "./FbStore";

const InputForm = () => {
  const { Fbooks, dispatch } = useContext(FbContext);
  const nameRef = useRef();
  const numberRef = useRef();

  const addFbook = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_Fb_DATA",
      payload: {
        id: Fbooks.idx + 1,
        name: nameRef.current.value,
        number: numberRef.current.value,
        editing: false,
      },
    });
    nameRef.current.value = "";
    numberRef.current.value = "";
  };

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

export default InputForm;
