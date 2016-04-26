import React from 'react';
import ReactDOM from 'react-dom';
import WhiteBoard from './components/whiteBoard';
import Tools from './components/tools';
import History from './components/history';

ReactDOM.render(<div id='main'>
					<div id='container'>
						<Tools/>
						<WhiteBoard />
					</div>
					<History/>
		     	</div>, document.getElementById('app'));