import React , { Component, PropTypes } from 'react'
export default class Todo extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input className="toggle" type="checkbox" ref="check" checked={this.props.completed} onChange={() => {
            this.props.onChecked(this.props.index, this.refs.check.checked)
          }} />
          <label>{this.props.text}</label>
          <button className="destroy" onClick={() => {
            this.props.onTodoDeleted(this.props.index)
          }}></button>
        </div>
        <input className="edit" defaultValue="Create a TodoMVC template" />
      </li>
    )
  }
}
Todo.propTypes = {
  onChecked: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
}