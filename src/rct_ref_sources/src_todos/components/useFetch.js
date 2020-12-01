import { useState, useEffect } from "react";

const useFetch = (callback, url) => {
  // use라는 명칭으로 함수를 시작하면 리액트가 그안의 useEffect들도 라이프사이클에 맞춰 태운다고 함. 그렇게 재사용가능한 커스텀훅스를 만들 수 있음
  const [loading, setLoading] = useState(false);

  const fetchInitData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const todoDatum = await response.json();
    // await가 있어야 json형태로 다 바꿔준 다음에 반환한다. 없으면 다 변환되기 전에 반환해서 promise객체가 반환된다
    const todoDatum_min = todoDatum.slice(0, 10);
    callback({ type: "SET_INIT_DATA", payload: todoDatum_min });
    // callback(todoDatum_min);
    setTimeout(() => {
      setLoading(false); //서버에서 받아오는 시간을 loading으로 표현하려고 가짜로 넣은 것. setTimeout은 반드시 콜백함수속에 지연실행하고픈 내용을 넣어야 지연되어 실행된다.
    }, 2000);
  };

  useEffect(() => {
    fetchInitData();
    // useEffect내부에서 바로 fetch작업을 하지 말고 외부함수를 호출하는 식으로 하라고 가이드에 나온다 함
  }, []); //감시대상을 [](null)로 두면 cpDidmout처럼 처음 실행할때만 한번 실행되고
  // 더이상은 실행되지 않아 state업데이트로 인해 루핑되는 것을 막을 수 있다.

  return loading;
};

export default useFetch;
