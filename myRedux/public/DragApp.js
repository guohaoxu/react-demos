import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { DragDropContext, DropTarget, DragSource } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class Container extends Component {
  render() {
    return (
      <div>
        <Snack name="chips" />
        <Snack name="Cupcake" />
        <Snack name="Dount" />
        <Snack name="Doritos" />
        <Snack name="Poppcorn" />
        <ShoppingCart />
        <Div>test_1</Div>
        <Div>test_2</Div>
      </div>
    )
  }
}

// dragTarget ShoppingCart ---------------------------------------------------------
const ShoppingCartSpec = {
  drop() {
    return {
      name: "ShoppingCart"
    }
  }
}
let ShoppingCartCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOVer: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}
class ShoppingCart_dnd extends Component {
  render() {
    const { canDrop, isOVer, connectDropTarget } = this.props
    const isActive = canDrop && isOVer
    
    let backgroundColor = '#fff'
    if (isActive) {
      backgroundColor = '#f7f7bd'
    } else if (canDrop) {
      backgroundColor = '#f7f7f7'
    }
    
    const style={
      backgroundColor: backgroundColor
    }
    return connectDropTarget(
      <div className="shopping-cart" style={style}>
        {isActive ? 'Hummm, snack!' : 'Drag here to order!'}
      </div>
    )
  }
}
let ShoppingCart = DropTarget(["Snack", "Div"], ShoppingCartSpec, ShoppingCartCollect)(ShoppingCart_dnd)

// dragSource Snack ---------------------------------------------------------
const SnackSpec = {
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
let SnackCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
class Snack_dnd extends Component {
  render() {
    const { name, isDragging, connectDragSource } = this.props
    const opacity = isDragging ? 0.4 : 1
    const style = {
      opacity: opacity
    }
    return connectDragSource(
      <div className='snack' style={style}>
        {name}
      </div>
    )
  }
}
Snack_dnd.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,  
  name: PropTypes.string.isRequired
}
let Snack = DragSource('Snack', SnackSpec, SnackCollect)(Snack_dnd)

// dragSource Div ---------------------------------------------------------
class Div_dnd extends Component {
  render() {
    const { name, isDragging, connectDragSource } = this.props
    const opacity = isDragging ? 0.4 : 1
    const style = {
      opacity: opacity
    }
    return connectDragSource(
      <div className="testDrag">
        Haha..{this.props.children}
      </div>
    )
  }
}
let Div = DragSource('Div', SnackSpec, SnackCollect)(Div_dnd)

let DragApp = DragDropContext(HTML5Backend)(Container)
render(
  <DragApp />,
  document.getElementById('content')
)