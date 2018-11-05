import React, {Component} from 'react';
import ViewTasks from './components/view-tasks';
import Buttons from './components/buttons';
import Clock from './components/clock';
import Login from './components/login';
import Registration from './components/registration';
import { ButtonGroup } from 'react-bootstrap';
import './index.css';
import globs from './config/global-variables';

class Main extends Component {
	state = {
		token: localStorage.access_token,
		timer: '',
	}

	componentDidMount() {
		if (document.getElementById("modal")) {document.getElementById("modal").hidden = true}
		var timer = setInterval(this.setToken, 500);
		this.setState({timer: timer});
		if (globs.ENV === 'test') console.log('You are in a test environment')
	}

	setToken = () => {
		this.setState({token: localStorage.access_token})
	}

	render() {
		if (this.state.token) {
			return (
				<div className="mb-2 ml-2">
					<h1 id='site_name'>Task list</h1> <Clock />
					<div className="mb-2">
						<ButtonGroup>
							<Buttons type='createTask'/>
							<Buttons type='deleteTasks'/>
							<Buttons type='logOut'/>
						</ButtonGroup>
					</div>
					<ViewTasks />
				</div>
				)
		} else {
			return(
				<div>
					<h1 id='site_name'>Task list</h1> <Clock />
					<div className='row p-2'>
						<div className="col-5">
							<h3>Sing in</h3>
							<Login />
						</div>
						<div className="col-2 my-auto display-4 text-center">
							OR
						</div>
						<div className="col-5">
							<h3>Registration</h3>
							<Registration />
						</div>
					</div>
				</div>
			)
		}
	}		
}

export default Main;