import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Article from './Article'


var imgsrc = '/static/imgs/default.jpg'

export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }
  componentDidMount() {
    this.props.updateArticles({username: this.props.params.username})

    const API_URL = window.ctx || 'http://localhost:3000'
    const API_HEADERS = {
      'Content-Type': 'application/json'
    }
    fetch(`${API_URL}/api/user?u=${this.props.params.username}`, {
      method: 'get',
      headers: API_HEADERS,
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseData => {
      if (!responseData.success) {
       this.showTip(responseData.text)
      } else {
        this.setState({user: responseData.data})
      }
    })
    .catch((error) => {
      browserHistory.push('/error')
    })
  }
  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body clearfix">
            <img src={`${window.ctx}/uploads/${this.state.user.tx}`} className="img-responsive img-rounded pull-left wid120 right20" />
            <h2>{this.props.params.username}</h2>
            <p>aaaaaaaaa</p>
          </div>
        </div>
        {this.props.articles.map((article, index) => {
          return <Article key={index} article={article} />
        })}
      </div>
    )
  }
}

User.propTypes = {
  // articles: PropTypes.array.isRequired
}
