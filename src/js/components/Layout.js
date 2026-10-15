import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Calculator from "./Calculator.js";
import Result from "./Result.js";
import { applyInput, initialState } from "../calculator.js";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState();
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(input) {
    this.setState((state) => applyInput(state, input));
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Result expression={this.state.expression} result={this.state.result} />
        <Calculator changeHandler={this.changeHandler} />
        <Footer />
      </div>
    );
  }
}
