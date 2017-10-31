import React from "react"

export default class Result extends React.Component{

	render() {
    // setTimeout(()=>{
    //   this.setState({name:"Pranav2"});
    // },2000);
    return (
     	<div>
     	Expression: {this.props.expression}<br/>
      	Result:	{this.props.result}
		</div>    
    );
  }



}