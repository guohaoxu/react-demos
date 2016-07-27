import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import update from 'react-addons-update'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import 'whatwg-fetch'
import 'babel-polyfill'
import marked from 'marked'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { DragDropContext, DropTarget, DragSource } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { throttle } from './utils'

const API_URL = 'http://localhost:3000'
const API_HEADERS = {
  'Content-Type': 'application/json'
}
class KanbanBoard_dnd extends Component {
  constructor() {
    super()
    this.state = {
      cards: [],
      isFetching: true
    }
  }
  componentDidMount() {
    fetch(API_URL + '/cards', {
      method: 'get',
      headers: API_HEADERS
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData, isFetching: false})
    }).catch((error) => {
      console.error('Error fetching and parsing data', error)
    })
  }
  addTask(cardId, taskName) {
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId)
    let newTask = {id: Date.now(), name: taskName, done: false}
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$push: [newTask]}
      }
    })
    let prevState = this.state
    this.setState({cards: nextState})
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (!responseData.success) {
        throw new Error('Server response wasn\'t success')
      }
    })
    .catch((error) => {
      console.error("Fetch error: ", error)
      this.setState(prevState)
      this.props.history.push(null, '/error')
    })
  }
  deleteTask(cardId, taskId, taskIndex) {
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId)
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$splice: [[taskIndex, 1]]}
      }
    })
    this.setState({cards: nextState})
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskIndex}`, {
      method: 'delete',
      headers: API_HEADERS
    })
  }
  toggleTask(cardId, taskId, taskIndex) {
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId)
    let newDoneValue
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {$apply: (done) => {
              newDoneValue = !done
              return newDoneValue
            }}
          }
        }
      }
    })
    this.setState({cards: nextState})
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskIndex}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done: newDoneValue})
    })
  }
  updateCardStatus(cardId, listId) {
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId)
    let card = this.state.cards[cardIndex]
    if (card.status !== listId) {
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: listId }
          }
        }
      }))
    }
    fetch(`${API_URL}/cards/${cardId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({
        newStatus: listId
      })
    })
  }
  updateCardPosition(cardId, afterId) {
    if (cardId !== afterId) {
      let cardIndex = this.state.cards.findIndex((card => card.id == cardId))
      let card = this.state.cards[cardIndex]
      let afterIndex = this.state.cards.findIndex((card) => card.id === afterId)
      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }))
      fetch(`${API_URL}/cards/updatePosition`, {
        method: 'post',
        headers: API_HEADERS,
        body: JSON.stringify({
          cardId: cardId,
          afterId: afterId
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        if (!responseData.success) {
          throw new Error('Server response wasn\'t success')
        }
      })
      .catch((error) => {
        console.error("Fetch error: ", error)
        this.props.history.push(null, '/error')
      })
    }
  }
  render() {
    return (
      <div className="app">
        <div className={this.state.isFetching ? "load load-show" : "load"}>载入中，请稍后...</div>
        <menu>
          <ul>
            <li><Link to="/about" activeClassName="active">About</Link></li>
            <li><Link to="/repos" activeClassName="active">Repos</Link></li>
            <li><Link to="/repos/abc" activeClassName="active">test</Link></li>
          </ul>
        </menu>
        {this.props.children}
        <List id="todo" title="To Do" cards={
          this.state.cards.filter((card) => card.status === "todo")
        } taskCallbacks={{
          add: this.addTask.bind(this),
          delete: this.deleteTask.bind(this),
          toggle: this.toggleTask.bind(this)
        }}
        cardCallbacks={{
          updateStatus: throttle(this.updateCardStatus.bind(this)),
          updatePosition: throttle(this.updateCardPosition.bind(this), 500)
        }}/>
        <List id="in-progress" title="In progress" cards={
          this.state.cards.filter((card) => card.status === "in-progress")
        } taskCallbacks={{
          add: this.addTask.bind(this),
          delete: this.deleteTask.bind(this),
          toggle: this.toggleTask.bind(this)
        }}
        cardCallbacks={{
          updateStatus: throttle(this.updateCardStatus.bind(this), 500),
          updatePosition: throttle(this.updateCardPosition.bind(this), 500)
        }}/>
        <List id="done" title="Done" cards={
          this.state.cards.filter((card) => card.status === "done")
        } taskCallbacks={{
          add: this.addTask.bind(this),
          delete: this.deleteTask.bind(this),
          toggle: this.toggleTask.bind(this)
        }}
        cardCallbacks={{
          updateStatus: throttle(this.updateCardStatus.bind(this)),
          updatePosition: throttle(this.updateCardPosition.bind(this), 500)
        }}/>
      </div>
    )
  }
}
let KanbanBoard = DragDropContext(HTML5Backend)(KanbanBoard_dnd)

