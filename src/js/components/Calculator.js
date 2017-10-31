import React from "react";


import CalcElement from "./Calculator/CalcElement"

export default class Calculator extends React.Component{
	constructor(){
		super();
		
	}

	render() {
    // setTimeout(()=>{
    //   this.setState({name:"Pranav2"});
    // },2000);
    return (
      <div>
      	<CalcElement elem="1" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="2" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="3" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="4" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="5" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="6" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="7" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="8" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="9" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="+" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="-" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="*" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="/" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem="(" changeHandler={this.props.changeHandler}/>
      	<CalcElement elem=")" changeHandler={this.props.changeHandler}/>
      </div>
          
    );
  }



}