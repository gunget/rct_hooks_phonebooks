import React from "react";
import FbStore from "./componets/FbStore";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  text: {
    display: "inline-block",
    color: "#000",
    fontFamily: "Roboto",
    textAlign: "center",
    margin: "30px auto",
  },
});

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" style={{ background: "gray" }}>
        <Typography component="div" variant="h3" className={classes.text}>
          React Phone Book
        </Typography>
        <FbStore />
      </Container>
    </>
  );
}

export default App;
