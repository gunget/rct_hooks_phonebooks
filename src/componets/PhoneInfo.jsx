import React, { useRef, useState, useContext, useCallback } from "react";
import { FbContext } from "./FbStore";
import { Typography } from "@material-ui/core";

const PhoneInfo = ({ data }) => {
  // props로 받음
  const { dispatch } = useContext(FbContext);
  const itemRef = useRef();

  const [input, setInput] = useState({ name: data.name, number: data.number });
  // const [valueName, setVlNm] = useState(data.name);
  // const [valueNumber, setVlNmbr] = useState(data.number);

  const style = {
    backgroundColor: "skyblue",
    width: "100%",
    opacity: "0.85",
  };

  const FbRemove = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: "DEL_Fb_DATA", payload: itemRef.current.dataset.id });
  }, []);
  //컴포넌트가 재렌더링 되면 그안의 함수 선언도 다시 메모리에 띄워진다. 내용의 변화가
  //없는데도 바뀌는 건 낭비. 이를 막기위해 '변화가 없을시 기존 함수을 다시써라'라는 의미로
  //useCallback을 사용. 특정변화에만 반응하도록 하기 위해선 2번째 인자 활용. callback으로
  //정의한 함수 바깥의 요소를 감시대상으로 선정하면 된다.

  const ModeChange = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: "CHAGE_EDIT_MODE",
      payload: itemRef.current.dataset.id,
    });
  }, []);

  const inputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInput({
        ...input, //불변성 유지를 위해 기존객체를 복사해 온 후,
        [name]: value, // 새로운 값을 주는데 기존의 key가 있다면 값을 바꿔 줌
      });
    },
    [input]
  );

  // const inputNmChange = (e) => {
  //   setVlNm(nameRef.current.value);
  // };
  // const inputNmbrChange = (e) => {
  //   setVlNmbr(numberRef.current.value);
  // };

  const changeFb = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: "CHANGE_Fb",
        payload: {
          id: data.id,
          name: input.name,
          number: input.number,
        },
      });
    },
    [input]
  );

  if (!data.editing) {
    return (
      // <div style={style} data-id={data.id} ref={itemRef}>
      <div data-id={data.id} ref={itemRef}>
        <Typography variant="h6">
          {data.name} {data.number}
          <span> </span>
          <button onClick={FbRemove}>삭제</button>
          <button onClick={ModeChange}>수정</button>
        </Typography>
      </div>
    );
  } else {
    return (
      <div style={style} data-id={data.id} ref={itemRef}>
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
