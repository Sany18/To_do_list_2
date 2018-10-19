import routes from '../config/routes-helper';
import React from 'react';

let buttons = {
	deleteTask: (id) => {return(
			React.createElement(
				"button",
				{ onClick: () => {alert(routes.root + routes.taskDelete + id)} },
				"Delete task"
			)
		)},
	createTask: null
	}

export default buttons;




// CreateTask
// EditTask
// DeleteTask
// DeleteTasks
// SingUp
// SingIn