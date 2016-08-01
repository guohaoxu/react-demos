import React , { findDOMNode, Component, PropTypes } from 'react'
export default class AddTodo extends Component {
  render() {
    return (
      <header className="header">
				<h1>todos</h1>
				<input className="new-todo" placeholder="What needs to be done?" ref="input" onKeyPress={e => this.handlePress(e)} />
			</header>
    )
  }
  handlePress(e) {
    if (e.key === 'Enter') {
      const node = this.refs.input
      const text = node.value.trim()
      if (!text.length) return false
      this.props.onAddPress(text)
      node.value = ''
    }
  }
}
AddTodo.propTypes = {
  onAddPress: PropTypes.func.isRequired
}