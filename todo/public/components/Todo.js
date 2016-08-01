import React , { Component, PropTypes } from 'react'
export default class Todo extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={this.props.completed} onChange={this.props.onClick} />
          <label>{this.props.text}</label>
          <button className="destroy"></button>
        </div>
        <input className="edit" defaultValue="Create a TodoMVC template" />
      </li>
    )
  }
}
Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}