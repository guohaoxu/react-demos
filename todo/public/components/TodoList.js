import React, { Component, PropTypes } from 'react'
import Todo from './Todo'
export default class TodoList extends Component {
  render() {
    return (
      <section className="main">
				<input className="toggle-all" type="checkbox" />
				<label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {this.props.todos.map((todo, index) =>
            <Todo {...todo}
              key={index}
              onClick={() => this.props.onTodoClick(index)} />
          )}
        </ul>
      </section>
    )
  }
}
TodoList.propsTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}