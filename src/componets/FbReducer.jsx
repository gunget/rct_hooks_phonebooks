import { useRef, useState } from "react";

const FbReducer = (Fbooks, { type, payload }) => {
  console.log("reducer 실행됨");
  const _idx = payload.id;
  switch (type) {
    case "SET_INIT_DATA":
      return { idx: 2, information: payload, search: "" };

    case "ADD_Fb_DATA":
      return {
        idx: _idx,
        information: [...Fbooks.information, payload],
        search: "",
      };
  }
};

export default FbReducer;
