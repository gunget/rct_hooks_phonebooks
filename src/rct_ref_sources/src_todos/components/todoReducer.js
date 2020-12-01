const todoReducer = (todos, { type, payload }) => {
  // reducer는 (state, action) 두가지의 인자를 받는다. action는 dispatch가 전해줌
  // reducer에 의해 값이 변경되면 subscribe하지 않았더라도 useReducer가 사용된
  // 컴포넌트를 다시 렌더링하는 듯. 리덕스로 보면 getState가 자동으로 실행되어
  // 값을 받은뒤 return구문을 진행하는 듯
  // 일부에선 dispatch가 실행되면 redering이 된다고 함
  switch (type) {
    case "ADD_TODO":
      return [
        ...todos,
        {
          userId: 1,
          id: todos.length + 1,
          title: payload,
        },
      ];

    case "CHANGE_USER_ID": //FETCH해온 DATA에 있는 정보를 가지고 상태정보를 쓰려다 보니 USER_ID를 그냥 사용함
      const newTodos = [...todos];
      //불변성을 지키기 위해 배열 복사해서 새로운 객체 만듦
      //리액트는 이전 상태와 다음상태를 비교할 경우가 많은데, 이게 가능하려면 둘이
      //완전히 다른 객체여야 한다(시간이동도 그래서 가능). 그걸 하려고 새로운 객체로 복사
      newTodos.map((todo) => {
        if (todo.id === +payload) {
          //todo.id가 리턴된 숫자 id와 같은 것 중에서
          //+id 넘어온 문자를 숫자로 바꿔줌
          if (todo.userId === 1) todo.userId = 0;
          //userId가 1이면 0르로 바꾸라,
          else todo.userId = 1; //아니면 1로 바꿔라
        }
        return todo; //바꾼 todo를 updateTodos라는 새로운 객체에 할 당
        // map을 이용할 때 조건을 걸고 변화를 줬다면 return으로 뭘 줄건지 정의 필요
      });
      return newTodos;

    case "SET_INIT_DATA": //초기값을 지정하기 위한 조건
      return payload; //이후 이 값이 초기값이 됨

    default:
      break;
  }
};

export default todoReducer;
