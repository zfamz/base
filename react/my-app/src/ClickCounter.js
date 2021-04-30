import React, { Component } from 'react';

class ClickCounter extends Component {
  constructor(props) {
    super(props);
    this.onClickBtn = this.onClickBtn.bind(this);
    this.state = { count: 0 };
  }
  onClickBtn() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div>
        <button onClick={this.onClickBtn}>Click Me</button>
        <div>Click Count: {this.state.count}</div>
      </div>
    );
  }
}

export default ClickCounter;
