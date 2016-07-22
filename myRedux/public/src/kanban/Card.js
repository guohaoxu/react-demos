import React, { Component } from 'react'
import CheckList from './CheckList'
import marked from 'marked'

export default class Card extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      showDetails: false
    }
  }
  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails})
  }
  render() {
    let cardDetails
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card-details">
          <div dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
          <CheckList cardId={this.props.id} tasks={this.props.tasks} />
        </div>
      )
    }
    let sideColor = {
      backgroundColor: this.props.color
    }
    return (
      <div className="card">
        <div className="cardBorder" style={sideColor} />
        <div className={this.state.showDetails ? "card-title card-title-open" : "card-title"} 
          onClick={this.toggleDetails.bind(this)}>
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    )
  }
}