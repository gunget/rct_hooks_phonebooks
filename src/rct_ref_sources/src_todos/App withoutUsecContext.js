import React, { useState, useEffect } from "react";
import "./css/App.css";
import List from "./components/List.js";
import useFetch from "./components/useFetch.js";
// fetch하는 작업을 커스텀 훅스로 제작해서 재활용률을 높힘
import Headers from "./components/Headers.js";
import Form from "./components/Form";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  // const [todos, setTodos] = useState(["js공부"]);
  // const [변수값, 메소드] = useState(["초기값"])
  // method가 실행되면 render함수가 자동으로 수행된다
  // 초기값을 array로 줘야 자식 컴포넌트에서 map함수를 적용할 수 있다.
  // map은 array에만 적용된다.
  const [newTodo, setNewTodo] = useState({
    userId: "",
    id: "",
    title: "",
  }); //usetate의 초기값으로 객체{}를 선언함으로서 다양한 변화값을 수용할 수 있다

  const loading = useFetch(
    setTodos,
    "https://jsonplaceholder.typicode.com/todos"
  );

  const handleInputChange = (e) => {
    setNewTodo({
      userId: 1,
      id: todos.length + 1,
      title: e.target.value,
    });

    setValue(e.target.value); //이게 없으면 input창에 입력한 내용이 보이지 않는다.
  };

  const addNewTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, newTodo]);
    setValue("");
  };

  const changeTodoStatus = (id) => {
    // debugger;
    const updateTodos = todos.map((todo) => {
      if (todo.id === +id) {
        //+id 넘어온 문자를 숫자로 바꿔줌
        if (todo.userId === 1) todo.userId = 0;
        else todo.userId = 1;
      }
      return todo;
      // map을 이용할 때 조건을 걸고 변화를 줬다면 return으로 뭘 줄건지 정의 필요
    });
    setTodos(updateTodos);
  };

  useEffect(() => {
    //cpDidmout, cpDidUpdate등 rendering 이후에 실행되는 함수의 역할 대행
    //Life Cycle API에서 우리가 수행했던 API 요청, DOM 조작 등이 side effect이기 때문에, useEffect라는 이름의 API가 됨
    console.log("새로운 내용이 입력됐습니다", todos);
  }, [todos]); // 두번째 인자가 '변화될 대상' 지정. 그 대상의 변화가 있을 때만
  //useEffect함수를 실행함.

  return (
    <>
      <Headers todos={todos} />

      <Form
        value={value}
        handleInputChange={handleInputChange}
        addNewTodo={addNewTodo}
      />

      <List
        todos={todos}
        loading={loading}
        changeTodoStatus={changeTodoStatus}
      />
    </>
  );
}

export default App;
