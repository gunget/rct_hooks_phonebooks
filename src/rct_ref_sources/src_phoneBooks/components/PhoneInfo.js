// 확실친 않지만 초기상태에서 수정 버튼을 누르면
// state의 editing이 바뀌니까 라이프사이클에 따라 렌더가 실행되는데
// 이번엔 editing모드에 해당되도록 렌더링되고 c~DidUpdate가 실행되며
// 수정버튼 눌렀을때에 맞게 state가 다시 수정되고, 바뀐 state를 가지고
// 다시 render가 실행되고, 입력창에 state값이 들어가게 되고 한번 더
// c~DidUpdate가 실행되는데 이번엔 해당사항이 없으므로 아무변화도 일어나지
// 않은채 종료된다.

import React, { Component } from "react";

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: "이름",
      phone: "010-0000-0000",
      id: 0,
    },
  };

  state = {
    // 우리는 수정 버튼을 눌렀을 떄 editing 값을 true 로 설정해줄것입니다.
    // 이 값이 true 일 때에는, 기존에 텍스트 형태로 보여주던 값들을
    // input 형태로 보여주게 됩니다.
    editing: false,
    // 기존값을 초기화하기 위한 설정
    name: "",
    phone: "",
  };

  //editing설정을 반전시키는 함수
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
    // 부모 컴포넌트에서 준 각각의 info들의 개별 컴포넌트마다 서로 다르게 들어가 있음
    // 제거 버튼을 누르는 컴포넌트의 id값만 상위 함수로 넘겨주는 것
  };

  //input에서 onChage이벤트가 발생했을 때 실행되는 함수
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !this.state.editing && //현재상태의 모드가 false이고(수정모드가 아니고)
      !nextState.editing && // 다음상태의 모드도 false이고(수정모드로 변할 예정이 아니고)
      nextProps.info === this.props.info // 지금의 객체와 다음받을 객체가 동일 할 때,
      // 곧 수정상태가 아니고 이전객체와 다음객체가 동일하다면 렌더링하지 않는다.
    ) {
      return false; //render를 수행하지 않는다.
    } else {
      return true;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
    // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
    // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.

    const { info, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
      //이전editing값이 false이고(그래야 반대가 true), 현재의 값이 true일때. 곧
      //수정모드를 눌렀을 때(editing 값이 false -> true 로 전환 될 때)
      // info 의 값을 state 에 넣어준다. 기존의 값을 input에 보여주고
      this.setState({
        name: info.name,
        phone: info.phone,
      });
    }

    if (prevState.editing && !this.state.editing) {
      //이전 editing값이 true이고 현재의 값의 false일때, 곧 적용버튼을 눌렀을 때
      // editing 값이 true -> false 로 전환 될 때, 부모에게로 id와 data를 전달해준다
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone,
      });
    }
  }

  render() {
    console.log("render PhoneInfo " + this.props.info.id);
    const style = {
      border: "1px solid black",
      padding: "8px",
      margin: "8px",
    };

    const { editing } = this.state;

    if (editing) {
      // 수정모드: PhoneFome의 형태가 그대로 나타남
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }

    // 일반모드
    const { name, phone } = this.props.info;

    return (
      <div style={style}>
        <div>
          <b>{name}</b>
        </div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>수정</button>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}
export default PhoneInfo;
