import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import ViewTasks from './components/view-tasks';
import Buttons from './components/buttons';
import Clock from './components/clock';

function Main() {
	return (
		<div>
			<h1>Task list</h1>
			  <Clock />
				<Buttons type='createTask'/>
				<Buttons type='deleteTasks'/>
				<Buttons type='signUp'/>
				<Buttons type='signIn'/>

			{/*<Article anyText="random props"/>*/}
			<ViewTasks />
		</div>
	)
}

function tick() {
	ReactDom.render(<Main/>, document.getElementById('root'));
}

setInterval(tick, 500);
