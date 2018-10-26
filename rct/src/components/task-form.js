import React, {Component} from 'react';
import routes from '../config/routes-helper';
import Buttons from './buttons';

class Task extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			error: null,
			tasks: [],
			taskKey: this.props.taskKey,
			value: {
				id: '',
				title: '',
				theme: '',
				priority: 0,
				due_date: ''
			}
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		if (this.emptyTaskKey()) {
		let myInit = 'access_token=' + localStorage.getItem('access_token')
		fetch(routes.tasksGet + '?' + myInit)
			.then(response => response.json())
			.then(data => this.setState({tasks: data, isLoading: true}))
			.then(data => {
				let task = this.state.tasks[this.state.taskKey];
				this.setState({ value: { ...this.state.value, title:  task.title} });
				this.setState({ value: { ...this.state.value, theme:  task.theme} });
				this.setState({ value: { ...this.state.value, id:  task.id} });
			})
			.catch(error => this.setState({ error }))
		}
	}

	emptyTaskKey = () => {
		return !isNaN(parseFloat(this.props.taskKey)) && isFinite(this.props.taskKey);
	}

	handleChange(event) {
		let val = event.target.value
		this.setState({ value: { ...this.state.value, [event.target.name]:  val} });
	}

	render() {
		let task = this.state.tasks[this.state.taskKey] || this.state.value
		if (this.state.isLoading || !this.emptyTaskKey()) {
			return(
				<div>
					<label>Theme</label>
					<input defaultValue={task.title} name="title" onChange={this.handleChange}/> 
					<label>Task</label>
					<textarea defaultValue={task.theme} name="theme" onChange={this.handleChange}/>
					{task.id ? <Buttons type='deleteTask' params={task.id}/> : ''}
					<Buttons type='closeTask'/>
					{+this.state.value.id ?
					<Buttons type='updateTask' params={this.state.value}/> :
					<Buttons type='saveTask' params={this.state.value}/>}
				</div>
				)
		}
		if (this.state.error) {
			document.getElementById('notice').innerHTML = this.state.error.toString()
			return(null)
		} else {
			return(null)
		}
	}
}

export default Task;