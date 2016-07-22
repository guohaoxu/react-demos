import React, { Component } from 'react'
import CheckList from './CheckList'

export default class Card extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      showDetails: false
    }
  }
  toggleDetails() {
    this.setState({showDetail: !this.state.showDetails})
  }
  render() {
    let cardDetails
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card-details">
          {this.props.description}
          <CheckList cardId={this.props.id} tasks={this.props.tasks} />
        </div>
      )
    }
    return (
      <div className="card">
        <div className={this.state.showDetails ? "card-title card-title-open" : "card-title"} 
          onClick={this.toggleDetails.bind(this)}>
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    )
  }
}