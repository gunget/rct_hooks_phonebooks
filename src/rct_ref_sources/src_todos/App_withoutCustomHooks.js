import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List.js";

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
  const [loading, setLoading] = useState(false);

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

  const fetchInitData = async () => {
    setLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todoDatum = await response.json();
    // await가 있어야 json형태로 다 바꿔준 다음에 반환한다. 없으면 다 변환되기 전에 반환해서 promise객체가 반환된다
    const todoDatum_min = todoDatum.slice(0, 10);
    setTodos(todoDatum_min);
    setTimeout(() => {
      setLoading(false); //setTimeout은 반드시 콜백함수속에 지연실행하고픈 내용을 넣어야 지연되어 실행된다.
    }, 2000);
  };

  useEffect(() => {
    //cpDidmout, cpDidUpdate등 rendering 이후에 실행되는 함수의 역할 대행
    //Life Cycle API에서 우리가 수행했던 API 요청, DOM 조작 등이 side effect이기 때문에, useEffect라는 이름의 API가 됨
    console.log("새로운 내용이 입력됐습니다", todos);
  }, [todos]); // 두번째 인자가 '변화될 대상' 지정. 그 대상의 변화가 있을 때만
  //useEffect함수를 실행함.

  useEffect(() => {
    fetchInitData();
    // useEffect내부에서 바로 fetch작업을 하지 말고 외부함수를 호출하는 식으로 하라고 가이드에 나온다 함
  }, []); //감시대상을 [](null)로 두면 cpDidmout처럼 처음 실행할때만 한번 실행되고
  // 더이상은 실행되지 않아 state업데이트로 인해 루핑되는 것을 막을 수 있다.

  return (
    <>
      <form action="">
        <input
          type="text"
          value={value}
          // 리액트에서 input의 value는 html에서와 다르다. 임의의 값을 넣으면
          // input창이 고정되어 새로운 값이 표시되지 않는다. 내부적으로는 들어감.
          // 이를 막기위해 state를 할당하고 이것의 변경값이 표시되도록 해야 한다.
          // 그래서 value에 value라는 값을 할당 한 것
          placeholder="할 일을 입력하세요."
          onChange={handleInputChange}
        />
        <button onClick={addNewTodo}>할일추가</button>
      </form>

      <List todos={todos} loading={loading} />
    </>
  );
}

export default App;
