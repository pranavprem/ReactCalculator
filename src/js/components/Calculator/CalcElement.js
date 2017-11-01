import React from "react"


export default class CalcElement extends React.Component{

	constructor(){
		super();
		this.buttonStyle = {
			width : 10 + "px"
		}
	}
	render() {
    // setTimeout(()=>{
    //   this.setState({name:"Pranav2"});
    // },2000);
    return (
      <button class="btn" style = {this.buttoStyle} onClick={()=>{this.props.changeHandler(this.props.elem)}}>{this.props.elem}</button> 
    );
  }



}