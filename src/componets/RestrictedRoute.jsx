import React from "react";
import { Redirect } from "react-router-dom";

const RestrictedRoute = ({ component, location, history }) => {
  //컴포넌트가 준 props와 Route가 준 props(history location)를 각각 받아옴
  //리액터 라우터의 route가 아닌 임의의 router인데도 location이 받아짐

  const Component = component; // 컴포넌트로 만들기 위해 대문자화
  const isAuthenticated =
    location.state !== undefined ? location.state.isAuthenticated : false;
  //로그인시 isAuthenticate를 주는데 이게 없다면 false

  console.log("RestricedRoute에 넘어온 location:", location);
  const username = location.state.username;
  if (isAuthenticated !== false) {
    return <Component username={username} history={history} />; //정상적인 로그인 일때
  } else {
    return <Redirect to={{ pathname: "/" }} />; //url로 직접접근 하려 들때
  }
};

export default RestrictedRoute;
