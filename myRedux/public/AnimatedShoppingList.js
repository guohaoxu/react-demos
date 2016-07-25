import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class AnimatedShoppingList extends Component {
  constructor() {
    super()
    this.state = {
      items: [
        {id: 1, name: 'Milk'},
        {id: 2, name: 'Yogurt'},
        {id: 3, name: 'Orange Juice'}
      ]
    }
  }
  handleChange(event) {
    if (event.key === 'Enter') {
      let newItem = {id: Date.now(), name: event.target.value}
      let newItems = this.state.items.concat(newItem)
      event.target.value = ''
      this.setState({items: newItems})
    }
  }
  handleRemove(i) {
    let newItems = this.state.items
    newItems.splice(i, 1)
    this.setState({items: newItems})
  }
  render() {
    let shoppingItems = this.state.items.map((item, i) => (
      <div key={item.id}
        className="item"
        onClick={this.handleRemove.bind(this, i)}>
        {item.name}
      </div>
    ))
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}>
          {shoppingItems}
        </ReactCSSTransitionGroup>
        <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)} />
      </div>
    )
  }
}

render(
  <AnimatedShoppingList />,
  document.getElementById("content")
)