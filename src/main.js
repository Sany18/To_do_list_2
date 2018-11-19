import React, { Component } from 'react';
import ViewTasks from './components/view-tasks';
import Buttons from './components/buttons';
import Clock from './components/clock';
import Login from './components/login';
import Registration from './components/registration';
import { ButtonGroup } from 'react-bootstrap';
import globs from './config/global-variables';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';

class Main extends Component {
  state = {
    token: localStorage.access_token,
    timer: '',
  }

  componentDidMount() {
    if (document.getElementById("modal")) {document.getElementById("modal").hidden = true}
    var timer = setInterval(this.setToken, 500);
    this.setState({ timer: timer });
    if (globs.ENV === 'test') console.log('You are in a test environment')
  }

  setToken = () => {
    this.setState({token: localStorage.access_token})
  }

  main = () => {
    if (this.state.token) {
    return(
      <div>
        <div className="mb-2">
          <ButtonGroup>
            <Buttons type='createTask'/>
            <Buttons type='deleteTasks'/>
            <Buttons type='logOut'/>
          </ButtonGroup>
        </div>
        <ViewTasks />
      </div>
      )
    } else {
    return(  
      <div className="col-5">
        <h3>Sing in</h3>
        <Login />
      </div>
      )
    }
  }

  registration = () => {
    return(
      <div className="col-5">
        <h3>Registration</h3>
        <Registration />
      </div>
    )
  }

  render() {
    return(
      <div className="col-12">
        <NotificationContainer/>
        <h1 id='site_name' className="mb-2 ml-2 mr-2">Task list</h1> <Clock />
          <Router>
            <div>
              <Route exact path="/" component={this.main} />
              <Route path="/registration" component={this.registration} />
            </div>
          </Router>
      </div>
    )
  }
}
 
export default Main;