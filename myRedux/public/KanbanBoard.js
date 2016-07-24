import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import update from 'react-addons-update'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import 'whatwg-fetch'
import 'babel-polyfill'
import marked from 'marked'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

const API_URL = 'http://localhost:3000'
const API_HEADERS = {
  'Content-Type': 'application/json'
}
class KanbanBoard extends Component {
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
      console.log('Error fetching and parsing data', error)
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
      this.props.history.pushState(null, '/error')
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
        }}/>
        <List id="in-progress" title="In progress" cards={
          this.state.cards.filter((card) => card.status === "in-progress")
        } taskCallbacks={{
          add: this.addTask.bind(this),
          delete: this.deleteTask.bind(this),
          toggle: this.toggleTask.bind(this)
        }}/>
        <List id="done" title="Done" cards={
          this.state.cards.filter((card) => card.status === "done")
        } taskCallbacks={{
          add: this.addTask.bind(this),
          delete: this.deleteTask.bind(this),
          toggle: this.toggleTask.bind(this)
        }}/>
      </div>
    )
  }
}

class List extends Component {
  render() {
    var cards = this.props.cards.map((card, index) => {
      return <Card id={card.id}
        taskCallbacks={this.props.taskCallbacks}
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
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
}

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
class Card extends Component {
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
          <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
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
Card.propTypes = {
  id: PropTypes.number,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
}

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
render(
  <Router history={browserHistory}>
    <Route path="/" component={KanbanBoard}>
      <IndexRoute path="" component={Home} />
      <Route path="about" component={About} />
      <Route path="repos" component={Repos}>
        <Route path=":repo" title="haha" component={Repo} />
      </Route>
      <Route path="error" component={ServerError} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>,
  document.getElementById('content')
)