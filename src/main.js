import React, { Component } from 'react'
import ViewTasks from './components/view-tasks'
import Buttons from './components/buttons'
import Clock from './components/clock'
import Login from './components/login'
import Registration from './components/registration'
import { ButtonGroup, Button } from 'react-bootstrap'
import globs from './config/global-variables'
import { NotificationContainer } from 'react-notifications'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css'
import './index.css'

class Main extends Component {
  state = {
    token: localStorage.access_token,
    userName: '',
    userId: undefined
  }

  componentDidMount() {
		localStorage.setItem('taps', 0)
    if (document.getElementById('modal')) document.getElementById('modal').hidden = true
    if (globs.ENV === 'test') console.log('Test environment')

    setInterval(_ => {
      let { token, userId } = this.state

      if (localStorage.access_token !== token || localStorage.user_id != userId) {
        this.setState({
          token: localStorage.access_token,
          userName: localStorage.user_name,
          userId: +localStorage.user_id
        })
      }
    }, 500)
  }

  renderRoot = () => {
    const { token, userName, userId } = this.state

    return(
      <div>
        <div className='mb-2'>
          <ButtonGroup bsSize='small'>
            {token ? <Buttons type='createTask' /> : null}
            {token
              ? <Buttons type='logOut'/>
              : <Button href='/login' className='text-body'>Login</Button>}
          </ButtonGroup>
        </div>
        <ViewTasks userName={userName} userId={userId} />
      </div>
    )
  }

  renderRegistration = () => (
    <div className='forms'>
      <h3>Registration</h3>
      <Registration />
    </div>
  )

  renderLogin = () => (
    <div className='forms'>
      <h3>Login</h3>
      <Login />
    </div>
  )

  render() {
    const { userName } = this.state
    
    return(
      <div className='content'>
        <NotificationContainer />
        <header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button href='/' className='btn btn-outline-primary btn-lg'>Go to Board</Button>
            <div className='user-name'>
              {userName ? 'Hi, ' + userName : 'read only, guest'}
            </div>
          </div>
          <Clock />
        </header>
        <Router>
          <>
            <Route exact path='/' component={this.renderRoot} />
            <Route path='/registration' component={this.renderRegistration} />
            <Route path='/login' component={this.renderLogin} />
          </>
        </Router>
      </div>
    )
  }
}
 
export default Main
