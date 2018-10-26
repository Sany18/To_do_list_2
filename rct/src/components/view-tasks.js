import React, {Component} from 'react';
import routes from '../config/routes-helper';
import Buttons from './buttons';
import { Button } from 'reactstrap';

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
			// console.log(this.state.taps, +localStorage.getItem('taps'))
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

	render() {
		if (this.state.isLoading && this.state.tasks.length) {
			return(
				<div>
					<ul>{this.state.tasks.map((task, i) =>
							<li key={i}>
								<h3>{task.title}</h3>
								<p>{task.theme}</p>
								<Buttons type='deleteTask' params={task.id}/>
								<Buttons type='editTask' params={i}/>
							</li>
						)
					}</ul>
				</div>
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