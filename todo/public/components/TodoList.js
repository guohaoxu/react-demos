import React, { Component, PropTypes } from 'react'
import Todo from './Todo'

export default class TodoList extends Component {
  ifAll() {
    let len = 0
    this.props.todos.map((todo, index) => {
      if (todo.completed) {
        len++
      }
    })
    if (this.props.todos.length && this.props.todos.length === len) {
      return true
    } else {
      return false
    }
  }
  checkAll() {
    this.props.todos.map((todo, index) => {
      this.props.onTodoChecked(index, !this.ifAll())
    })
  }
  render() {
    return (
      <section className="main">
				<input className="toggle-all" type="checkbox" checked={this.ifAll()} onChange={this.checkAll.bind(this)} />
				<label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {this.props.todos.map((todo, index) =>
            <Todo {...todo}
              key={index}
              index={index}
              onEditTodo={this.props.onEditTodo}
              onTodoDeleted={this.props.onTodoDeleted}
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