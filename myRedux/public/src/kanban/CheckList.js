import React, { Component, PropTypes } from 'react'

export default class CheckList extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      showRemove: false
    }
  }
  render() {
    let tasks = this.props.tasks.map((task, index) => (
      <Li key={task.id} task={task} />
    ))
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input type="text" className="checklist-add-task"
          placeholder="Type then hit Enter to add a task" />
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

CheckList.propTypes = {
  cardId: PropTypes.number,
  task: PropTypes.arrayOf(PropTypes.object)
}