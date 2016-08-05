import React, { Component } from 'react'

export default class Error extends Component {
  render() {
    return (
      <div className="error-route">
        <h1>500</h1>
        <p>Oops.Server is down...</p>
      </div>
    )
  }
}