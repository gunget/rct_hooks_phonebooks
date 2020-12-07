import React, { useState, useContext } from "react";
import { FbContext } from "./FbStore";

const PhoneInfo = ({ data }) => {
  // props로 받음
  const { dispatch } = useContext(FbContext);
  // const nameRef = useRef();
  // const numberRef = useRef();

  const [input, setInput] = useState({name:data.name, number:data.number});
  // const [valueName, setVlNm] = useState(data.name);
  // const [valueNumber, setVlNmbr] = useState(data.number);

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

  const inputChange = (e) => {
    const {name, value} = e.target;
    setInput({
      ...input, //불변성 유지를 위해 기존객체를 복사해 온 후,
      [name] : value // 새로운 값을 주는데 기존의 key가 있다면 값을 바꿔 줌
    })
  }

  // const inputNmChange = (e) => {
  //   setVlNm(nameRef.current.value);
  // };
  // const inputNmbrChange = (e) => {
  //   setVlNmbr(numberRef.current.value);
  // };

  const changeFb = (e) => {
    e.preventDefault();
    dispatch({
      type: "CHANGE_Fb",
      payload: {
        id: data.id,
        name: input.name,
        number: input.number,
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
          <input
            type="text"
            placeholder="이름"
            value={input.name}
            // ref={nameRef}
            name="name"
            onChange={inputChange}
          ></input>
          <input
            type="text"
            placeholder="전화번호"
            value={input.number}
            // ref={numberRef}
            name="number"
            onChange={inputChange}
          ></input>
          <button onClick={FbRemove}>삭제</button>
          <button onClick={changeFb}>적용</button>
      </div>
    );
  }
};

export default PhoneInfo;
