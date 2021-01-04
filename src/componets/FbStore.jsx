import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

import useFetch from "./useFetch.jsx";
import FbReducer from "./FbReducer";
import InputForm from "./InputForm";
import Search from "./Search";
import PhoneInfoList from "./PhoneInfoList";
import LocalStorageBtn from "./LocalStorageBtn";
import Button from "@material-ui/core/Button";
import "../css/FbStore.css";

export const FbContext = createContext();
//Context를 사용하면 props를 자식컴포넌트에 전역적으로 쓸 수 있다는 장점이 있다.
//허나 이를 최상위에서 useReducer와 함께 쓰면(리턴값 state와 dispatch를 Context를 이용해 전달하면),
//이를 받아쓰는 모든 자식 컴포넌트들은, 다른 요소들에 의해 state나 dispatch가 변경되더라도
//자신이 끌어쓰는 state가 바뀐 것이므로 재 렌더링하게 된다. 이는 최적화에 불리하다.

//해결하기위한 방법은 Context를 최상위에 사용하는 방식은 지양하고, 간단한 전달은 props로,
//props drilling이 필요한 상황에서는 그 컴포넌트만 Context를 사용하는 방식으로 접근해야
//불필요한 재 렌더링을 막을 수 있다

const FbStore = ({ location, history }) => {
  const [Fbooks, dispatch] = useReducer(FbReducer, {});
  const loading = useFetch(Fbooks, dispatch);
  const username = location.state.username;

  console.log("FbStore.js 실행");
  console.log("FbStore쪽 username:", username);
  // console.log("FbStore쪽 location:", location);
  //얘는 라우터에 직접 물린 컴포넌트가 아니라 location등을 받아올 수 없다. props로 받아옴

  let searchedList = loading
    ? ""
    : Fbooks.information.filter((obj) => {
        return obj.name.indexOf(Fbooks.search) !== -1;
      });

  const btnLogout = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `jwt ${Fbooks.jwt.token}`,
      },
    };
    axios
      .post("http://localhost:8000/rest-auth/logout/", config)
      .then(localStorage.removeItem("jwt"))
      .then(history.push("/"));
  };

  useEffect(() => {
    console.log("Fbstore쪽 useEffect");
    console.log(Fbooks);
  }, [Fbooks]);

  return (
    // Context를 최상위에 사용하는 방식
    // <FbContext.Provider value={{ Fbooks, searchedList, loading, dispatch }}>
    //   {/* 복수개의 state를 context로 쓰려면 반드시 객체로 넘겨야 함 */}
    //   {props.children}
    // </FbContext.Provider>
    <div className="Fbstore">
      <div className="inptForm">
        <InputForm dispatch={dispatch} index={Fbooks.idx} jwt={Fbooks.jwt} />
      </div>
      <div className="srchForm">
        <Search dispatch={dispatch} />
      </div>
      <FbContext.Provider value={{ Fbooks, searchedList, loading, dispatch }}>
        <PhoneInfoList />
      </FbContext.Provider>
      <div className="lstgBtn">
        <LocalStorageBtn Fbooks={Fbooks} />
      </div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        disableElevation //약간 돌출된 효과 없애기
        style={{ position: "absolute", top: "-75px", right: "0" }}
        onClick={btnLogout}
      >
        {username} : Logout
      </Button>
    </div>
  );
};

export default FbStore;
