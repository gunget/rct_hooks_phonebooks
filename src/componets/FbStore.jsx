import React, { createContext, useReducer, useEffect } from "react";
import useFetch from "./useFetch.jsx";
import FbReducer from "./FbReducer";

export const FbContext = createContext();
//Context를 사용하면 props를 자식컴포넌트에 전역적으로 쓸 수 있다는 장점이 있다.
//허나 이를 useReducer와 함께 쓰면(리턴값 state와 dispatch를 Context를 이용해 전달하면),
//이를 받아쓰는 모든 자식 컴포넌트들은, 다른 요소들에 의해 state나 dispatch가 변경되더라도
//자신이 끌어쓰는 state가 바뀐 것이므로 재 렌더링하게 된다. 이는 최적화에 불리하다.

//곧 모든 state를 하나의 reducer로 처리하는 것은 사용이나 관리에는 유리하지만 최적화에는 불리하다
//무조건 Redux처럼 한곳에서 state를 관리하려 하기보다, 나눌 수 있다면 국부적인 state를 사용하는 것이
//최적화엔 유리하다

const FbStore = (props) => {
  const [Fbooks, dispatch] = useReducer(FbReducer, {});
  // Fbstore가 실행될때마다 dispatch라는 함수는 같은 기능일지라도 새로 호출 된다. 이를 받아쓰는
  // 자식 컴포넌트들은 새로 렌더링이 필요해 진다
  const loading = useFetch(dispatch);

  console.log("FbStore.js 실행");

  let searchedList = loading ? '' : Fbooks.information.filter((obj) => {
    return obj.name.indexOf(Fbooks.search) !== -1 
  });

  useEffect(() => {
    console.log("Fbstore쪽 useEffect");
    console.log(Fbooks);
  }, [Fbooks]);

  return (
    <FbContext.Provider value={{ Fbooks, searchedList, loading, dispatch }}>
      {/* 복수개의 state를 context로 쓰려면 반드시 객체로 넘겨야 함 */}
      {props.children}
    </FbContext.Provider>
  );
};

export default FbStore;
