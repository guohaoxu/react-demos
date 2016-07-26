import React, { PropTypes, Component } from 'react'
import { DropTarget } from 'react-dnd'

const ShoppingCartSpec = {
  drop() {
    return {
      name: "ShoppingCart"
    }
  }
}
let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOVer: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}
class ShoppingCart extends Component {
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
export default DropTarget("snack", ShoppingCartSpec, collect)(ShoppingCart)