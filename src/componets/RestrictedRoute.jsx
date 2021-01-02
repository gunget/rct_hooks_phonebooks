import React from "react";
import { Redirect } from "react-router-dom";

const RestrictedRoute = ({ component, location }) => {
  const Component = component;
  //   const isAuthenticated = location.state.isAuthenticated;
  const isAuthenticated = false;
  console.log("RestricedRoute의 isAuthenticated:", isAuthenticated);
  return isAuthenticated ? <Component /> : <Redirect to={{ pathname: "/" }} />;
};

export default RestrictedRoute;
