import React from "react";

export default class Result extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.expression}
        <br />
        {this.props.result}
      </div>
    );
  }
}
