// 1. App.js에서 state(전화번호부)관리
// 2. phonform에서 개별번호 등록폼을 가지고 입력한 값들을 state로 해서 App.js로 넘겨줌. App.js는 함수를 통해 이를 받고 state를 확장시킴
// 3. PhonInfoList안에 여러개의 PhoneInfo가 들어있는 구조.
// 4. PhoneInfo는 하나하나의 전화번호를 표시하는 작은 컴포넌트. 전화번호를 App->PhonInfoList로부터 차례대로 넘겨받아야 함. 해서 App은 data라는 props로, PhoneInfoList는 info라는 props로 전화번호를 넘겨줌(map을 통해 모든 번호를 넘겨줌)
// 5. PhoneInfo가 이를 받아 하나의 블럭으로 만들어주면, PhoneInfoList가 이를 묶고, App.js가 이를 렌더링하는 구조

import React, { Component } from "react";
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: "김민준",
        phone: "010-0000-0000",
      },
      {
        id: 1,
        name: "홍길동",
        phone: "010-0000-0001",
      },
    ],
    keyword: "",
  };

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data }),
      // info배열에 객체를 결합시키는데(불변성 유지를 위해), id는 추가한뒤 1을 더하고
      // 나머지는 데이터의 값들을 그대로 가져와서 넣어라. data의 key들이 같아야 함.
    });
  };

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter((info) => info.id !== id),
      //info배열을, 해당 id가 아닌것들만 모아서 새로운 객체를 반환해주는 filter함수를
      //이용해서 새로운 값으로 통째로 갈아끼움
    });
  };

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map((info) =>
        id === info.id ? { ...info, ...data } : info
      ),
      //전달받은 id가 info(기존번호)의 id와 같다면, 새 객체를 만들고 기존의 내용을 집어넣고 원하는 값(data) 덮어쓰기. 다른 경우는 예전의 값을 그대로 집어넣기
    });
  };

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      (info) => info.name.indexOf(keyword) !== -1
    );
    // filter(조건): 조건이 True인 요소만 가져와서 새로운 배열을 만든다.
    // info.name.indexOf(k)는 있으면 해당 인덱스를, 없으면 -1을 반환
    // (info.name.indexOf(k) !== -1)은 true나 false만은 반환. 여기서 '-1이 아니다'라는 뜻은 '있을때 True'라는 뜻.
    // 곧 키워드가 name에 있는 객체가 있다면 그 인덱스를 반환할 것이고 그러면 true가 리턴되어, 해당 info객체가 filterring되어 새로운 객체에 추가 된다.
    // 초기값인 ''를 keyword로 검색하는 경우, '아무것도 찾는요소가 없음'은 곧 '모든 요소에 있는 것'으로 처리된다. 곧 모든 요소가 그대로 반환된다.

    // 객체에 있는 요소를 검색하는 경우 자주사용하는 패턴이라 함!!!

    return (
      <div className="App">
        <PhoneForm onCreate={this.handleCreate} />
        <input
          placeholder="검색할 이름을 입력하세요"
          onChange={this.handleChange}
          value={keyword}
        ></input>
        <hr></hr>
        <PhoneInfoList
          data={filteredList}
          // 원래 infomation을 넘겨주던걸, filteredList로 바꿔 검색기능을 표시하게 함
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
