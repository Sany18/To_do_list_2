import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import ViewTasks from './components/view-tasks';

function Main() {
	return (
		<div>
			<h1>Task list</h1>
			{/*<Article anyText="random props"/>*/}
			<ViewTasks />
		</div>
	)
}

ReactDom.render(<Main/>, document.getElementById('root'));