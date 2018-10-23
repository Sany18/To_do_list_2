import React, {Component} from 'react';
import routes from '../config/routes-helper';
import Buttons from './buttons';
import { Button } from 'reactstrap';

class Article extends Component {
	state = {
		isLoading: false,
		error: null,		
		isOpen: false,
		tasks: []
	}

	componentDidMount() {
		fetch(routes.root)
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
		if (this.state.isLoading) {
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