const ListSpec = {
  drop(props, monitor) {
    const draggedId = monitor.getItem().id
    props.cardCallbacks.updateStatus(draggedId, props.id)
  }
}
let ListCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOVer: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}
class List_dnd extends Component {
  render() {
    const { canDrop, isOVer, connectDropTarget } = this.props
    const isActive = canDrop && isOVer
    
    let backgroundColor = ''
    if (isActive) {
      backgroundColor = '#f8f8f8'
    } else if (canDrop) {
      backgroundColor = '#e8e8e8'
    }
    const style={
      backgroundColor: backgroundColor
    }
    
    var cards = this.props.cards.map((card, index) => {
      return <Card id={card.id}
        taskCallbacks={this.props.taskCallbacks}
        cardCallbacks={this.props.cardCallbacks}
        key={card.id}
        title={card.title}
        description={card.description}
        color={card.color}
        tasks={card.tasks} />
    })
    return connectDropTarget(
      <div className="list" style={style}>
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    )
  }
}
List_dnd.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDropTarget: PropTypes.func.isRequired
}
let List = DropTarget("Card", ListSpec, ListCollect)(List_dnd)

let titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName];
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in ${componentName} is not string or longer than 80 characters`
      )
    }
  }
}

//dnd
const CardDragSpec = {
  beginDrag(props) {
    return {
      id: props.id
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
let CardDragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
const CardDropSpec = {
  drop(props, monitor) {
    const draggedId = monitor.getItem().id
    props.cardCallbacks.updatePosition(draggedId, props.id)
  }
}
let CardDropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}
class Card_dnd extends Component {
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
    const { name, isDragging, connectDragSource, connectDropTarget } = this.props
  
    const opacity = isDragging ? 0.4 : 1
    let style = {
      opacity: opacity
    }
    let cardDetails
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card-details">
          <div dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
          <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
        </div>
      )
    }
    let sideColor = {
      backgroundColor: this.props.color
    }
    return connectDropTarget(connectDragSource(
      <div className="card" style={style}>
        <div className="cardBorder" style={sideColor} />
        <div className={this.state.showDetails ? "card-title card-title-open" : "card-title"} 
          onClick={this.toggleDetails.bind(this)}>
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    ))
  }
}
Card_dnd.propTypes = {
  id: PropTypes.number,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
}
let CardDrag = DragSource("Card", CardDragSpec, CardDragCollect)(Card_dnd)
let Card = DropTarget("Card", CardDropSpec, CardDropCollect)(CardDrag)

class CheckList extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      showRemove: false
    }
  }
  inputKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.taskCallbacks.add(this.props.cardId, event.target.value)
      event.target.value = ''
    }
  }
  render() {
    let tasks = this.props.tasks.map((task, taskIndex) => (
      <li key={task.id} className="checklist-task">
        <label>
          <input type="checkbox" defaultChecked={task.done}
            onChange={
              this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)
            } />
          {task.name}
        </label>
        <a href="javascript:;" className="checklist-task-remove" onClick={
          this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)
        }>x</a>
      </li>
    ))
    return (
      <div className="checklist">
        <ul>
          <ReactCSSTransitionGroup transitionName="example"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={300}>
            {tasks}
          </ReactCSSTransitionGroup>
        </ul>
          <input type="text" className="checklist-add-task"
            placeholder="Type then hit Enter to add a task"
            onKeyPress={
              this.inputKeyPress.bind(this)
            } />
      </div>
    )
  }
}

CheckList.propTypes = {
  cardId: PropTypes.number,
  task: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
}

class About extends Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This is about route.</p>
      </div>
    )
  }
}
class Repos extends Component {
  render() {
    return (
      <div>
        <h1>Repos</h1>
        <p>This is repos route.</p>
        <h3>{this.props.children}</h3>
      </div>
    )
  }
}
class Home extends Component {
  render() {
    return (
      <div>
        <h1>Repos</h1>
        <p>This is home route.</p>
      </div>
    )
  }
}
class NoMatch extends Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <p>Ops.</p>
      </div>
    )
  }
}
class ServerError extends Component {
  render() {
    return (
      <div>
        <h1>500</h1>
        <p>Ops.Server is down...</p>
      </div>
    )
  }
}
class Repo extends Component {
  render() {
    return (
      <div>
        <p>"this.props.route.title:" {this.props.route.title}</p>
        <p>"this.props.params.repo:" {this.props.params.repo}</p>
      </div>
    )
  }
}

class CardForm extends Component {
  handleChange(field, event) {
    this.props.handleChange(field, event.target.value)
  }
  handleClose(event) {
    event.preventDefault()
    this.props.handleClose()
  }
  render() {
    return (
      <div>
        <div className="card_form">
          <form onSubmit={this.props.handleSubmit.bind(this)}>
            <input type="text"
              value={this.props.draftCard.title}
              onChange={this.handleChange.bind(this, "title")}
              placeholder="Title"
              required={true}
              autoFocus={true} />
            <textarea value={this.props.draftCard.description}
              onChange={this.handleChange.bind(this, "description")}
              placeholder="description"
              required={true} />
            <label htmlFor="status">Status</label>
            <select id="status"
              value={this.props.draftCard.status}
              onChange={this.handleChange.bind(this, "status")}>
              <option value="todo">To Do</option>
              <option value="in-proogress">In Propgress</option>
              <option value="done">Done</option>
            </select>
            <br />
            <label htmlFor="color">Color</label>
            <input id="color"
              value={this.props.draftCard.color || "#f00"}
              onChange={this.handleChange.bind(this, "color")}
              type="color" />
            <div className="actions">
              <button type="submit">{this.props.buttonLabel}</button>
            </div>
          </form>
        </div>
        <div className="overlay" onClick={this.handleClose.bind(this)}></div>
      </div>
    )
  }
}
CardForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  draftCard: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}

class NewCard extends Component {
  componentWillMount() {
    this.setState({
      id: Date.now(),
      title: '',
      description: '',
      status: 'todo',
      color: '#c9c9c9',
      tasks: []
    })
  }
  handleChange(field, value) {
    this.setState({
      [field]: value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.cardCallbacks.addCard(this.state)
    this.props.history.push(null, '/')
  }
  handleClose(event) {
    this.props.history.push(null, '/')
  }
  render() {
    return (
      <CardForm draftCard={this.state}
        buttonLabel="Create Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)} />
    )
  }
}
NewCard.propTypes = {
  cardCallbacks: PropTypes.object
}

class EditCard extends Component {
  componentWillMount() {
    let card = this.props.card.find((card) => card.id == this.props.params.card_id)
    this.setState({...card})
  }
  handleChange(field, value) {
    this.setState({[field]: value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.cardCallbacks.updateCard(this.state)
    this.props.history.push(null, '/')
  }
  handleClose(event) {
    this.props.hidtory.push(null, '/')
  }
  render() {
    return (
      <CardForm draftCard={this.state}
        buttonLabel="Edit Card"
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleClose={this.handleClose.bind(this)} />
    )
  }
}
EditCard.propTypes = {
  cardCallbacks: PropTypes.object
}


render(
  <Router history={browserHistory}>
    <Route path="/" component={KanbanBoard}>
      <Route path="about" component={About} />
      <Route path="new" component={NewCard} />
      <Route path="edit/:card_id" component={EditCard} />
      <Route path="error" component={ServerError} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>,
  document.getElementById('content')
)