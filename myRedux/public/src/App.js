import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilter } from 'actions'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

class App extends Component {
  render() {
    //通过connect()注入
    const { dispatch, visibleTodos, visbilityFilter } = this.props
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          } />
        <TodoList
          todos={this.props.visibleTodos}
          onTodoClick={todo => 
            dispatch(completeTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    )
  }
}
App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.inRequired,
    completed: PropTypes.bool.isRequired
  })),
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
    visibleTodo: selectTodo(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}
//包装component，注入dispatch和state
export default connect(select)(App)