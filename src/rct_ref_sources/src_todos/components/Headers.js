import React, { useContext } from "react";
import "../css/Headers.css";
import { TodoContext } from "../App";

// useContext를 이용한 방식
const Header = () => {
  //props를 사용하지 않음
  const { todos, loading } = useContext(TodoContext);
  //shop에 등록되어진 state를 가져옴. 어떤 depth에서도 바로 가져올 수 있음
  //shop에 등록하는 것은 provider의 value설정으로 함
  const numTodos = loading
    ? 0
    : todos.filter((todo) => todo.userId === 1).length;

  return (
    <>
      <h1>Hello Todo Application</h1>
      <div className="countInfo">해야할 일 ! {numTodos}개가 있습니다.</div>
    </>
  );
};

// consumer를 이용한 방식
// const Header = () => {
//   return (
//     <TodoShop.Consumer>
//       {({ todos }) => {
//         <>
//           <h1>Hello Todo Application</h1>
//           <div className="countInfo">
//             해야할 일 ! {todos.filter((todo) => todo.userId === 1).length}개가
//             있습니다.
//           </div>
//         </>;
//       }}
//     </TodoShop.Consumer>
//   );
// };

export default Header;
