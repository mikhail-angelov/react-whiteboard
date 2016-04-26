import React from 'react';
import EventBus from '../eventBus';
import ToolStore from '../toolStore';
import ColorPicker from './colorPicker';

export default class Tools extends React.Component {
	constructor(){
		super();
		this.state = {
			tools: [
				{label: 'fa-mouse-pointer', type:'cursor'},
				{label: 'fa-pencil', type:'line', selected: true},
				{label: 'fa-square-o', type:'rect'},
				{label: 'fa-circle-thin', type:'ellipse'},
			]
		};
		ToolStore.subscribe(()=>{
			let toolType = ToolStore.tool;
			this.state.tools.forEach(tool=>{
				tool.selected = (toolType == tool.type);
			});
			this.setState(this.state);
		})
	}
	handleClick(index){
		return function(){
			EventBus.emit(EventBus.TOOL_CHANGE,this.state.tools[index].type);
		}
	}

	render(){
		let tools = this.state.tools.map((tool, i)=><div 
			key={i} 
			onClick={this.handleClick(i).bind(this)}
			className={tool.selected?'selected':''}
			><i className={tool.label +' fa'}></i></div>)
		return(<div id="tools"> {tools} <ColorPicker/></div>);
	}
}

