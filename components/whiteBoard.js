import React from 'react';
import EventBus from '../eventBus';
import Store from '../store';
import Selection from './selection'
import { getShapeRect } from '../utils'

export default class WhiteBoard extends React.Component {
	constructor() {
		super();

		Store.subscribe(() => {
			this.setState({ data: Store.data });
		});
		this.state = { data: Store.data };
		this.pressed = false;
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.mouseDown.bind(this));
		document.addEventListener("mousemove", this.mouseMove.bind(this));
		document.addEventListener("mouseup", this.mouseUp.bind(this));
		document.addEventListener("keydown", this.keyDown.bind(this));
		window.addEventListener("resize", this.onResize.bind(this));

		this.onResize();
		this.setState({ data: Store.data });
	};

	onResize() {
		this.rect = this._svg.getBoundingClientRect();
	}

	mousePos(e) {
		;
		let round = 2
		return {
			x: round * Math.round(e.clientX / round) - this.rect.left,
			y: round * Math.round(e.clientY / round) - this.rect.top
		};
	}

	_insideRect(rect, point) {
		return point.x > rect.left && point.x < rect.right
			&& point.y > rect.top && point.y < rect.bottom;
	}

	mouseDown(e) {
		if (this._insideRect(this.rect, { x: e.clientX, y: e.clientY })) {
			this.pressed = true;
			EventBus.emit(EventBus.START_PATH, this.mousePos(e))
		}
	}

	mouseMove(e) {
		if (this.pressed) {
			EventBus.emit(EventBus.MOVE_PATH, this.mousePos(e))
		}
	}

	mouseUp(e) {
		this.pressed = false;
		EventBus.emit(EventBus.END_PATH, this.mousePos(e))
	}

	keyDown(e) {
		switch (e.keyCode) {
			case 27: //escape
				EventBus.emit(EventBus.UNDO)
				break;
		}
	}
	onMove(shape){
		return move=>{
			EventBus.emit(EventBus.MOVE, {shape, move})
		}
	}


	render() {
		const data = this.state.data
		let selection = null
		const shapes = data.shapes.map((shape, i) => {
			if (shape.selected) {
				selection = <Selection rect={getShapeRect(shape)} move={this.onMove(shape)}/>
			}
			return <shape.class key={i} path={shape.path} color={shape.color} />
		});
		let current = null;
		if (data.mouseTracker && data.mouseTracker.class) {
			current = <data.mouseTracker.class color={data.mouseTracker.color} path={data.mouseTracker.path} />
		}

		return (
			<svg
				id="whiteBoard"
				width={this.props.width}
				height={this.props.height}
				ref={(canvas) => this._svg = canvas}
			>
				{shapes}
				{current}
				{selection}
			</svg>
		)
	}
}
