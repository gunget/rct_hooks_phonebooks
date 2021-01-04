import React from "react";
import { Redirect } from "react-router-dom";

const RestrictedRoute = ({ component, location }) => {
  //컴포넌트가 준 props와 Route가 준 props(history location state)를 각각 받아옴
  const Component = component; // 컴포넌트로 만들기 위해 대문자화
  const isAuthenticated =
    location.state !== undefined ? location.state.isAuthenticated : false;
  //로그인시 isAuthenticate를 주는데 이게 없다면 false
  if (isAuthenticated !== false) {
    return <Component />; //정상적인 로그인 일때
  } else {
    return <Redirect to={{ pathname: "/" }} />; //url로 직접접근 하려 들때
  }
};

export default RestrictedRoute;
