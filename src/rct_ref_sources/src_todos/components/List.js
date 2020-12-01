import React, { useContext } from "react";
import { TodoContext } from "../App";
import Item from "./Item.js";

const List = () => {
  // const {todos} = this.props;
  const { todos, loading } = useContext(TodoContext);
  let todoList = loading ? (
    <li>loading......</li>
  ) : (
    todos.map((todo) => <Item key={todo.id} todo={todo} />)
  );
  return <ul>{todoList}</ul>;
};
// const List = () => {
//   // const {todos} = this.props;
//   const { todos, loading, changeTodoStatus } = useContext(TodoContext);
//   let todoList = loading ? (
//     <li>loading......</li>
//   ) : (
//     todos.map((todo) => (
//       <Item key={todo.id} todo={todo} changeTodoStatus={changeTodoStatus} />
//     ))
//   );
//   return <ul>{todoList}</ul>;
// };

export default List;
