import React, { Component } from "react";

class PhoneForm extends Component {
  state = {
    name: "",
    phone: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // submit으로 인한 페이지 리로딩 방지
    this.props.onCreate(this.state);
    //부모에게서 전달받은 함수(props)에 자식컴포넌트의 state값을 전달해줌
    //이를 부모는 onCreate이벤트에 설정한 함수의 인자로 사용할 수 있음
    this.setState({
      name: "",
      phone: "",
    });
  };

  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        ></input>
        <input
          placeholder="번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        ></input>
        {/* <div>
          {this.state.name}
          <span> - </span>
          {this.state.phone}
        </div> */}
        <button onClick={this.handleSubmit}>등록</button>
      </form>
    );
  }
}

export default PhoneForm;
