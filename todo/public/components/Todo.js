import React , { Component, PropTypes } from 'react'

export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }
  doubleClick() {
    this.setState({edit: true})
    this.refs.edit.focus()
  }
  keyPress(e) {
    if (e.key === 'Enter') {
      const text = e.target.value.trim()
      if (!text.length) return false
      this.setState({edit: false})
      this.props.onEditTodo(this.props.index, text)
    } else if (e.key === 'Escape') {
      this.setState({edit: false})
      this.refs.edit.value = this.props.text
    }
  }
  blur(e) {
    const text = e.target.value.trim()
    if (!text.length) return false
    this.setState({edit: false})
    this.props.onEditTodo(this.props.index, text)
  }
  getClass() {
    let str = ''
    if (this.props.completed) {
      str += 'completed'
    }
    if (this.state.edit) {
      str += " editing"
    }
    return str
  }
  render() {
    return (
      <li className={this.getClass()}>
        <div className="view">
          <input className="toggle" type="checkbox" ref="check" checked={this.props.completed} onChange={() => {
            this.props.onChecked(this.props.index, this.refs.check.checked)
          }} />
          <label onDoubleClick={this.doubleClick.bind(this)}>{this.props.text}</label>
          <button className="destroy" onClick={() => {
            this.props.onTodoDeleted(this.props.index)
          }}></button>
        </div>
        <input className="edit" ref="edit" defaultValue={this.props.text} onKeyUp={this.keyPress.bind(this)} onBlur={this.blur.bind(this)} />
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