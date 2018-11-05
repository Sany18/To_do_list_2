import React, {Component} from 'react';

class Clock extends Component {
	state = {
		timer: '',
		currentTime: ''
	}

	componentDidMount() {
		var timer = setInterval(this.getTime, 1000);
		this.setState({timer: timer});
	}

	render() {
		return(
			<h2 className="mr-2" id='clock'>Now is {this.state.currentTime}</h2>
			)
	}

	getTime = () => {
		let time = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
		this.setState({currentTime: time})
	}
}

export default Clock;

