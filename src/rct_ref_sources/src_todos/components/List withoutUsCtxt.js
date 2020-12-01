import React from "react";
import Item from "./Item.js";

const List = ({ todos, loading, changeTodoStatus }) => {
  // const {todos} = this.props;
  let todoList = loading ? (
    <li>loading......</li>
  ) : (
    todos.map((todo) => (
      <Item key={todo.id} todo={todo} changeTodoStatus={changeTodoStatus} />
    ))
  );
  return <ul>{todoList}</ul>;
};

export default List;
