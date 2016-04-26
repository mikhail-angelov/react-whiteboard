import React from 'react';
import EventBus from '../eventBus';
import Store from '../store';

export default class History extends React.Component {
	constructor(){
		super();

		Store.subscribe(()=>{
			this.setState({
				history: Store.history,
				selectedIndex: Store.historyIndex
			});
		});

		this.state = {
            history:[],
            selectedIndex:-1
        };
	}

	handleClick(index){
		return function(){
			EventBus.emit(EventBus.PICK_VERSION,index);
		}
	}

	render(){
		let versions = this.state.history.map((version, i)=><span 
			key={i} 
			onClick={this.handleClick(i).bind(this)}
			className={this.state.selectedIndex===i?'selected':''}
			></span>)
		return(<div id="history"> History: {versions} </div>);
	}
}
