import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { DragDropContext, DropTarget, DragSource } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class DragApp extends Component {
  render() {
    return (
      <div>
        <e_snack name='Chips' />
        <e_snack name='Cupcake' />
        <e_snack name='Donut' />
        <e_snack name='Doritos' />
        <e_snack name='Popcorn' />
        <e_ShoppingCart />
      </div>
    )
  }
}

const ShoppingCartSpec = {
  drop() {
    return { name: 'ShoppingCart' }
  }
}
let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}
class ShoppingCart extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOVer
    let backgroundColor = '#fff'
    if (isActive) {
      backgroundColor = '#f7f7bd'
    } else if (canDrop) {
      backgroundColor = '#f7f7f7'
    }
    const style = {
      backgroundColor: backgroundColor
    }
    return (
      connectDropTarget(
        <div className="shopping-cart" style={style}>
          {isActive ? 'Hummmm, snack!' : 'Drag here to order!'}
        </div>
      )
    )   
  }
}
ShoppingCart.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOVer: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}
let e_ShoppingCart = DropTarget("snack", ShoppingCartSpec, collect)(ShoppingCart)

// ------------------------------
const snackSpec = {
  beginDrag(props) {
    return {
      name: props.name
    }
  },
  endDrag(props, monitor) {
    const dragItem = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (dropResult) {
      console.log(`You dropped ${dragItem.name} into ${dropResult.name}`)
    }
  }
}
let snackCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
class Snack extends Component {
  render() {
    const { name, isDragging, connectDragSource } = this.props
    const opacity = isDragging ? 0.4 : 1
    const style = {
      opacity: opacity
    }
    return (
      connectDragSource(
        <div ClassName="snack" style={style}>
          {name}
        </div>
      )
    )
  }
}
Snack.propTypes = {
  name: PropTypes.string.isRequired
}
let e_snack = DragSource('snack', snackSpec, snackCollect)(Snack)

let Container = DragDropContext(HTML5Backend)(DragApp)

render (
  <Container />,
  document.getElementById('content')
)