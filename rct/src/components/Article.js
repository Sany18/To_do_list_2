import React, {Component} from 'react';

const API = 'http://localhost:3000';

class Article extends Component {
	state = {
		isOpen: false,
		tasks: null
	}

	componentDidMount() {
		fetch(API)
		.then(response => response.json())
		.then(data => {this.setState({tasks: data})})
	}

	render() {
		// var article = this.props
		// var body = this.state.isOpen && <p>{article.anyText}</p>
		// console.log(this.state);
		var innerBody = '';
		var body = this.state.isOpen && <p>{innerBody}</p>;
		return(
			<div>
				<p>Article</p>
				<p>{innerBody}</p>
				
				<button onClick={this.handleClick}>
				{!this.state.isOpen ? 'open' : 'close'}
				</button>
			</div>
			)
	}

	handleClick = () => {
		this.getTasks();
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	getTasks = () => {
		this.innerBody = this.state.tasks['0'].title;
		console.log(this.innerBody)
	}
}

export default Article;