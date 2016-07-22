import React, { Component } from 'react'
import { render } from 'react-dom'

export default class Search extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      searchTerm: "React"
    }
  }
  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }
  render() {
    return (
      <div>
        Search Term: <input type="search" defaultValue={this.state.searchTerm}
          onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}