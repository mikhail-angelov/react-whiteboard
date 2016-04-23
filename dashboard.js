import React from 'react';
import UserActionHanndler from './userActionHanndler';

class	Dashboard extends React.Component {
	constructor(){
		super();
	}

	componentDidMount () {
        document.addEventListener("mousedown", UserActionHanndler.mouseDown.bind(UserActionHanndler));
		document.addEventListener("mousemove", UserActionHanndler.mouseMove.bind(UserActionHanndler));
		document.addEventListener("mouseup", UserActionHanndler.mouseUp.bind(UserActionHanndler));
		document.addEventListener("keydown", UserActionHanndler.keyDown.bind(UserActionHanndler));
    };

    componentWillUnmount() {
		// document.removeEventListener("mousedown", UserActionHanndler.mouseDown);
		// document.removeEventListener("mousemove", UserActionHanndler.mouseMove);
		// document.removeEventListener("mouseup", UserActionHanndler.mouseUp);
		// document.removeEventListener("keydown", UserActionHanndler.keyDown);
    };

	render(){
		return <div style={{height:200, width:200, backgroundColor:'grey'}}>Dashboard</div>
	}
}

export default Dashboard;