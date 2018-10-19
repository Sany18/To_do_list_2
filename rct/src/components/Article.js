import React, {Component} from 'react';

const API = 'http://localhost:3000';

class Article extends Component {

	state = {
		isOpen: false,
		isLoading: false,
		tasks: []
	}

	componentDidMount() {
		fetch(API)
		.then(response => response.json())
		.then(data => {this.setState({tasks: data, isLoading: true})})
	}

	render() {		
		const tasks = this.state.tasks;
		if (this.state.isLoading) {
			return(
				<div>
					<p>Article</p>
					<p>{this.state.isOpen ? tasks[0].title : ''}</p>				
					<button onClick={this.handleClick}>
						{this.state.isOpen ? 'close' : 'open'}
					</button>
				</div>
			)
		} else {
			return(
				<div>
					<p>Wait</p>
				</div>
			)
		}		
	}

	handleClick = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
}

export default Article;