import React, { useCallback } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

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

const LocalStorageBtn = ({ Fbooks }) => {
  const saveToLS = (e) => {
    e.preventDefault();
    localStorage.setItem("Fbooks", JSON.stringify(Fbooks));
    alert("전화번호부가 브라우저에 저장되었습니다.");
  };

  const deleteLS = useCallback((e) => {
    e.preventDefault();
    if (window.confirm("정말 전화번호부를 삭제하시겠습니까?")) {
      localStorage.clear();
      alert("삭제되었습니다");
    } else {
      alert("삭제가 취소되었습니다.");
    }
  }, []);

  const classes = useStyles();

  return (
    <>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <Button onClick={saveToLS}>임시 백업</Button>
        <Button onClick={deleteLS}>백업 삭제</Button>
      </ButtonGroup>
      {/* <button onClick={saveToLS}>임시 백업</button>
      <button onClick={deleteLS}>백업 삭제</button> */}
    </>
  );
};

export default React.memo(LocalStorageBtn);
