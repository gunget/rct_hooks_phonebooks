import React, { useRef, useState, useContext, useCallback } from "react";
import { FbContext } from "./FbStore";
import axios from "axios";

import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const PhoneInfo = ({ data }) => {
  // props로 받음
  const { Fbooks, dispatch } = useContext(FbContext);
  const itemRef = useRef();

  const [input, setInput] = useState({ name: data.name, number: data.number });
  // const [valueName, setVlNm] = useState(data.name);
  // const [valueNumber, setVlNmbr] = useState(data.number);

  const FbRemove = (e) => {
    e.preventDefault();
    dispatch({ type: "DEL_Fb_DATA", payload: itemRef.current.dataset.id });
    axios.delete(
      `http://localhost:8000/api/users/${itemRef.current.dataset.id}/`
    );
    if (
      itemRef.current.dataset.id ===
      Fbooks.information[Fbooks.information.length - 1].id
    ) {
      dispatch({ type: "SET_Fb_IDX", payload: itemRef.current.dataset.id });
    }
  };
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
          id: itemRef.current.dataset.id,
          name: input.name,
          number: input.number,
        },
      });
      let data = {
        name: input.name,
        number: input.number,
        fbooks: 2, //반드시 DRF API상의 변수와 값을 맞춰줘야 한다. 틀리면 어디에 넣을지 모르므로
      };
      axios.put(
        `http://localhost:8000/api/users/${itemRef.current.dataset.id}/`, //DB수정 구문
        data
      );
    },
    [input]
  );

  const classes = useStyles();

  if (!data.editing) {
    return (
      // <div style={style} data-id={data.id} ref={itemRef}>
      <div data-id={data.id} ref={itemRef}>
        <Typography variant="h6" style={{ color: "rgba(0,0,0,0.55)" }}>
          {data.name} : {data.number}
          <span>&nbsp;&nbsp;</span>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
            disableElevation
          >
            <Button onClick={FbRemove}>삭제</Button>
            <Button onClick={ModeChange}>수정</Button>
          </ButtonGroup>
        </Typography>
      </div>
    );
  } else {
    return (
      <div data-id={data.id} ref={itemRef}>
        <TextField
          label="Name"
          variant="standard"
          size="small"
          value={input.name}
          name="name"
          onChange={inputChange}
        />
        <span>&nbsp;&nbsp;</span>
        <TextField
          label="Phone-NUM"
          variant="standard"
          size="small"
          value={input.number}
          name="number"
          onChange={inputChange}
        />
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={FbRemove}>삭제</Button>
          <Button onClick={changeFb}>변경</Button>
        </ButtonGroup>
      </div>
    );
  }
};

export default PhoneInfo;
