import React, { useContext, useRef } from "react";
import { TodoContext } from "../App";

const Form = () => {
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef(false);
  // useRef는 간단하게 Dom요소에 접근해서 제어하는 용도로 쓰인다
  // 이걸 도입함으로서 입력변화되는 값을 매번 바꾸던 newTodo와 입력창의 남은 값을
  // 없애려 도입했던 value를 없앨 수 있다. 이로인한 과rendering도 줄일 수 있다

  const addTodoData = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", payload: inputRef.current.value }); //입력한 내용만을 부모 컴포넌트에 넘겨준다
    inputRef.current.value = ""; //input 엘러먼트의 입력하고 남은 창 값 없애기
  };

  return (
    <form action="">
      <input type="text" placeholder="할 일을 입력하세요." ref={inputRef} />
      {/* input에 value값을 따로 설정하지 않아도 ref로 설정해 놓은 것을 통해
      Dom요소의 value를 제어할 수 있다. */}
      <button onClick={addTodoData}>할일추가</button>
    </form>
  );
};

export default Form;
