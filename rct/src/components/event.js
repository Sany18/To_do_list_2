import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';

class Event extends Component {
	state = {
		error: null,
	}

	render() {
		return(
			<div id='event'>
				<Alert bsStyle="warning">
					<strong>{this.props.val}</strong>
				</Alert>
			</div>
			)
	}		
}

export default Event;