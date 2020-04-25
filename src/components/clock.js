import React, { Component } from 'react'

class Clock extends Component {
	state = {
		time: ''
	}

	componentDidMount() {
		setInterval(this.getTime, 1000)
	}

	getTime = () => {
		let time = new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
		this.setState({ time })
	}

	render() {
		return(
			<h2 className='mr-2' id='clock'>Now is {this.state.time}</h2>
		)
	}
}

export default Clock

