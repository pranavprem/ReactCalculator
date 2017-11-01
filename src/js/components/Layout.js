import React from "react";

import Header from "./Header.js"
import Footer from "./Footer.js"
import Calculator from "./Calculator.js"
import Result from "./Result.js"

export default class Layout extends React.Component {
  constructor(){
    super();
    this.state = {"expression":"", "result":""};
    this.memory = "";
    this.expression = "";
  }
  changeHandler(settext){
    if (settext == "C"){
      this.expression = ""
    }
    else if(settext == "M+"){
      this.memory = this.state.result;
      this.expression = "";
    }
    else if(settext == "MR"){
      this.expression = this.state.expression + this.memory;
    }
    else{
      this.expression = this.state.expression + settext;  
    }
    try{
      var result = eval(this.expression);
      this.setState({"result":result});
    }catch(SyntaxError){
      //do nothing
    } 
    finally{
      this.setState({"expression":this.expression});
    }
  }
  render() {
    // setTimeout(()=>{
    //   this.setState({name:"Pranav2"});
    // },2000);
    return (
      <div class="container">
        <Header/>
        <Result expression={this.state.expression} result={this.state.result}/>
        <Calculator changeHandler={this.changeHandler.bind(this)}/>
        <Footer/>
      </div>    
    );
  }
}
