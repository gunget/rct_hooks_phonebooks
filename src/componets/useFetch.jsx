import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (Fbooks, callback) => {
  const [loading, setLoading] = useState(true);

  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken"; //웹사이트 해킹 방지용도

  const fetchInitData = async () => {
    const defaultUser = [
      {
        id: 1,
        name: "홍길동",
        number: "010-0101-0011",
      },
      {
        id: 2,
        name: "동영준",
        number: "010-5551-0011",
      },
    ];

    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        Authorization: `jwt ${jwt.token}`,
      },
    };

    // 좌상단의 PhoneBooks를 눌렀을때 main이 다시 로드 되는데, 이때 Fbooks가 다시 로딩되어
    // usefetch가 일어남. 그러면 새로 useReducer도 정의 되는데, 그때문에 localstorage에서
    // jwt를 삭제할 수 없음. 유일한 해법은 Fbooks상위에서 또다른 reducer를 사용하는 것

    // const config =
    //   jwt !== null
    //     ? {
    //         headers: {
    //           Authorization: `jwt ${jwt.token}`,
    //         },
    //       }
    //     : {
    //         headers: {
    //           Authorization: `jwt ${Fbooks.jwt.token}`,
    //         },
    //       };

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/fbooks/",
        config
      );
      const fbFromDJG = await response.data[0];
      console.log("받아온 데이터:", fbFromDJG);
      callback({ type: "SET_INIT_DATA", payload: fbFromDJG });
      setTimeout(() => {
        setLoading(false); //서버에서 받아오는 시간을 loading으로 표현하려고 가짜로 넣은 것. setTimeout은 반드시 콜백함수속에 지연실행하고픈 내용을 넣어야 지연되어 실행된다.
        callback({ type: "SET_JWT", payload: jwt });
      }, 1000);

      // //localstorage에 저장된 jwt없애기
      // setTimeout(() => {
      //   localStorage.removeItem("jwt");
      // }, 1000);
    } catch (error) {
      const defaultFbooks = { id: 2, information: defaultUser, search: "" };
      callback({ type: "SET_INIT_DATA", payload: defaultFbooks });
      setTimeout(() => {
        setLoading(false); //서버에서 받아오는 시간을 loading으로 표현하려고 가짜로 넣은 것. setTimeout은 반드시 콜백함수속에 지연실행하고픈 내용을 넣어야 지연되어 실행된다.
      }, 1000);
      return console.log("서버에서 정보를 받아올 수 없습니다.");
    }
  };

  useEffect(() => {
    console.log("useFetch-useEffect 실행");
    fetchInitData();
  }, []);

  return loading;
};

export default useFetch;
