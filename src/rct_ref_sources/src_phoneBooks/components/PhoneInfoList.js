import React, { Component } from "react";
import PhoneInfo from "./PhoneInfo";

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn("onRemove not defined"),
    onUpdate: () => console.warn("onUpdate not defined"),
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data; //두 객체가 같은 객체냐를 묻는 것.
    // 기본적으로 true를 반환. true이면 rendering이 됨. false면 render 실행 안함
    // 부모 컴포넌트의 상관없는 자료가 바뀌었는데, 그정보가 전달되며
    // 자식 컴포넌트까지 불필요하게 렌더링되는 상황 발생.
    // 이를 위해 다음받아올 데이터가 현제 데이터와 다를때만 true가 되도록 설정하면
    // 그때만 render함수가 실행 됨.

    // 이런 단순 비교가 가능하기위해 state의 불변성을 유지하는 것(prop를 전달할때 항상 다른 객체가 되므로(push등을 통해 변경한게 아니라 concat등으로 새로운 객체를 만들었으므로), 이전 객체와 비교가 가능. push등으로 직접 바꿨다면 전달되는 객체는 새로운 객체가 아니라 ref가 같은 객체가 되므로 단순 비교 불가)
  }

  render() {
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map((info) => (
      <PhoneInfo
        key={info.id}
        info={info}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    ));
    return <div>{list}</div>;
  }
}

export default PhoneInfoList;
