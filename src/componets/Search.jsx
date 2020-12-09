import React, { useRef, useCallback } from "react";
// import { FbContext } from "./FbStore";

const Search = ({ dispatch }) => {
  console.log("Search 실행");
  // const {dispatch} = useContext(FbContext);
  const searchRef = useRef(false);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: "SEARCH_NAME", payload: searchRef.current.value });
  }, []);
  //컴포넌트가 재렌더링 되면 그안의 함수 선언도 다시 메모리에 띄워진다. 내용의 변화가
  //없는데도 바뀌는 건 낭비. 이를 막기위해 '변화가 없을시 기존 함수를 다시써라'라는 의미로
  //useCallback을 사용. 특정변화에만 반응하도록 하기 위해선 2번째 인자 활용. callback으로
  //정의한 함수 바깥의 요소를 감시대상으로 선정하면 된다.

  const handleGoback = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: "SEARCH_NAME", payload: "" });
    searchRef.current.value = "";
  }, []);

  return (
    <form>
      <input type="text" placeholder="검색어" ref={searchRef}></input>
      <button onClick={handleSearch}>이름검색</button>
      <button onClick={handleGoback}>목록으로</button>
    </form>
  );
};

export default React.memo(Search);
