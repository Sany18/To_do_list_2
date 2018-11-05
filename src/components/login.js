import React, {Component} from 'react';
import Buttons from './buttons';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			error: null,
			tasks: [],
			value: {
				email: '',
				password: '',
			}
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		let val = event.target.value
		this.setState({ value: { ...this.state.value, [event.target.name]:  val} });
	}

	render() {
		if (this.state.isLoading) {
			return(
				<div>
					<Form>
						<FormGroup controlId="formInlineMail2">
							<ControlLabel>Email</ControlLabel>
							<FormControl bsSize="small" type="text" name="email" placeholder="email" onChange={this.handleChange}/>
						</FormGroup>
						<FormGroup controlId="formInlinePass2">
							<ControlLabel>Password</ControlLabel>
							<FormControl bsSize="small" name="password" type='password' placeholder="password" onChange={this.handleChange}/>
						</FormGroup>
						<Buttons type='signIn' params={this.state.value}/>
					</Form>
				</div>
			)
		}
		if (this.state.error) {
			document.getElementById('notice').innerHTML = this.state.error.toString()
			return(null)
		}
	}
}

export default Login;