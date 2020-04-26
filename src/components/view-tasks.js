import React, {Component} from 'react'
import routes from '../config/routes-helper'
import Buttons from './buttons'
import { ButtonGroup } from 'react-bootstrap'

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      error: null,
      isOpen: false,
      data: [],
      taps: 0,
      userName: ''
    }
  }

  componentDidMount() {
    this.getTasks()

    setInterval(_ => {
      let { taps } = this.state

      if (localStorage.taps !== taps) {
        this.getTasks()
        this.setState({ taps: localStorage.taps || 0 })
      }
    }, 500)
  }

  getTasks = () => {
    let myInit = 'access_token=' + localStorage.getItem('access_token')

    fetch(routes.tasksGet + '?' + myInit)
      .then(response => response.json())
      .then(data => this.setState({ data, isLoading: false }))
      .catch(error => this.setState({ error }))
  }

  handleClick = () => this.setState({ isOpen: !this.state.isOpen })

  cutDate = d => d ? d.substr(0, 10) : 'free'

  render() {
    const { isLoading, data, error } = this.state

    if (!isLoading && !error && data.length) {
      return(
        <div id='tasks'>
          <ul className='list-group task'>
            {data.map((task, i) =>
              <li className={'list-group-item mr-2 ' + (task.user_id === this.props.userId ? 'list-group-item-success' : 'list-group-item-secondary')}
                  key={i}>
                <div className='float-left'>
                  <b> {task.title}</b><br />
                  {task.theme}<br />
                  Author:<b> {task.user_name}</b><br />
                  {task.image
                    ? <img src={task.image} alt='img'
                      style={{ maxWidth: '5cm', maxHeight: '5cm' }} />
                    : null}
                </div>
                <div className='text-right float-right'>
                  <div className='d-inline'>Up to: {this.cutDate(task.due_date)} </div>
                  {task.user_id === this.props.userId
                    ? <ButtonGroup>
                      <Buttons type='editTask' params={task} />
                      <Buttons type='deleteTask2' params={task.id} />
                    </ButtonGroup>
                    : null}
                </div>
              </li>
            )}
          </ul>
        </div>
      )
    }
    if (!isLoading && !data.length && !error) {
      return <div>Creare you first task</div>
    }
    if (!isLoading && error) {
      return <div>{error.toString()}</div>
    } else {
      return <div>Wait</div>
    }    
  }
}

export default Article
