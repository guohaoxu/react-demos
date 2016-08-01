import React, { Component, PropTypes } from 'react'
import Todo from './Todo'
export default class TodoList extends Component {
  checkAll() {
    this.props.todos.map((todo, index) => {
      this.props.onTodoChecked(index, true)
    })
  }
  render() {
    return (
      <section className="main">
				<input className="toggle-all" type="checkbox" onChange={this.checkAll.bind(this)} />
				<label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {this.props.todos.map((todo, index) =>
            <Todo {...todo}
              key={index}
              index={index}
              onChecked={this.props.onTodoChecked} />
          )}
        </ul>
      </section>
    )
  }
}
TodoList.propsTypes = {
  onTodoChecked: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}