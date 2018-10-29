import React, {Component} from 'react';

class Name extends Component {
	state = {
		isLoading: false,
		error: null,
		resp: []
	}

	componentDidMount() {
		fetch(routes.root)
		.then(response => response.json())
		.then(data => this.setState({resp: data, isLoading: true}))
    .catch(error => this.setState({ error }))
	}

	render() {
		if (this.state.isLoading) {
			return()
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

export default Name;