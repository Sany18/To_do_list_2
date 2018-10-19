import React, {Component} from 'react';

const API = 'http://localhost:3000';

class Article extends Component {

	state = {
		isLoading: false,
		error: null,		
		isOpen: false,
		tasks: []
	}

	componentDidMount() {
		fetch(API)
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
							</li>
						)
					}</ul>
					<button onClick={this.handleClick}>
						{this.state.isOpen ? 'close' : 'open'}
					</button>
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