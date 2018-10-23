import routes from '../config/routes-helper';
import Task from '../components/task-form';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Buttons extends Component {
	state = {
		isLoading: true,
		error: null,
		resp: [],
		type: null
	}

	ajaxTo = (address) => {
		console.log(address)
		// fetch(address)
		// .then(response => response.json())
		// .then(data => this.setState({resp: data, isLoading: true}))
		// .catch(error => this.setState({ error }))
	}

	openNewTaskModal = () => {
		this.openTaskInModal(false);
	}

	openTaskInModal = (taskKey) => {
		this.hideModal();
		document.getElementById("modal").hidden	= false;
		let container = document.createElement("div");
		document.getElementById("modal").appendChild(container);
		ReactDOM.render(<Task taskKey={taskKey} />, container);
	}

	hideModal = () => {
		let elem = document.getElementById("modal");
		if (elem.firstChild) ReactDOM.unmountComponentAtNode(elem.firstChild);
		elem.innerHTML = ''; 
		elem.hidden	= true;
	}

	saveTask = (r) => {
		this.ajaxTo(routes.taskCreatePost + JSON.stringify(r));
		this.hideModal();
	}

	getButton = (type, params) => {
		switch (type) {
			case 'deleteTask':
				return(
					<button onClick={({adrs = routes.taskDelete + params}) => this.ajaxTo(adrs)}>Delete task</button>
				)
			case 'deleteTasks':
				return(
					<button onClick={({adrs = routes.deleteSelected + params}) => console.log(adrs)}>Delete selected</button>
				)
			case 'editTask':
				return(
					<button onClick={({taskKey = params}) => this.openTaskInModal(taskKey)}>Edit</button>
				)
			case 'createTask':
			case 'newTask':
				return(
					<button onClick={() => this.openNewTaskModal()}>New task</button>
				)
			case 'closeTask':
				return(
					<button onClick={() => this.hideModal()}>Close</button>
				)
			case 'saveTask':
				return(
					<button onClick={({r = this.props.val}) => this.saveTask(r)}>Save</button>
				)
			case 'signUp':
				return(
					<button onClick={() => console.log('coming soon')}>Sign up</button>
				)
			case 'signIn':
				return(
					<button onClick={() => console.log('coming soon')}>Sign in</button>
				)
			default:
				document.getElementById('notice').innerHTML = 'Button is undefined'
				return(null)
		}
	}

	render() {
		if (this.state.isLoading) {
			return(this.getButton(this.props.type, this.props.params))
		}
		if (this.state.error) {
			document.getElementById('notice').innerHTML = this.state.error.toString()
			return(null)
		}
	}
}

export default Buttons;



// CreateTask
// EditTask
// DeleteTask
// DeleteTasks
// SingUp
// SingIn