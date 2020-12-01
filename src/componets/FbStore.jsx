import React, { useState, createContext } from "react";

export const FbContext = createContext();

// const Reducer = (Fbooks, { type, payload }) => {
//   switch (type) {
//     case "SET_INIT_DATA":
//       return payload;

//     // case "ADD_NUM_DATA":
//     //   return {
//     //     id: imformation.length + 1,
//     //     imformation: [...imformation, payload],
//     //   };

//     default:
//       break;
//   }
// };

const FbStore = (props) => {
  const user = {
    id: 1,
    information: [
      {
        id: 1,
        name: "홍길동",
        number: "010-0101-0011",
      },
      {
        id: 2,
        name: "동영준",
        number: "010-5551-0011",
      },
    ],
    keyword: "",
  };
  // const [Fbooks, dispatch] = useReducer(Reducer, []);
  // dispatch({
  //   type: "SET_INIT_DATA",
  //   payload: {
  //     id: 1,
  //     imformation: [
  //       {
  //         id: 1,
  //         name: "홍길동",
  //         number: "010-0101-0011",
  //       },
  //     ],
  //     keyword: "",
  //   },
  // });
  return <FbContext.Provider value={user}>{props.children}</FbContext.Provider>;
};

export default FbStore;
