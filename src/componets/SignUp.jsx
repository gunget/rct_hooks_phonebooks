import React, { useRef } from "react";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Time to share all
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    color: "red",
    textDecoration: "underline",
    margin: "0 auto",
  },
}));

export default function SignUp({ history }) {
  const classes = useStyles();
  const nameRef = useRef();
  const emailRef = useRef();
  const pw1Ref = useRef();
  const pw2Ref = useRef();
  const alertRef = useRef(
    "비밀번호는 문자숫자를 결합하여 8글자 이상이어야 합니다."
  );
  console.log(alertRef);

  const submitNewUser = async (e) => {
    e.preventDefault();
    let data = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password1: pw1Ref.current.value,
      password2: pw2Ref.current.value,
    };
    console.log("등록시도 전 입력데이터", data);

    const regMsg = await axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", data)
      .catch((error) => {
        alertRef.current.innerHTML =
          "Username 또는 Email이 중복되었거나, Password가 다릅니다.";
        alertRef.current.className = classes.alert;
        return error.response;
      });
    console.log("등록시도 aixos후 메시지", regMsg);

    if (regMsg.status >= 200 && regMsg.status < 300) {
      const confirm = window.confirm(
        "정상적으로 가입되었습니다. 다시 로그인 하세요."
      );
      history.push("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} onSubmit={submitNewUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="username"
                autoFocus
                inputRef={nameRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
                inputRef={pw1Ref}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Password_Confirm"
                type="password"
                id="password2"
                inputRef={pw2Ref}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                ref={alertRef}
                label={alertRef.current}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            회원가입
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/" variant="body2">
                이미 계정이 있습니까? 로그인하세요.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
