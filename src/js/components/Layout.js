import React from "react";

import Header from "./Header.js"
import Footer from "./Footer.js"
import Calculator from "./Calculator.js"
import Result from "./Result.js"

export default class Layout extends React.Component {
  constructor(){
    super();
    this.state = {"expression":"", "result":""};
  }
  changeHandler(settext){
    var expression = this.state.expression + settext;
    try{
      var result = eval(expression);
      this.setState({"result":result});
    }catch(SyntaxError){
      //do nothing
    } 
    finally{
      this.setState({"expression":expression});
    }
  }
  render() {
    // setTimeout(()=>{
    //   this.setState({name:"Pranav2"});
    // },2000);
    return (
      <div>
        <Header/>
        <Calculator changeHandler={this.changeHandler.bind(this)}/>
        <Result expression={this.state.expression} result={this.state.result}/>
        <Footer/>
      </div>    
    );
  }
}
