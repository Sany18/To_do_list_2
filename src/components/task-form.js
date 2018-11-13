import React, {Component} from 'react';
import routes from '../config/routes-helper';
import Buttons from './buttons';
import { ButtonGroup } from 'react-bootstrap';

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
		this.setState({ value: { ...this.state.value, due_date: this.getDateNow()} });

		if (this.emptyTaskKey()) {
		let myInit = 'access_token=' + localStorage.getItem('access_token')
		fetch(routes.tasksGet + '?' + myInit)
			.then(response => response.json())
			.then(data => this.setState({tasks: data, isLoading: true}))
			.then(data => {
				let task = this.state.tasks[this.state.taskKey];
				this.setState({ value: { ...this.state.value, title:  task.title} });
				this.setState({ value: { ...this.state.value, theme:  task.theme} });
				this.setState({ value: { ...this.state.value, due_date:  task.due_date} });
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

	getDateNow = () => {
		let date = new Date()
		return (cz(date.getFullYear()) + "-" + cz(date.getMonth()) + "-" + cz(date.getDate()))

		function cz(i) {
			if (i === null) return 'x'
			if (i<10) {return '0' + i} else return i
		}
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
					<label>Due date</label>
					<input type="date" defaultValue={task.due_date || this.getDateNow()} min={this.getDateNow()} name="due_date" onChange={this.handleChange}/>
					<ButtonGroup>
						{task.id ? <Buttons type='deleteTask' params={task.id}/> : ''}
						<Buttons type='closeTask'/>
						{+this.state.value.id ?
						<Buttons type='updateTask' params={this.state.value}/> :
						<Buttons type='saveTask' params={this.state.value}/>}
					</ButtonGroup>
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