import React, {Component} from 'react'
import Buttons from './buttons'
import { Form, FormGroup, ControlLabel, FormControl, Button, ButtonGroup } from 'react-bootstrap'

class SignUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			error: null,
			tasks: [],
			value: {
				email: '',
				password: '',
				confirm_password: '',
				last_name: '',
				first_name: ''
			}
		}
	}

	handleChange = ({ target }) => {
		this.setState({ value: { ...this.state.value, [target.name]: target.value } })
	}

	render() {
		if (!this.state.isLoading) {
			return(
				<Form>
					<FormGroup controlId='formInlineEmail'>
						<ControlLabel>Email</ControlLabel>
						<FormControl bsSize='small' name='email' type='email' placeholder='email' onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup controlId='formInlinePass'>
						<ControlLabel>Password</ControlLabel>
						<FormControl bsSize='small' name='password' type='password' placeholder='password' onChange={this.handleChange}/>
					</FormGroup>	
					<FormGroup controlId='formInlineConfirmPass'>
						<ControlLabel>Confirm password</ControlLabel>
						<FormControl bsSize='small' name='confirm_password' type='password' placeholder='confirm password' onChange={this.handleChange}/>
					</FormGroup>	
					<FormGroup controlId='formInlineName'>
						<ControlLabel>Your name</ControlLabel>
						<FormControl bsSize='small' name='first_name' type='text' placeholder='name' onChange={this.handleChange}/>
					</FormGroup>	
					<FormGroup controlId='formInline2Name'>
						<ControlLabel>Last name</ControlLabel>
						<FormControl bsSize='small' name='last_name' type='text' placeholder='last name' onChange={this.handleChange}/>
					</FormGroup>
					<ButtonGroup>		
						<Buttons type='signUp' params={this.state.value} />
						<Button href='/login' bsSize='small' className='text-body'>Login</Button>
					</ButtonGroup>
				</Form>
			)
		}
		if (this.state.error) {
			document.getElementById('notice').innerHTML = this.state.error.toString()
			return null
		}
	}
}

export default SignUp
