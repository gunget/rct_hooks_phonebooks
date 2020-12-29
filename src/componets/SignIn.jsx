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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
  },
  alert: {
    color: "red",
    textDecoration: "underline",
  },
}));

export default function SignIn({ history }) {
  const classes = useStyles();
  const alertMessage = useRef();

  const testSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: "travis7",
      email: "travis@travis.com",
      password: "djg12345",
    };

    const checkUser = async () => {
      const userRsp = await axios
        .post("http://localhost:8000/rest-auth/login/", data)
        .catch((error) => error.response); //return글자를 안써야 error값이 리턴된다!!!!!
      //또 axios는 error라고만 하면 response데이터를 볼 수 없다. error.response라 해야 한다.
      //하나 더, 동기작업(시퀸스작업)을 하려면 반드시 'axios의 return값을 받은 변수명'으로 다음 작업을
      //해야 한다.
      if (userRsp.status === 200) {
        getJwt();
      }
      console.log("error message:", userRsp);
      alertMessage.current.innerHTML =
        "ID 또는 비밀번호를 잘 못 입력하셨습니다.";
      alertMessage.current.className = classes.alert;
    };

    function getJwt() {
      axios
        .post("http://127.0.0.1:8000/api-jwt-auth/", data)
        .then((response) => console.log("새jwt:", response));
    }
    // const config = {
    //   token:
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InRyYXZpczIiLCJleHAiOjE2MDk4MDk0MjMsImVtYWlsIjoidHJhdmlzQHRyYXZpcy5jb20iLCJvcmlnX2lhdCI6MTYwOTE0MDYwM30.UGrEEjY2fqqR6AhgLEh59onCkYNON5VonjA7G_lbzrU",
    // };
    // localStorage.setItem("Fbooks", JSON.stringify(Fbooks));

    const jwtFromLS = JSON.parse(localStorage.getItem("jwt"));
    if (jwtFromLS) {
      axios
        .post("http://localhost:8000/api-jwt-auth/refresh/", jwtFromLS)
        .then((response) => {
          localStorage.setItem("jwt", JSON.stringify(response.data));
        })
        .then(history.push("/main/"))
        .catch((error) => {
          console.log(error);
        });
    } else {
      checkUser();

      // axios
      //   .post("http://localhost:8000/rest-auth/login/", data)
      //   .then(getJwt())
      //   .catch((error) => console.log("에러:", error));

      // console.log("userRsp:", Rsp);
      // if (userRsp.status === undefined) {
      //   console.log("사용자 또는 비번이 잘못됐습니다");
      // } else {
      //   axios
      //     .post("http://127.0.0.1:8000/api-jwt-auth/", data)
      //     .then((response) => console.log(response));
      // }
    }

    // axios
    //   .post(
    //     `http://localhost:8000/rest-auth/login/`, //DB수정 구문
    //     data
    //   )
    //   .then(history.push("/main/"))
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form
          className={classes.form}
          noValidate
          // action="http://localhost:8000/rest-auth/login/"
          // method="post"
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            name="Username"
            autoComplete="Username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="Email"
            label="Email"
            name="Email"
            autoComplete="Email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            name="Password"
            label="Password"
            id="Password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={testSubmit}
          >
            로그인
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/SignUp" variant="body2">
                <div ref={alertMessage}>"계정이 없습니까? 회원가입하세요."</div>
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
