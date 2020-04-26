import React, { Component } from 'react'
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
    const cz = i => i < 10 ? '0' + i : i

    return (cz(date.getFullYear()) + '-' + cz(date.getMonth()) + '-' + cz(date.getDate()))
  }

  render() {
    const task = this.props.task || this.state.value
    console.log(task)

    return(
      <div>
        <label>Theme</label>
        <input defaultValue={task.title} name='title' onChange={this.handleChange} /> 
        <label>Task</label>
        <textarea defaultValue={task.theme} name='theme' onChange={this.handleChange} />
        <label>Up to</label>
        <input type='date' defaultValue={task.due_date.substr(0, 10) || this.getDateNow()}
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
