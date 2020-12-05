import { useRef, useState } from "react";

const FbReducer = (Fbooks, { type, payload }) => {
  console.log("reducer 실행됨");

  switch (type) {
    case "SET_INIT_DATA":
      return { idx: 2, information: payload, search: "" };

    case "ADD_Fb_DATA":
      const _idx = payload.id;
      return {
        idx: _idx,
        information: [...Fbooks.information, payload],
        search: "",
      };
    case "DEL_Fb_DATA":
      const _Fbooks = Fbooks.information.filter((obj) => {
        return obj.id !== +payload;
      });
      return {
        idx: Fbooks.idx,
        information: _Fbooks,
        search: "",
      };
  }
};

export default FbReducer;
