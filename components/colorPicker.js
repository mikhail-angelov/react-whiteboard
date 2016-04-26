import React from 'react';
import EventBus from '../eventBus';
import ToolStore from '../toolStore';

export default class ColorPicker extends React.Component {
	constructor(){
		super();
		this.state = {
			colors: [
				'red',
				'orange',
				'yellow',
				'green',
				'blue',
				'indigo',
				'violet',
				'black'
			],
			selectedColorIndex:7
		};
		ToolStore.subscribe(()=>{
			let selectedColor = ToolStore.color;
			let selectedColorIndex = this.state.colors.indexOf(selectedColor);
			this.setState({selectedColorIndex:selectedColorIndex});
		})
	}
	handleClick(index){
		return function(){
			EventBus.emit(EventBus.COLOR_CHANGE,this.state.colors[index]);
		}
	}

	render(){
		let colors = this.state.colors.map((color, i)=>{
			let style = {
			    display: 'flex',
				backgroundColor: color,
				width: 20,
				height: 20,
				margin: 5
			};
			let borderStyle = {
			    display: 'flex',
			    border: 1,
				border: this.state.selectedColorIndex === i?'1px solid':'',
				margin: 1
			};

			return <div key={i} style={borderStyle}>
					<div style={style} onClick={this.handleClick(i).bind(this)}></div>
				</div>});

		return(<div id="colors"> {colors} </div>);
	}
}

