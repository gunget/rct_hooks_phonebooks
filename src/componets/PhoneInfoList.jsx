import React, { useContext } from "react";
import { FbContext } from "./FbStore";
import PhoneInfo from "./PhoneInfo";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    display: "inline-block",
    margin: "0 auto",
    color: "#000",
  },
  details: {
    display: "flex",
    justifyContent: "center",
    transform: "translateY(10%)",
  },
}));

const PhoneInfoList = () => {
  console.log("PhoneInfoList 컴포넌트 실행됨");
  const { loading, searchedList } = useContext(FbContext);

  const classes = useStyles();

  let list = loading ? (
    <div>"Loading..."</div>
  ) : (
    searchedList.map((data) => {
      return (
        <Accordion key={data.id} style={{ width: "85%", overflow: "hidden" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ background: "#dff3e3" }}
          >
            <Typography className={classes.heading}>{data.name}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <PhoneInfo key={data.id} data={data} />
          </AccordionDetails>
        </Accordion>
      );
      // arrow function사용시 한문장이면 {return}생략 가능
      // 여러줄일 경우 {}를 쓰고 반드시 return을 넣어줘야 함. map API만 그런듯.
    })
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "0",
      }}
    >
      {list}
    </div>
  );
};

export default PhoneInfoList;
