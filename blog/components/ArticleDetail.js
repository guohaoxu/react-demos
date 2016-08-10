import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import Article from './Article'
import Timeago from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import zhString from 'react-timeago/lib/language-strings/zh-CN'

const formatter = buildFormatter(zhString)

const API_URL = window.ctx || 'http://localhost:3000'
const API_HEADERS = {
  'Content-Type': 'application/json'
}

export default class ArticleDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {}
    }
  }
  fetchData(o) {
    fetch(`${API_URL}/api/articles?_id=${o._id}`, {
      method: 'get',
      headers: API_HEADERS,
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({article: responseData.data[0]})
    })
    .catch((error) => {
      browserHistory.push('/error')
    })
  }
  componentDidMount() {
    this.fetchData({_id: this.props.params._id})
  }
  render() {
    var articleDetail,
      adminNode
    if (this.state.article.author === this.props.user.username) {
      adminNode = <div className="pull-right user-article">
        <Link to={`/edit/${this.state.article._id}`}>
        <span className="glyphicon glyphicon-edit"></span> 编辑</Link> |
        <a href="javascript:;"><span className="glyphicon glyphicon-remove"></span> 删除</a>
      </div>
    }
    if (!this.state.article.author) {
      articleDetail = <div>loading...</div>
    } else {
      articleDetail = <Article article={this.state.article}>
        {adminNode}
      </Article>
    }
    return (
      <div>{articleDetail}</div>
    )
  }
}
