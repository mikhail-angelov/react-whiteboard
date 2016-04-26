import React from 'react';
import EventBus from '../eventBus';
import Store from '../store';

export default class WhiteBoard extends React.Component {
	constructor(){
		super();

		Store.subscribe(()=>{
			this.setState({data:Store.data});
		});
		this.state = {data:Store.data};
		this.pressed = false;
	}

	componentDidMount () {
        document.addEventListener("mousedown", this.mouseDown.bind(this));
		document.addEventListener("mousemove", this.mouseMove.bind(this));
		document.addEventListener("mouseup", this.mouseUp.bind(this));
		document.addEventListener("keydown", this.keyDown.bind(this));
		window.addEventListener("resize", this.onResize.bind(this));

    	this.onResize();
    	this.setState({data:Store.data});
    };

    onResize(){
    	this.rect = this._svg.getBoundingClientRect();
    }

    mousePos(e) {;
		let round = 2
	  	return {
		  	x: round * Math.round(e.clientX / round) - this.rect.left,
		    y: round * Math.round(e.clientY / round) - this.rect.top
		};
	}

	_insideRect(rect, point){
		return  point.x > rect.left && point.x < rect.right
			&& point.y > rect.top && point.y < rect.bottom;
	}
	
	mouseDown(e) {
		if(this._insideRect(this.rect, {x:e.clientX, y: e.clientY})){
			this.pressed = true;
			EventBus.emit(EventBus.START_PATH,this.mousePos(e))
		}
	}

	mouseMove(e) {
		if(this.pressed){
			EventBus.emit(EventBus.MOVE_PATH,this.mousePos(e))
		}
	}

	mouseUp(e) {
		this.pressed = false;
		EventBus.emit(EventBus.END_PATH,this.mousePos(e))
	}

	keyDown(e) {
	  switch (e.keyCode) {
	    case 27: //escape
	      EventBus.emit(EventBus.UNDO)
	      break;
	  }
	}


	render(){
		let data = this.state.data
		let shapes = data.shapes.map((line,i) =>  <line.type key={i} path={line.path} color={line.color} />);
		let current = null;
		if(data.currentLine){
			current = <data.currentLine.type color={data.currentLine.color} path={data.currentLine.path} />
		}

		return (
				<svg id="whiteBoard" width={this.props.width} height={this.props.height}
				ref={(c) => this._svg = c}>
					{shapes}
					{current}
				</svg>
	    )
	}
}
