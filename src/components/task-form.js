import React, {Component} from 'react'
import Buttons from './buttons'
import { ButtonGroup } from 'react-bootstrap'

class Task extends Component {
  constructor(props) {
    super(props)

    const { task } = props
    
    this.state = {
      value: {
        title: '',
        theme: '',
        priority: 0,
        due_date: this.getDateNow(),
        ...task
      }
    }
  }

	handleChange = ({ target }) => {
		this.setState({ value: { ...this.state.value, [target.name]: target.value } })
	}

  getDateNow = () => {
    let date = new Date()
    return (cz(date.getFullYear()) + '-' + cz(date.getMonth()) + '-' + cz(date.getDate()))

    function cz(i) {
      if (i === null) return 'x'
      if (i<10) {return '0' + i} else return i
    }
  }

  render() {
    const task = this.props.task || this.state.value

    return(
      <div>
        <label>Theme</label>
        <input defaultValue={task.title} name='title' onChange={this.handleChange} /> 
        <label>Task</label>
        <textarea defaultValue={task.theme} name='theme' onChange={this.handleChange} />
        <label>Due date</label>
        <input type='date' defaultValue={task.due_date || this.getDateNow()}
            min={this.getDateNow()} name='due_date' onChange={this.handleChange} />
        <ButtonGroup>
          {task.id ? <Buttons type='deleteTask' params={task.id} /> : ''}
          <Buttons type='closeTask'/>
          {+this.state.value.id
            ? <Buttons type='updateTask' params={this.state.value} />
            : <Buttons type='saveTask' params={this.state.value} />}
        </ButtonGroup>
      </div>
    )
  }
}

export default Task
