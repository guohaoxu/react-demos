import React, { Component, PropTypes } from 'react'

export default class Footer extends Component {
  getTodoLeft() {
    return this.props.todos.filter((todo) => {
      return todo.completed === false
    }).length
  }
  ifCompleted() {
    return this.props.todos.filter((todo) => {
      return todo.completed === true
    }).length > 0
  }
  render() {
    return (
      <footer className={this.props.todos.length ? "footer": "hidden"}>
				<span className="todo-count"><strong>{this.getTodoLeft()}</strong> item left</span>
				<ul className="filters">
					<li>
						<a className={this.props.filter === "SHOW_ALL" ? "selected" : ""} href="#/" onClick={(e) => {
              e.preventDefault()
              this.props.onFilterChange('SHOW_ALL')
            }}>All</a>
					</li>
					<li>
						<a className={this.props.filter === "SHOW_ACTIVE" ? "selected" : ""} href="#/active" onClick={(e) => {
              e.preventDefault()
              this.props.onFilterChange('SHOW_ACTIVE')
            }}>Active</a>
					</li>
					<li>
						<a className={this.props.filter === "SHOW_COMPLETED" ? "selected" : ""} href="#/completed" onClick={(e) => {
              e.preventDefault()
              this.props.onFilterChange('SHOW_COMPLETED')
            }}>Completed</a>
					</li>
				</ul>
        <button className={this.ifCompleted() ? "clear-completed" : "hidden"} onClick={this.props.onClearCompleted}>Clear completed</button>
			</footer>
    )
  }
}
Footer.propTypes = {
  onFilterChange:PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}