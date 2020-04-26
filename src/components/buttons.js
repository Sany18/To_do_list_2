import routes from '../config/routes-helper'
import globs from '../config/global-variables'
import Task from '../components/task-form'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, ButtonGroup } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

class Buttons extends Component {
	state = {
		isLoading: false
	}

	fetchTo = (address, body, method, callback) => {
		let myInit = { method,
								   headers: { 'Content-Type': 'application/json' },
								   body: this.getTokensBody(body) }

		if (globs.ENV === 'test') {
			console.log('to: ', address)
			console.log('request: ', myInit)
		}

		fetch(address, myInit)
      .then(response => response.json())
      .then(data => {
        if (data.access_token) localStorage.setItem('access_token', data.access_token)
        if (data.user_name) localStorage.setItem('user_name', data.user_name)
				if (data.user_id) localStorage.setItem('user_id', data.user_id)

        if (data.error) NotificationManager.info(data.error, '', 3000)
        if (data.message) NotificationManager.success(data.message, '', 3000)
        if (globs.ENV === 'test') console.log('response: ', data)

				this.refreshTasks()

				if (!data.error && callback) {
					setTimeout(() => callback(data), 500)
				}
      })
      .catch(error => NotificationManager.error(error + '', '', 3000))
	}

	getTokensBody = body => {
		if (body.grant_type === 'password') {
			return JSON.stringify(body)
		} else if (localStorage.getItem('access_token')) {
			body.access_token = localStorage.getItem('access_token')
			return JSON.stringify(body)
		} else {
			return JSON.stringify({ access_token: localStorage.getItem('access_token') })
		}
	}

	openTaskInModal = task => {
		this.hideModal()
		document.getElementById('modal').hidden	= false
		let container = document.createElement('div')
		document.getElementById('modal').appendChild(container)
		ReactDOM.render(<Task task={task} />, container)
	}

	hideModal = () => {
		if (!document.getElementById('modal').hidden) {
			let elem = document.getElementById('modal')
			if (elem.firstChild) ReactDOM.unmountComponentAtNode(elem.firstChild)
			elem.innerHTML = '' 
			elem.hidden	= true
		}
	}

	saveTask = task => {
		this.fetchTo(routes.taskCreatePost, { task }, 'POST')
		this.hideModal()
	}

	updateTask = task => {
		this.fetchTo(routes.taskUpdatePut + task.id, { task }, 'PUT')
		this.hideModal()
	}

	refreshTasks = () => {
		localStorage.setItem('taps', +localStorage.getItem('taps') + 1)
	}

	deleteTask = params => {
		let bool = window.confirm('Delete this task?')
		if (bool) {
			this.fetchTo(routes.taskDelete + params, {}, 'DELETE')			
			this.hideModal()
		}
	}

	login = body => {
		localStorage.removeItem('deleteTasks')
		body.grant_type = 'password'
		this.fetchTo(routes.oauthTokenPOST, body, 'POST', () => window.location.replace('/'))
	}

	signUp = body => {
		body.grant_type = 'password'
		this.fetchTo(routes.userCreatePOST, body, 'POST')
	}

	logOut = () => {
		NotificationManager.success('Log out sucesfuly', '', 3000)
		localStorage.clear()
	}

	deleteTasks = () => {
		let tasks = localStorage.getItem('deleteTasks')
		this.fetchTo(routes.deleteSelected + tasks, {}, 'DELETE')
	}

	done = id => this.fetchTo(routes.statusSwitchPOST, { id }, 'POST')

	getButton = (type, params) => {
		switch (type) {
			case 'deleteTask':
				return <Button onClick={() => this.deleteTask(params)}>Delete Ad</Button>
			case 'deleteTask2':
				return <Button onClick={() => this.deleteTask(params)}>&#215;</Button>
			case 'editTask':
				return <Button onClick={() => this.openTaskInModal(params)}>Edit</Button>
			case 'createTask':
			case 'newTask':
				return <Button id='newTask' bsStyle='default' onClick={() => this.openTaskInModal()}>New Ad</Button>
			case 'closeTask':
				return <Button id='closeTask' onClick={this.hideModal}>Close</Button>
			case 'saveTask':
				return <Button onClick={() => this.saveTask(params)}>Save</Button>
			case 'updateTask':
				return <Button onClick={() => this.updateTask(params)}>Update</Button>
			case 'signUp':
				return <Button onClick={() => this.signUp(params)}>Sign up</Button>
			case 'signIn':
				return <Button onClick={() => this.login(params)}>Login</Button>
			case 'logOut':
				return <Button onClick={this.logOut}>Log out</Button>
			case 'done':
				return <Button onClick={() => this.done(params)}>Unmark</Button>
			case 'notDone':
				return <Button onClick={() => this.done(params)}>Mark</Button>
			default:
				NotificationManager.warning('Button is undefined', '', 3000)
				return null
		}
	}

	render() {
    const { type, params } = this.props

    return (
      <ButtonGroup bsSize='small'>
        {this.getButton(type, params)}
      </ButtonGroup>
    )
  }
}

export default Buttons
