import React, { useContext } from "react";
import { TodoContext } from "../App";
import "../css/Item.css";

const Item = ({ todo }) => {
  const { changeTodoStatus } = useContext(TodoContext);
  const toggleStatus = (e) => {
    const id = e.target.dataset.id;
    changeTodoStatus(id);
  };

  const textStatus = todo.userId === 0 ? "checked" : "";

  return (
    <li data-id={todo.id} onClick={toggleStatus} className={textStatus}>
      {todo.title}
    </li>
  );
};
// const Item = ({ todo, changeTodoStatus }) => {
//   const toggleStatus = (e) => {
//     const id = e.target.dataset.id;
//     changeTodoStatus(id);
//   };

//   const textStatus = todo.userId === 0 ? "checked" : "";

//   return (
//     <li data-id={todo.id} onClick={toggleStatus} className={textStatus}>
//       {todo.title}
//     </li>
//   );
// };

export default Item;
