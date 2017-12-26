import React from 'react';

export default class Selection extends React.Component {
	constructor() {
		super()
		this.startMove = this.startMove.bind(this)
		this.endMove = this.endMove.bind(this)
		this.onMove = this.onMove.bind(this)
		this.startPoint = null
	}
	startMove(e) {
		e.preventDefault();
		this.startPoint = { x: e.clientX, y: e.clientY }
	}
	endMove(e) {
		e.preventDefault();
		this.startPoint = null
	}
	onMove(e) {
		if (this.startPoint) {
			e.preventDefault();
			const move = {
				x: e.clientX - this.startPoint.x,
				y: e.clientY - this.startPoint.y,
			}
			this.props.move(move)
			this.startPoint = { x: e.clientX, y: e.clientY }
		}
	}

	render() {
		const { rect } = this.props
		return (<rect
			id='selection'
			x={rect.x}
			y={rect.y}
			width={rect.width}
			height={rect.height}
			onMouseDown={this.startMove}
			onMouseUp={this.endMove}
			onMouseMove={this.onMove}
		/>);
	}
}