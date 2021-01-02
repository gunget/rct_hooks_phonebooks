import React from "react";
import FbStore from "./componets/FbStore";
import SignIn from "./componets/SignIn";
import SignUp from "./componets/SignUp";
import RestrictedRoute from "./componets/RestrictedRoute";
import NotFound from "./componets/NotFound";

import CssBaseline from "@material-ui/core/CssBaseline";
import Appbar from "./componets/Appbar";
import Container from "@material-ui/core/Container";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

//Mui theme사용법
//프로젝트 전체의 look&feel은 theme을 만들어서 지정. 이를 provider로 하위 컴포넌트에 제공
//하위 컴포넌트들은 makeStyle이라는 것을 이용해 디자인을 만들어가는 개념 인듯
//Mui는 기본적으로 default theme이라는 것을 제공하고 있어서, 이들이 제공하는 기본
//컴포넌트들을 받아쓰다 보면 theme을 활용하는 것을 볼 수 있음

// const theme = createMuiTheme({
//   background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//   boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
// });
// //

function App() {
  return (
    <>
      <CssBaseline />
      {/* 브라우저에 상관없이 동일한 css가 적용되도록 정규화 하는 컴포넌트 */}
      <Appbar />
      <Container
        maxWidth="lg"
        style={{
          borderLeft: "1px solid rgba(0,0,0,0.2)",
          borderRight: "1px solid rgba(0,0,0,0.2)",
          height: "100vh",
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <RestrictedRoute path="/main" component={FbStore} />
            {/* 사용자가 url을 직접입력해 landing Page로 접근하는 것 막기 위해 제한된 Route설정 */}
            {/* <Route path="/main" component={FbStore} /> */}
            <Route component={NotFound} />
            {/* 실제 배포시에는 이렇게 해서 API나 관리자로 접근하는 걸 막을 수도 있겠다. */}
            {/* <Route exact path='/' component={FbStore} /> */}
          </Switch>
        </Router>
      </Container>
    </>
  );
}

export default App;
