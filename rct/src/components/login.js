import React, {Component} from 'react';
import Buttons from './buttons';

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
					<label>Email</label>	
					<input name="email" onChange={this.handleChange}/> 
					<label>Password</label>
					<input name="password" onChange={this.handleChange} type='password'/>
					<Buttons type='signIn' params={this.state.value}/>				
					<Buttons type='signUp'/>
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