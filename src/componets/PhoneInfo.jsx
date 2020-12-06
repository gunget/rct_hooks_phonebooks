import React, { useState, useContext, useRef } from "react";
import { FbContext } from "./FbStore";

const PhoneInfo = ({ data }) => {
  // props로 받음
  const { Fbooks, dispatch } = useContext(FbContext);
  const nameRef = useRef();
  const numberRef = useRef();
  const [valueName, setVlNm] = useState(data.name);
  const [valueNumber, setVlNmbr] = useState(data.number);

  const style = {
    backgroundColor: "skyblue",
    width: "100%",
    opacity: "0.85",
  };

  const FbRemove = (e) => {
    e.preventDefault();
    dispatch({ type: "DEL_Fb_DATA", payload: e.target.parentNode.dataset.id });
  };

  const ModeChange = (e) => {
    e.preventDefault();
    dispatch({
      type: "CHAGE_EDIT_MODE",
      payload: e.target.parentNode.dataset.id,
    });
  };

  const inputNmChange = (e) => {
    setVlNm(nameRef.current.value);
  };
  const inputNmbrChange = (e) => {
    setVlNmbr(numberRef.current.value);
  };

  const changeFb = (e) => {
    e.preventDefault();
    console.log(data.id, nameRef.current.value, numberRef.current.value);
    dispatch({
      type: "CHANGE_Fb",
      payload: {
        id: data.id,
        name: nameRef.current.value,
        number: numberRef.current.value,
      },
    });
  };

  if (!data.editing) {
    return (
      <div style={style} data-id={data.id}>
        {data.name} {data.number}
        <span> </span>
        <button onClick={FbRemove}>삭제</button>
        <button onClick={ModeChange}>수정</button>
      </div>
    );
  } else {
    return (
      <div style={style} data-id={data.id}>
        <form>
          <input
            type="text"
            placeholder="이름"
            value={valueName}
            ref={nameRef}
            name="name"
            onChange={inputNmChange}
          ></input>
          <input
            type="text"
            placeholder="전화번호"
            value={valueNumber}
            ref={numberRef}
            number="number"
            onChange={inputNmbrChange}
          ></input>
          <button onClick={changeFb}>적용</button>
        </form>
      </div>
    );
  }
};

export default PhoneInfo;
