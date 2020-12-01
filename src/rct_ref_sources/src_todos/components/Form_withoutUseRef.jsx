import React, { useContext } from "react";
import { TodoContext } from "../App";

const Form = () => {
  const { value, handleInputChange, addNewTodo } = useContext(TodoContext);
  return (
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
  );
};

export default Form;
