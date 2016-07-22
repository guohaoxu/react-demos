import React, { Component, PropTypes } from 'react'
import Card from './Card'

export default class List extends Component {
  render() {
    var cards = this.props.cards.map((card, index) => {
      return <Card id={card.id}
        key={card.id}
        title={card.title}
        description={card.description}
        color={card.color}
        tasks={card.tasks} />
    })
    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    )
  }
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object)
}