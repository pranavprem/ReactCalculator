import React from "react"


export default class CalcElement extends React.Component{


	render() {
    // setTimeout(()=>{
    //   this.setState({name:"Pranav2"});
    // },2000);
    return (
      <button onClick={()=>{this.props.changeHandler(this.props.elem)}}>{this.props.elem}</button> 
    );
  }



}