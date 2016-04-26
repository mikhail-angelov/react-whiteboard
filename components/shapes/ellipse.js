import React from 'react';

export default class Ellipse extends React.Component {
	constructor(){
		super()
	}
	prepareData(){
		let ellipse = {
			cx: this.props.path[0].x,
			cy: this.props.path[0].y,
			rx: this.props.path[this.props.path.length-1].x - this.props.path[0].x,
			ry: this.props.path[this.props.path.length-1].y - this.props.path[0].y
		};
	    return ellipse;
	}

	render(){
		let ellipse = this.prepareData();
		return (<ellipse 
				cx = {ellipse.cx}
				cy = {ellipse.cy}
				rx = {ellipse.rx}
				ry = {ellipse.ry}
				stroke={this.props.color}
		        strokeWidth={1}
		        fill="none"
		      />);
	}
}