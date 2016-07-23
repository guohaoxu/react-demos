import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import 'whatwg-fetch'

class ContactsApp extends Component {
  constructor() {
    super()
    this.state = {
      filterText: '',
      contacts: [],
      isFetching: true
    }
  }
  componentDidMount() {
    fetch('/contactsApp')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({contacts: responseData, isFetching: false})
    }).catch((error) => {
      console.log('Error fetching and parsing data', error)
    })
  }
  handleUserInput(event) {
    this.setState({filterText: event.target.value})
  }
  render() {
    return (
      <div className="contacts-app">
        <input type="search" placeholder="search" value={this.state.filterText}
          onChange={this.handleUserInput.bind(this)} />
        <ContactList contacts={this.state.contacts} filterText={this.state.filterText} isFetching={this.state.isFetching} />
      </div>
    )
  }
}

class ContactList extends Component {
  render() {
    let filteredContacts = []
    //if (this.props.filterText.length) {
      filteredContacts = this.props.contacts.filter(
        (contact) => contact.name.indexOf(this.props.filterText) !== -1
      )
    //}
    let ulNode
    if (this.props.isFetching) {
      ulNode = <li>载入中，请稍后...</li>
    } else {
      if (filteredContacts.length) {
        ulNode = (
          filteredContacts.map((contact) => 
          <ContactItem key={contact.email} name={contact.name} email={contact.email} filterText={this.props.filterText} />
        ))
      } else {
        ulNode = <li>暂无数据...</li>
      }
    }
    return (
      <ul>
        {ulNode}
      </ul>
    )
  }
}
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired
}

class ContactItem extends Component {
  render() {
    let index = this.props.name.indexOf(this.props.filterText)
    let node = this.props.name.substr(0, index)
    let node2 = this.props.name.substr(index + this.props.filterText.length, this.props.name.length)
    return (
      <li>
        {node}
        <RedSpan filterText={this.props.filterText} />
        {node2}
        - {this.props.email}
      </li>
    )
  }
}
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired
}

class RedSpan extends Component {
  render() {
    return (
      <span className="red">{this.props.filterText}</span>
    )
  }
}
RedSpan.propTypes = {
  filterText: PropTypes.string.isRequired
}

render(
  <ContactsApp />,
  document.getElementById('content')
)