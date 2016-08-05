import React, { Component, PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux'
import { addTodo, deleteTodo, toggleTodo, editTodo, setVisibilityFilter, VisibilityFilters, clearCompleted } from '../actions'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Footer from './Footer'

class App extends Component {
  render() {
    //通过connect()注入
    const { dispatch, visibleTodos, visibilityFilter } = this.props
    return (
      <section className="todoapp">
        <AddTodo
          onAddPress={text =>
            dispatch(addTodo(text))
          } />
        <TodoList
          todos={this.props.visibleTodos}
          onTodoDeleted={(index) => {
            dispatch(deleteTodo(index))
          }}
          onEditTodo={(index, text) => {
            dispatch(editTodo(index, text))
          }}
          onTodoChecked={(index, ifCompleted) => 
            dispatch(toggleTodo(index, ifCompleted))
          } />
        <Footer
          todos={this.props.visibleTodos}
          filter={visibilityFilter}
          onClearCompleted={() => {
            dispatch(clearCompleted())
          }}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </section>
    )
  }
}
App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.inRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

//redux
function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}
//基于全局state注入props
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}
//包装component，注入dispatch和state
export default connect(select)(App)