import routes from '../config/routes-helper';
import globs from '../config/global-variables';
import Task from '../components/task-form';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import Event from '../components/event';

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

		if (globs.ENV === 'test') {console.log('request: ', myInit)}
		if (globs.ENV === 'test') {console.log('to: ', address)}

		fetch(address, myInit)
		.then(response => response.json())
		.then(data => {
			if (data.access_token) localStorage.setItem('access_token', data.access_token);
			if (data.error) ReactDOM.render(<Event val={data.error} />, document.getElementById("notice"));

			if (globs.ENV === 'test') {console.log('response: ', data)}

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
		if (!document.getElementById("modal").hidden) {
			let elem = document.getElementById("modal");
			if (elem.firstChild) ReactDOM.unmountComponentAtNode(elem.firstChild);
			elem.innerHTML = ''; 
			elem.hidden	= true;
		}
	}

	saveTask = (body) => {
		this.ajaxTo(routes.taskCreatePost, {'task': body}, 'POST');
		this.hideModal();
	}

	updateTask = (body) => {
		this.ajaxTo(routes.taskUpdatePut + body.id, {'task': body}, 'PUT');
		this.hideModal();
	}

	login = (body) => {
		body.grant_type = 'password';
		this.ajaxTo(routes.oauthTokenPOST, body, 'POST');
	}

	refreshTasks = () => {
		localStorage.setItem('taps', +localStorage.getItem('taps') + 1)
	}

	deleteTask = (params) => {
		this.ajaxTo(routes.taskDelete + params, {}, 'DELETE');
		this.hideModal();
	}

	signUp = (body) => {		
		body.grant_type = 'password';
		this.ajaxTo(routes.userCreatePOST, body, 'POST');
	}

	getButton = (type, params) => {
		switch (type) {
			case 'deleteTask':
				return(
					<Button onClick={() => this.deleteTask(params)}>Delete task</Button>
				)
			case 'deleteTask2':
				return(
					<Button onClick={() => this.deleteTask(params)}>&#215;</Button>
				)
			case 'deleteTasks':
				return(
					<Button onClick={() => console.log(routes.deleteSelected + params)}>Delete selected</Button>
				)
			case 'editTask':
				return(
					<Button onClick={() => this.openTaskInModal(params)}>Edit</Button>
				)
			case 'createTask':
			case 'newTask':
				return(
					<Button bsStyle="default" onClick={() => this.openNewTaskModal()}>New task</Button>
				)
			case 'closeTask':
				return(
					<Button onClick={() => this.hideModal()}>Close</Button>
				)
			case 'saveTask':
				return(
					<Button onClick={() => this.saveTask(params)}>Save</Button>
				)
			case 'updateTask':
				return(
					<Button onClick={() => this.updateTask(params)}>Update</Button>
				)
			case 'signUp':
				return(
					<Button onClick={() => this.signUp(params)}>Sign up</Button>
				)
			case 'signIn':
				return(
					<Button onClick={() => this.login(params)}>Sign in</Button>
				)
			case 'logOut':
				return(
					<Button onClick={() => localStorage.removeItem('access_token')}>Log out</Button>
				)
			default:
				document.getElementById('notice').innerHTML = 'Button is undefined'
				return(null)
		}
	}

	render() {return(<ButtonGroup bsSize="small">{this.getButton(this.props.type, this.props.params)}</ButtonGroup>)}
}

export default Buttons;