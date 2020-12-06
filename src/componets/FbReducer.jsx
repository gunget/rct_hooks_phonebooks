import { useRef, useState } from "react";

const FbReducer = (Fbooks, { type, payload }) => {
  console.log("reducer 실행됨");

  switch (type) {
    case "SET_INIT_DATA":
      const _information = payload.map((obj) => {
        return { ...obj, editing: false }; //fetch해온 obj에 필요한 값 추가하기
        // editing이란 속성을 개별 입력값마다 집어넣어줌
      });
      return { idx: 2, information: _information, search: "" };

    case "ADD_Fb_DATA":
      const _idx = payload.id;
      return {
        ...Fbooks,
        idx: _idx,
        information: [...Fbooks.information, payload],
      };

    case "DEL_Fb_DATA":
      const _Fbooks = Fbooks.information.filter((obj) => {
        return obj.id !== +payload; //return값이 array
      });
      return { ...Fbooks, idx: Fbooks.idx, information: _Fbooks };

    case "CHAGE_EDIT_MODE":
      const modeEditingObj = Fbooks.information.find((obj) => {
        return obj.id === +payload; //return값이 object 자체
      });
      modeEditingObj.editing = !modeEditingObj.editing;
      return { ...Fbooks }; //반드시 return하는 state필요
    //안의 일부 내용을 바꿔 새로운 객체를 선언해서 반환하는 것이기에 불변성 준수

    case "CHANGE_Fb":
      const editingObj = Fbooks.information.find((obj) => {
        return obj.id === +payload.id; //return값이 object 자체
      });
      editingObj.name = payload.name;
      editingObj.number = payload.number;
      editingObj.editing = !editingObj.editing;
      return { ...Fbooks }; //반드시 return하는 state필요
    //안의 일부 내용을 바꿔 새로운 객체를 선언해서 반환하는 것이기에 불변성 준수
  }
};

export default FbReducer;
