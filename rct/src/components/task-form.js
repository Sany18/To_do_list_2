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
		if (this.props.taskKey.toString()) {
			fetch(routes.root)
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

	handleChange(event) {
		let val = event.target.value
		this.setState({ value: { ...this.state.value, [event.target.name]:  val} });
	}

	render() {
		let task = this.state.tasks[this.state.taskKey] || this.state.value
		let buttonDeleteTask = task.id ? <Buttons type='deleteTask' params={task.id}/> : ''
		if (this.state.isLoading) {
			return(
				<div>
				<label>Theme</label>
				<input defaultValue={task.title} name="title" onChange={this.handleChange}/> 
				<label>Task</label>
				<textarea defaultValue={task.theme} name="theme" onChange={this.handleChange}/>
				{buttonDeleteTask}
				<Buttons type='closeTask'/>
				<Buttons type='saveTask' val={this.state.value}/>
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