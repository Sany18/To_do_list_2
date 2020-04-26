import React, {Component} from 'react'
import Buttons from './buttons'
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { Button, ButtonGroup } from 'react-bootstrap'

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			error: null,
			tasks: [],
			value: {
				email: '',
				password: ''
			}
		}
	}

	handleChange = ({ target }) => {
		this.setState({ value: { ...this.state.value, [target.name]: target.value } })
	}

	render() {
		if (this.state.isLoading) {
			return(
				<Form>
					<FormGroup controlId='formInlineMail2'>
						<ControlLabel>Email</ControlLabel>
						<FormControl bsSize='small' type='text' name='email' placeholder='email' onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup controlId='formInlinePass2'>
						<ControlLabel>Password</ControlLabel>
						<FormControl bsSize='small' name='password' type='password' placeholder='password' onChange={this.handleChange}/>
					</FormGroup>
					<ButtonGroup>
						<Buttons type='signIn' params={this.state.value}/>
						<Button href='/registration' bsSize='small' className='text-body'>Sign up</Button>
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

export default Login
