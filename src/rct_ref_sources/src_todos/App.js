import { createContext, useEffect, useReducer } from "react";
import "./css/App.css";
import useFetch from "./components/useFetch.js";
// fetch하는 작업을 커스텀 훅스로 제작해서 재활용률을 높힘
import todoReducer from "./components/todoReducer.js";

export const TodoContext = createContext();
// 컴포넌트간 state전달을 위한 도구가 Context. return으로 provider와 consumer를 줌
// 부모단에서는 provider를 자식단에서는 consumer를 쓰면 되는데, 이 consumer의 역할을
// useContext가 간단하게 만들어 줌
// 외부에서 불러쓸 수 있게 export설정

function App(props) {
  //stae를 관리하는 store의 역할만 남길 것
  const [todos, dispatch] = useReducer(todoReducer, []);
  // 이렇게 하면 최초 todos = [];라는 것이 실행 된다.
  // cmpDidMnt에 해당, 이후 useEffect가 한번 실행됨

  // dispatch를 App.js에서 정의하는 방식
  // const setInitData = (initData) => {
  //   // useFetch에서 사용하게 될 함수. initData는 usefetch에서 제공됨
  //   dispatch({ type: "SET_INIT_DATA", payload: initData });
  // };

  const loading = useFetch(
    dispatch,
    "https://jsonplaceholder.typicode.com/todos"
  );

  useEffect(() => {
    //cpDidmout, cpDidUpdate등 rendering 이후에 실행되는 함수의 역할 대행
    //Life Cycle API에서 우리가 수행했던 API 요청, DOM 조작 등이 side effect이기 때문에, useEffect라는 이름의 API가 됨
    console.log("새로운 내용이 입력됐습니다", todos);
  }, [todos]); // 두번째 인자가 '변화될 대상' 지정. 그 대상의 변화가 있을 때만
  //useEffect함수를 실행함.

  return (
    <TodoContext.Provider
      value={{
        todos,
        dispatch,
        loading,
      }}
    >
      {props.children}
      {/* 부모에게 받은 자식 컴포넌트 들을 의미 */}
    </TodoContext.Provider>
  );
}

export default App;
// 파일을 외부에서 호출했을때 디폴트로 호출할 수 있는 함수를 이걸로 정해라 라는 뜻
// 'import App from App.js'하면 App컴포넌트가 호출 됨

// 이것로 하지 않고 함수 명에 'exprot 함수명'만으로 선언 시,import하는 쪽에서는
// 'import {함수명} from 파일' 형식으로 불러올 수 있다.
