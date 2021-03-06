// import React from "react";

const FbReducer = (Fbooks, { type, payload }) => {
  console.log("reducer 실행됨");

  switch (type) {
    case "SET_INIT_DATA":
      console.log("리듀서로 넘어온 payload값", payload);
      const informationArr = payload.information;
      console.log("리듀서에서 따낸 infom값", informationArr);
      const _initIdx = informationArr[informationArr.length - 1].id;
      const _information = payload.information.map((obj) => {
        return { ...obj, editing: false }; //fetch해온 obj에 필요한 값 추가하기
        // editing이란 속성을 개별 입력값마다 집어넣어줌
      });
      console.log("변경된 유저정보", _information);
      return {
        idx: _initIdx,
        information: _information,
        search: "",
        jwt: "",
      };

    // 기존 localStorage로 작업할 때 버전
    // case "SET_INIT_DATA":
    //   console.log("리듀서로 넘어온 payload값", payload.information);
    //   const _information = payload.information.map((obj) => {
    //     return { ...obj, editing: false }; //fetch해온 obj에 필요한 값 추가하기
    //     // editing이란 속성을 개별 입력값마다 집어넣어줌
    //   });
    //   return {
    //     idx: payload.idx,
    //     information: _information,
    //     search: payload.search,
    //   };

    case "ADD_Fb_DATA":
      console.log("addFhoneBook 리듀서", payload);
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

    case "SEARCH_NAME":
      return { ...Fbooks, search: payload };

    case "SET_Fb_IDX":
      return { ...Fbooks, idx: payload };

    case "SET_JWT":
      return { ...Fbooks, jwt: payload };

    default:
      return "nothing requested";
  }
};

export default FbReducer;
