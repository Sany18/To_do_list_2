import React, {Component} from 'react';
import routes from '../config/routes-helper';
import Buttons from './buttons';
import { ButtonGroup } from 'react-bootstrap';

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
			console.log('update!')
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
		.then(data => this.setState({tasks: data, isLoading: true}))
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
		if (this.state.isLoading && this.state.tasks.length) {
			return(
				<div>
				{this.state.tasks.map((task, i) =>
					<ul className="list-group" key={i}>
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
		if (this.state.isLoading && !this.state.tasks.length) {
			return(
				<div>
					<p>Creare you first task</p>
				</div>
			)
		}
		if (this.state.error) {
			document.getElementById('notice').innerHTML = this.state.error.toString()
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