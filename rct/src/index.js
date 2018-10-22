import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import ViewTasks from './components/view-tasks';
import Buttons from './components/buttons';

function Main() {
	return (
		<div>
			<h1>Task list</h1>			
				<Buttons type='createTask'/>
				<Buttons type='deleteTasks'/>
				<Buttons type='signUp'/>
				<Buttons type='signIn'/>

			{/*<Article anyText="random props"/>*/}
			<ViewTasks />
		</div>
	)
}

ReactDom.render(<Main/>, document.getElementById('root'));