import React, { createContext, useState, useEffect } from "react";
import "./css/App.css";
import List from "./components/List.js";
import useFetch from "./components/useFetch.js";
// fetch하는 작업을 커스텀 훅스로 제작해서 재활용률을 높힘
import Headers from "./components/Headers.js";
import Form from "./components/Form";

export const TodoContext = createContext();
// 컴포넌트간 state전달을 위한 도구가 Context. return으로 provider와 consumer를 줌
// 부모단에서는 provider를 자식단에서는 consumer를 쓰면 되는데, 이 consumer의 역할을
// useContext가 간단하게 만들어 줌
// 외부에서 불러쓸 수 있게 export설정

function App() {
  const [todos, setTodos] = useState([]);
  // const [todos, setTodos] = useState(["js공부"]);
  // const [변수값, 메소드] = useState(["초기값"])
  // method가 실행되면 render함수가 자동으로 수행된다
  // 초기값을 array로 줘야 자식 컴포넌트에서 map함수를 적용할 수 있다.
  // map은 array에만 적용된다.

  const loading = useFetch(
    setTodos,
    "https://jsonplaceholder.typicode.com/todos"
  );

  const addNewTodo = (newTodo) => {
    setTodos([
      ...todos,
      {
        userId: 1,
        id: todos.length + 1,
        title: newTodo,
      },
    ]);
  };

  const changeTodoStatus = (id) => {
    // debugger;
    const updateTodos = todos.map((todo) => {
      if (todo.id === +id) {
        //todo.id가 리턴된 숫자 id와 같은 것 중에서
        //+id 넘어온 문자를 숫자로 바꿔줌
        if (todo.userId === 1) todo.userId = 0;
        //userId가 1이면 0르로 바꾸라,
        else todo.userId = 1; //아니면 1로 바꿔라
      }
      return todo; //바꾼 todo를 updateTodos라는 새로운 객체에 할 당
      // map을 이용할 때 조건을 걸고 변화를 줬다면 return으로 뭘 줄건지 정의 필요
    });
    setTodos(updateTodos); //새로운 객체를 덮어씌움. 뒤에 render실행됨
  };

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
        addNewTodo,
        loading,
        changeTodoStatus,
      }}
    >
      <Headers />

      <Form />

      <List />
    </TodoContext.Provider>
  );
}

export default App;
