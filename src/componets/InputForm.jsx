import React, { useRef, useCallback } from "react";
import axios from "axios";

// import { FbContext } from "./FbStore";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  form: {
    display: "flex",
    justifyContent: "center",
    boxShadow: "1px 1px 3px #000",
    padding: "30px 0",
    borderRadius: "5px",
  },
}));

const InputForm = ({ dispatch, index, jwt }) => {
  const classes = useStyles();
  // const { dispatch } = useContext(FbContext);
  // let [idx, setIdx] = useState(index);
  const nameRef = useRef();
  const numberRef = useRef();

  const addFbook = (e) => {
    console.log("inputform데이터---", nameRef);
    e.preventDefault();
    dispatch({
      type: "ADD_Fb_DATA",
      payload: {
        id: index + 1,
        name: nameRef.current.value,
        number: numberRef.current.value,
        editing: false,
      },
    });

    const config = {
      headers: {
        Authorization: `jwt ${jwt.token}`,
      },
    };
    let data = {
      name: nameRef.current.value,
      number: numberRef.current.value,
      fbooks: 1, //반드시 DRF API상의 변수와 값을 맞춰줘야 한다. 틀리면 어디에 넣을지 모르므로
      // /api/user 로 접근이 안되면 jwt를 중지하고 보면 확인할 수 있다.
    };

    // axios.defaults.xsrfCookieName = "csrftoken";
    // axios.defaults.xsrfHeaderName = "X-CSRFToken"; //웹사이트 해킹 방지용도
    axios.post("http://127.0.0.1:8000/api/users/", data, config); // (url, data, 헤더정보)순

    nameRef.current.value = "";
    numberRef.current.value = "";
  };

  console.log("InputForm 실행");
  return (
    <>
      <form className={classes.form}>
        <TextField
          // autoFocus="true"
          label="Name"
          variant="standard"
          inputRef={nameRef}
          size="small"
          autoFocus
        />
        <span>&nbsp;&nbsp;</span>
        <TextField
          label="Phone-NUM"
          variant="standard"
          size="small"
          inputRef={numberRef}
        />
        {/* <input type="text" placeholder="이름"></input>
        <input type="text" placeholder="전화번호"></input> */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />} //머리부분 아이콘
          onClick={addFbook}
          disableElevation //약간 돌출된 효과 없애기
        >
          Save
        </Button>
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
