import React, { Component } from 'react'

export default class CheckList extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      showRemove: false
    }
  }
  render() {
    let tasks = this.props.tasks.map((task, index) => (
      <Li key={index} task={task} />
    ))
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
      </div>
    )
  }
}

class Li extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      showRemove: false
    }
  }
  render() {
    return (
      <li className="checklist-task"  onMouseOver={() => 
        this.setState({showRemove: true})} onMouseOut={() => 
          this.setState({showRemove: false})} >
        <label>
          <input type="checkbox" defaultChecked={this.props.task.done} />
          {this.props.task.name}
        </label>
        <a href="#" className={this.state.showRemove ? "checklist-task-remove" : "checklist-task-remove hide"} >x</a>
      </li>
    )
  }
}