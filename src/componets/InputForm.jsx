import React, { useRef, useCallback } from "react";
// import { FbContext } from "./FbStore";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const InputForm = ({ dispatch, index }) => {
  const classes = useStyles();
  // const { dispatch } = useContext(FbContext);
  // let [idx, setIdx] = useState(index);
  const nameRef = useRef();
  const numberRef = useRef();
  console.log("inputform인덱스", index);

  const addFbook = useCallback(
    (e) => {
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
      nameRef.current.value = "";
      numberRef.current.value = "";
      // setIdx(++idx);
    },
    [index]
  );

  console.log("InputForm 실행");
  return (
    <>
      <form>
        <TextField label="Name" variant="standard" ref={nameRef} size="small" />
        <span> </span>
        <TextField
          label="Phone-NUM"
          variant="standard"
          size="small"
          ref={numberRef}
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
