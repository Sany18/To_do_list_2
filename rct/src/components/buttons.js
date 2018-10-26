import routes from '../config/routes-helper';
import Task from '../components/task-form';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Buttons extends Component {
	state = {
		isLoading: false,
		error: null,
		resp: [],
		type: null
	}

	ajaxTo = (address, body, method) => {
		let myInit = { method: method,
									 headers: { 'Content-Type': 'application/json' },
									 body: this.getTokensBody(body) }

		console.log('request: ', myInit)

		fetch(address, myInit)
		.then(response => response.json())
		.then(data => {
			if (data.access_token) localStorage.setItem('access_token', data.access_token);
			if (data.error) this.setState({ error: data.error })
			console.log('response: ', data)
		  this.refreshTasks();
		})
		.catch(error => this.setState({ error }))
	}

	getTokensBody = (body) => {
		if (body.grant_type === 'password') {
			return JSON.stringify(body)
		} else if (localStorage.getItem('access_token')) {
			body.access_token = localStorage.getItem('access_token')
			return JSON.stringify(body)
		} else {
			return JSON.stringify({'access_token': localStorage.getItem('access_token')})
		}
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
		// Выкидывает ошибку при сейве: утечка памяти. Надо исправить.
		if (elem.firstChild) ReactDOM.unmountComponentAtNode(elem.firstChild);
		elem.innerHTML = ''; 
		elem.hidden	= true;
	}

	saveTask = (body) => {
		this.ajaxTo(routes.taskCreatePost, {'task': body}, 'POST');
		this.hideModal();
	}

	login = (body) => {
		body.grant_type = 'password';
		this.ajaxTo(routes.oauthTokenPOST, body, 'POST');
	}

	refreshTasks = () => {
		localStorage.setItem('taps', +localStorage.getItem('taps') + 1)
	}

	getButton = (type, params) => {
		switch (type) {
			case 'deleteTask':
				return(
					<button onClick={() => this.ajaxTo(routes.taskDelete + params, {}, 'DELETE')}>Delete task</button>
				)
			case 'deleteTasks':
				return(
					<button onClick={() => console.log(routes.deleteSelected + params)}>Delete selected</button>
				)
			case 'editTask':
				return(
					<button onClick={() => this.openTaskInModal(params)}>Edit</button>
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
					<button onClick={() => this.saveTask(params)}>Save</button>
				)
			case 'signUp':
				return(
					<button onClick={() => console.log('coming soon')}>Sign up</button>
				)
			case 'signIn':
				return(
					<button onClick={() => this.login(params)}>Sign in</button>
				)
			case 'logOut':
				return(
					<button onClick={() => localStorage.removeItem('access_token')}>Log out</button>
				)
			default:
				document.getElementById('notice').innerHTML = 'Button is undefined'
				return(null)
		}
	}

	render() {
		if (this.state.error) {
			document.getElementById('notice').innerHTML = this.state.error.toString()
			return(this.getButton(this.props.type, this.props.params))
		} else {
			return(this.getButton(this.props.type, this.props.params))
		}
	}
}

export default Buttons;