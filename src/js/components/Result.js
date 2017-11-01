import React from "react"

export default class Result extends React.Component{

	render() {
    // setTimeout(()=>{
    //   this.setState({name:"Pranav2"});
    // },2000);
    return (
     	<div class="container">
     	{this.props.expression}<br/>
      	{this.props.result}
		</div>    
    );
  }



}