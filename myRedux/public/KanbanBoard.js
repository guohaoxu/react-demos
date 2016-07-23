import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import update from 'react-addons-update'
import 'whatwg-fetch'
import marked from 'marked'

const API_URL = 'http://localhost:3000'
const APT_HEADERS = {
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
    fetch(API_URL + '/kanban/cards', {headers: APT_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData, isFetching: false})
    }).catch((error) => {
      console.log('Error fetching and parsing data', error)
    })
  }
  render() {
    return (
      <div className="app">
        <List id="todo" title="To Do" cards={
          this.state.cards.filter((card) => card.status === "todo")
        } />
        <List id="in-progress" title="In progress" cards={
          this.state.cards.filter((card) => card.status === "in-progress")
        } />
        <List id="done" title="Done" cards={
          this.state.cards.filter((card) => card.status === "done")
        } />
        <div className={this.state.isFetching ? "load load-show" : "load"}>载入中，请稍后...</div>
      </div>
    )
  }
}

class List extends Component {
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

Card.propTypes = {
  id: PropTypes.number,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object)
}

class CheckList extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      showRemove: false
    }
  }
  render() {
    let tasks = this.props.tasks.map((task, index) => (
      <Li key={task.id} task={task} />
    ))
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input type="text" className="checklist-add-task"
          placeholder="Type then hit Enter to add a task" />
      </div>
    )
  }
}

class Li extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      showRemove: false
    }
  }
  render() {
    return (
      <li className="checklist-task"  onMouseOver={() => 
        this.setState({showRemove: true})} onMouseOut={() => 
          this.setState({showRemove: false})} >
        <label>
          <input type="checkbox" defaultChecked={this.props.task.done} />
          {this.props.task.name}
        </label>
        <a href="#" className={this.state.showRemove ? "checklist-task-remove" : "checklist-task-remove hide"} >x</a>
      </li>
    )
  }
}
CheckList.propTypes = {
  cardId: PropTypes.number,
  task: PropTypes.arrayOf(PropTypes.object)
}


render(
  <KanbanBoard />,
  document.getElementById('content')
)