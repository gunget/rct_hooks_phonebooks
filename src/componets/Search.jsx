import React, { useRef, useCallback } from "react";
// import { FbContext } from "./FbStore";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ReplyIcon from "@material-ui/icons/Reply";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    position: "absolute",
  },
  form: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    padding: "10px 0",
    width: "95%",
  },
}));

const Search = ({ dispatch }) => {
  console.log("Search 실행");
  // const {dispatch} = useContext(FbContext);
  const searchRef = useRef(false);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: "SEARCH_NAME", payload: searchRef.current.value });
  }, []);
  //컴포넌트가 재렌더링 되면 그안의 함수 선언도 다시 메모리에 띄워진다. 내용의 변화가
  //없는데도 바뀌는 건 낭비. 이를 막기위해 '변화가 없을시 기존 함수를 다시써라'라는 의미로
  //useCallback을 사용. 특정변화에만 반응하도록 하기 위해선 2번째 인자 활용. callback으로
  //정의한 함수 바깥의 요소를 감시대상으로 선정하면 된다.

  const handleGoback = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: "SEARCH_NAME", payload: "" });
    searchRef.current.value = "";
  }, []);

  const classes = useStyles();

  return (
    <form className={classes.form}>
      <TextField
        label="Search"
        variant="outlined"
        inputRef={searchRef}
        size="small"
      />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        className={classes.button}
        startIcon={<SearchIcon />} //머리부분 아이콘
        onClick={handleSearch}
        style={{ transform: "translate(-160px, -10%" }}
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        className={classes.button}
        startIcon={<ReplyIcon />} //머리부분 아이콘
        onClick={handleGoback}
        style={{ transform: "translate(168px, -10%" }}
      >
        Contents
      </Button>
    </form>
  );
};

export default React.memo(Search);
