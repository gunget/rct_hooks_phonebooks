import React, { createContext, useReducer, useEffect } from "react";
import useFetch from "./useFetch.jsx";
import FbReducer from "./FbReducer";

export const FbContext = createContext();

const FbStore = (props) => {
  const [Fbooks, dispatch] = useReducer(FbReducer, {});
  const loading = useFetch(dispatch);

  console.log("FbStore.js 실행");
  console.log(loading);

  useEffect(() => {
    console.log("Fbstore쪽 useEffect");
    console.log(Fbooks);
  }, [Fbooks]);

  return (
    <FbContext.Provider value={{ Fbooks, loading, dispatch }}>
      {/* 복수개의 state를 context로 쓰려면 반드시 객체로 넘겨야 함 */}
      {props.children}
    </FbContext.Provider>
  );
};

export default FbStore;
