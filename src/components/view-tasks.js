import React, {Component} from 'react';
import routes from '../config/routes-helper';
import globs from '../config/global-variables';
import Buttons from './buttons';
import { ButtonGroup } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

class Article extends Component {
	state = {
		isLoading: false,
		error: null,
		isOpen: false,
		tasks: [],
		taps: 0
	}

	componentDidUpdate() {
		if (this.state.taps !== +localStorage.getItem('taps')) {
			this.getTasks()
			if (globs.ENV === 'test') {console.log('update!')}
			this.setState({taps: +localStorage.getItem('taps')})
		}
	}

	componentDidMount() {
		this.getTasks();
		this.setState({taps: +localStorage.getItem('taps')})
	}

	getTasks = () => {
		let myInit = 'access_token=' + localStorage.getItem('access_token')
		fetch(routes.tasksGet + '?' + myInit)
		.then(response => response.json())
		.then(data => this.setState({tasks: data, isLoading: true, error: data.error}))
    .catch(error => this.setState({ error }))
	}

	handleClick = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	cutDate = (d) => {
		if (d === null) {
			return 'free'
		} else {
		let date = d.substr(0,10)
		return date
		}
	}

	render() {
		if (this.state.isLoading && !this.state.error && this.state.tasks.length) {
			return(
				<div id='tasks'>
				{this.state.tasks.map((task, i) =>
					<ul className="list-group task" key={i}>
						<li className="list-group-item list-group-item-success mr-2">
							<div className="float-left">
								<b>{task.title}</b><br/>
								{task.theme}
							</div>
							<div className="text-right float-right">
								<div className="d-inline">Due date: {this.cutDate(task.due_date)} </div>
								<ButtonGroup>
									<Buttons type='editTask' params={i}/>
									<Buttons type='deleteTask2' params={task.id}/>
								</ButtonGroup>
							</div>
						</li>
					</ul>
				)}</div>
			)
		}
		if (this.state.isLoading && !this.state.tasks.length && !this.state.error) {
			return(
				<div>
					<p>Creare you first task</p>
				</div>
			)
		}
		if (this.state.isLoading && this.state.error) {
			NotificationManager.info(this.state.error.toString(), '', 3000);
			return(null)
		} else {
			return(
				<div>
					<p>Wait</p>
				</div>
			)
		}		
	}
}

export default Article;