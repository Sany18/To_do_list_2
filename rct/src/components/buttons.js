import routes from '../config/routes-helper';
import React, {Component} from 'react';

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

	getButton = (type, params) => {
		switch (type) {
			case 'deleteTask':
				return(
					<button onClick={({adrs = routes.taskDelete + params}) => this.ajaxTo(adrs)}>Delete task</button>
				)
			break;
			case 'deleteTasks':
				return(
					<button onClick={({adrs = routes.deleteSelected + params}) => console.log(adrs)}>Delete selected</button>
				)
			break;
			case 'editTask':
				return(
					<button onClick={({adrs = routes.taskUpdatePut + params}) => console.log(adrs)}>Edit</button>
				)
			break;
			case 'createTask':
				return(
					<button onClick={({adrs = routes.taskCreatePost}) => console.log(adrs)}>New task</button>
				)
			break;
			case 'signUp':
				return(
					<button onClick={() => console.log('coming soon')}>Sign up</button>
				)
			break;
			case 'signIn':
				return(
					<button onClick={() => console.log('coming soon')}>Sign up</button>
				)
			break;
			default:
				document.getElementById('notice').innerHTML = 'Button is undefined'
				return(null)
			break;
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