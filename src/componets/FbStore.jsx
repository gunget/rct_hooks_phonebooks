import React, { useRef, createContext, useReducer } from "react";
import useFetch from "./useFetch";

export const FbContext = createContext();

const Reducer = (Fbooks, { type, payload }) => {
  const idRef = useRef(3);
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

  return (
    <FbContext.Provider value={Fbooks}>{props.children}</FbContext.Provider>
  );
};

export default FbStore;
