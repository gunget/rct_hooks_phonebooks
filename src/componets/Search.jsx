import React, {useRef, useContext, useCallback} from "react";
import {FbContext} from './FbStore';

const Search = () => {
  console.log("Search 실행");
  const {dispatch} = useContext(FbContext);
  const searchRef = useRef(false);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    dispatch({type:'SEARCH_NAME', payload:searchRef.current.value});
  }, []);
  //useContext를 사용해 변수를 전역적으로 쓸 경우 컴포넌트의 재 렌더링은 불가피하다
  //이때 함수라도 다시 메모리에 띄워지지 않도록 useCallback을 쓴다

  const handleGoback = useCallback((e) => {
    e.preventDefault();
    dispatch({type:'SEARCH_NAME', payload:''});
    searchRef.current.value = '';
  }, []);
  //useContext를 사용해 변수를 전역적으로 쓸 경우 컴포넌트의 재 렌더링은 불가피하다
  //이때 함수라도 다시 메모리에 띄워지지 않도록 useCallback을 쓴다
  
  return (
    <form>
      <input type="text" placeholder="검색어" ref={searchRef}></input>
      <button onClick={handleSearch}>이름검색</button>
      <button onClick={handleGoback}>목록으로</button>
    </form>
  );
};

export default React.memo(Search);
