import React from 'react';
import ReactDom from 'react-dom';
import ViewTasks from './components/view-tasks';
import Buttons from './components/buttons';
import Clock from './components/clock';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

{
	document.getElementById("modal").hidden	= true
}

function Main() {
	if (localStorage.access_token) {
		return (
			<div>
				<h1 id='site_name'>Task list</h1> <Clock />
					<div id='buttons_board'>
						<Buttons type='createTask'/>
						<Buttons type='deleteTasks'/>
						<Buttons type='logOut'/>
					</div>
				<ViewTasks />
			</div>
		)
	} else {
		return(
			<div>
				<h1 id='site_name'>Task list</h1> <Clock />
				<Login />
			</div>
		)
	}
}

function tick() {
	ReactDom.render(<Main/>, document.getElementById('root'));
}

setInterval(tick, 500);

// ReactDom.render(<Main/>, document.getElementById('root'));