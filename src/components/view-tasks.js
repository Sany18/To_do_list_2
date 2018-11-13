import React, {Component} from 'react';
import routes from '../config/routes-helper';
import globs from '../config/global-variables';
import Buttons from './buttons';
import { ButtonGroup } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			error: null,
			isOpen: false,
			tasks: [],
			taps: 0,
			selected: []
		}

		this.handleInputChange = this.handleInputChange.bind(this);
	};

	componentDidUpdate() {
		if (this.state.taps !== +localStorage.getItem('taps')) {
			this.getTasks()
			if (globs.ENV === 'test') {console.log('update!')}
			this.setState({taps: +localStorage.getItem('taps')})

			let checkboxes = document.getElementsByClassName('ch')
			for (let i = 0; i < checkboxes.length; i++) {
				checkboxes[i].checked = false
			}	
		}	
	}

	componentDidMount() {
		this.getTasks();
		this.setState({taps: +localStorage.getItem('taps')})
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		let x = this.state.selected
		if (value) {		
			let cur = true;
			for (let i = 0; i < x.length; i++) {
				if (x[i] === name) {cur = false}
			}		
			if (cur) {x.push(name); this.setState({selected: x})}
		} else if (!value) {
			for (let i = 0; i < x.length; i++) {
				if (x[i] === name) {delete x[i]; this.setState({selected: x.filter(Boolean)})}
			}
		}
		localStorage.setItem('deleteTasks', this.state.selected.join('&'))
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

	isDone = (i) => {
		return( i ? 'list-group-item-success' : 'list-group-item-secondary' )
	}

	render() {
		if (this.state.isLoading && !this.state.error && this.state.tasks.length) {
			return(
				<div id='tasks'>
				{this.state.tasks.map((task, i) =>
					<ul className="list-group task" key={i}>
						<li className={"list-group-item mr-2 " + this.isDone(task['is_done?'])}>
							<div className="float-left">
								<input name={task.id} type="checkbox" className="ch" onChange={this.handleInputChange} />
								<b>{task.title}</b><br/>
								{task.theme}
							</div>
							<div className="text-right float-right">
								<div className="d-inline">Due date: {this.cutDate(task.due_date)} </div>
								<ButtonGroup>
									{task['is_done?'] ? 
										<Buttons type='notDone' params={task.id} /> :
										<Buttons type='done' params={task.id} />
									}
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