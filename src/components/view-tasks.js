import React, {Component} from 'react';
import routes from '../config/routes-helper';
import globs from '../config/global-variables';
import Buttons from './buttons';
import { ButtonGroup } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      isOpen: false,
      doneTasks: [],
      notDoneTasks: [],
      taps: 0,
      selected: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  };

  componentDidUpdate() {
    if (this.state.taps !== +localStorage.getItem('taps')) {
      this.setState({ doneTasks: [], notDoneTasks: [] })
      this.getTasks()

      if (globs.ENV === 'test') {console.log('update!')}
      this.setState({taps: +localStorage.getItem('taps')})

      let checkboxes = document.getElementsByClassName('ch')
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false
      }  
    }  
  }

  componentDidMount() {
    this.getTasks();
    this.setState({taps: +localStorage.getItem('taps')})
  }

  handleInputChange(event) {
    let target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    let x = this.state.selected

    if (value) {    
      let cur = true;
      for (let i = 0; i < x.length; i++) {
        if (x[i] === name) {cur = false}
      }    
      if (cur) {x.push(name); this.setState({selected: x})}
    } else if (!value) {
      for (let i = 0; i < x.length; i++) {
        if (x[i] === name) {delete x[i]; this.setState({selected: x.filter(Boolean)})}
      }
    }
    localStorage.setItem('deleteTasks', this.state.selected.join('&'))
  }

  getTasks = () => {
    let myInit = 'access_token=' + localStorage.getItem('access_token')
    fetch(routes.tasksGet + '?' + myInit)
    .then(response => response.json())
    .then(data => {this.sortFunction(data)})
    .catch(error => this.setState({ error }))
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  cutDate = (d) => {
    if (!d) {
      return 'free'
    } else {
    let date = d.substr(0,10)
    return date
    }
  }

  sortFunction = (data) => {
    for (let key in data) {
      if(data[key]['is_done?'] === true) {
        this.state.doneTasks.push(data[key])
      } else {
        this.state.notDoneTasks.push(data[key])
      }
    }
    this.setState({isLoading: true})
  }


  render() {
    if (this.state.isLoading && !this.state.error 
    	  && (this.state.doneTasks.length || this.state.notDoneTasks.length)) {
      return(
        <div id='tasks'>
          <div className="notDoneTasks">
          {this.state.notDoneTasks.map((task, i) =>
            <ul className="list-group task" key={i}>
              <li className="list-group-item mr-2 list-group-item-secondary">
                <div className="float-left">
                  <input name={task.id} type="checkbox" className="ch" onChange={this.handleInputChange} />
                  <b>{task.title}</b><br/>
                  {task.theme}
                </div>
                <div className="text-right float-right">
                  <div className="d-inline">Due date: {this.cutDate(task.due_date)} </div>
                  <ButtonGroup>
                    <Buttons type='done' params={task.id} />
                    <Buttons type='editTask' params={i}/>
                    <Buttons type='deleteTask2' params={task.id}/>
                  </ButtonGroup>
                </div>
              </li>
            </ul>
          )}</div>

          <hr align="center" color="Red" />

          <div className="doneTasks">
          {this.state.doneTasks.map((task, i) =>
            <ul className="list-group task" key={i}>
              <li className="list-group-item mr-2 list-group-item-success">
                <div className="float-left">
                  <input name={task.id} type="checkbox" className="ch" onChange={this.handleInputChange} />
                  <b>{task.title}</b><br/>
                  {task.theme}
                </div>
                <div className="text-right float-right">
                  <div className="d-inline">Due date: {this.cutDate(task.due_date)} </div>
                  <ButtonGroup>
                    <Buttons type='notDone' params={task.id} /> 
                    <Buttons type='editTask' params={i}/>
                    <Buttons type='deleteTask2' params={task.id}/>
                  </ButtonGroup>
                </div>
              </li>
            </ul>
          )}</div>
        </div>
      )
    }
    if (this.state.isLoading && !(this.state.doneTasks.length 
    	  || this.state.notDoneTasks.length) && !this.state.error) {
      return(
        <div>
          <p>Creare you first task</p>
        </div>
      )
    }
    if (this.state.isLoading && this.state.error) {
      NotificationManager.info(this.state.error.toString(), '', 3000);
      return(null)
    } else {
      return(
        <div>
          <p>Wait</p>
        </div>
      )
    }    
  }
}

export default Article;