import React from "react";
import CalcElement from "./Calculator/CalcElement.js";

export default class Calculator extends React.Component {
  render() {
    return (
      <div>
        <div className="btn-group btn-group-justified">
          <CalcElement elem="1" changeHandler={this.props.changeHandler} />
          <CalcElement elem="2" changeHandler={this.props.changeHandler} />
          <CalcElement elem="3" changeHandler={this.props.changeHandler} />
          <CalcElement elem="+" changeHandler={this.props.changeHandler} />
        </div>
        <div className="btn-group btn-group-justified">
          <CalcElement elem="4" changeHandler={this.props.changeHandler} />
          <CalcElement elem="5" changeHandler={this.props.changeHandler} />
          <CalcElement elem="6" changeHandler={this.props.changeHandler} />
          <CalcElement elem="-" changeHandler={this.props.changeHandler} />
        </div>
        <div className="btn-group btn-group-justified">
          <CalcElement elem="7" changeHandler={this.props.changeHandler} />
          <CalcElement elem="8" changeHandler={this.props.changeHandler} />
          <CalcElement elem="9" changeHandler={this.props.changeHandler} />
          <CalcElement elem="*" changeHandler={this.props.changeHandler} />
        </div>
        <div className="btn-group btn-group-justified">
          <CalcElement elem="(" changeHandler={this.props.changeHandler} />
          <CalcElement elem="0" changeHandler={this.props.changeHandler} />
          <CalcElement elem=")" changeHandler={this.props.changeHandler} />
          <CalcElement elem="/" changeHandler={this.props.changeHandler} />
        </div>
        <div>
          <CalcElement elem="C" changeHandler={this.props.changeHandler} />
          <CalcElement elem="M+" changeHandler={this.props.changeHandler} />
          <CalcElement elem="MR" changeHandler={this.props.changeHandler} />
        </div>
      </div>
    );
  }
}
