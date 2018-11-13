import React, {Component} from 'react';
import Buttons from './buttons';
import { Form, FormGroup, ControlLabel, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			error: null,
			tasks: [],
			value: {
				email: '',
				password: '',
				confirm_password: '',
				last_name: '',
				first_name: ''
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
						<FormGroup controlId="formInlineEmail">
							<ControlLabel>Email</ControlLabel>
							<FormControl bsSize="small" name="email" type="email" placeholder="email" onChange={this.handleChange}/>
						</FormGroup>
						<FormGroup controlId="formInlinePass">
							<ControlLabel>Password</ControlLabel>
							<FormControl bsSize="small" name="password" type='password' placeholder="password" onChange={this.handleChange}/>
						</FormGroup>	
						<FormGroup controlId="formInlineConfirmPass">
							<ControlLabel>Confirm password</ControlLabel>
							<FormControl bsSize="small" name="confirm_password" type='password' placeholder="confirm password" onChange={this.handleChange}/>
						</FormGroup>	
						<FormGroup controlId="formInlineName">
							<ControlLabel>Your name</ControlLabel>
							<FormControl bsSize="small" name="first_name" type='text' placeholder="name" onChange={this.handleChange}/>
						</FormGroup>	
						<FormGroup controlId="formInline2Name">
							<ControlLabel>Last name</ControlLabel>
							<FormControl bsSize="small" name="last_name" type='text' placeholder="last name" onChange={this.handleChange}/>
						</FormGroup>
						<ButtonGroup>		
							<Buttons type='signUp' params={this.state.value}/>
							<Link to="/"><Button bsSize="small">Login</Button></Link>
						</ButtonGroup>
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

export default SignUp;