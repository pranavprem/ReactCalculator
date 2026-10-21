import React from "react";

export default class CalcElement extends React.Component {
  render() {
    return (
      <button
        className="btn"
        type="button"
        onClick={() => this.props.changeHandler(this.props.elem)}
      >
        {this.props.elem}
      </button>
    );
  }
}
