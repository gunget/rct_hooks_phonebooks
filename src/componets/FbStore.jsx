import React, { createContext, useReducer, useEffect } from "react";
import useFetch from "./useFetch.jsx";

export const FbContext = createContext();

const Reducer = (Fbooks, { type, payload }) => {
  // const idRef = useRef(3);
  console.log("reducer 실행됨");
  switch (type) {
    case "SET_INIT_DATA":
      return payload;

    // case "ADD_NUM_DATA":
    //   return {
    //     id: imformation.length + 1,
    //     imformation: [...imformation, payload],
    //   };

    default:
      break;
  }
};

const FbStore = (props) => {
  const [Fbooks, dispatch] = useReducer(Reducer, {});
  const loading = useFetch(dispatch);

  console.log("FbStore.js 실행");
  console.log(loading);

  useEffect(() => {
    console.log("Fbstore쪽 useEffect");
    console.log(Fbooks);
  }, [Fbooks]);

  return (
    <FbContext.Provider value={(Fbooks, loading)}>
      {props.children}
    </FbContext.Provider>
  );
};

export default FbStore;
