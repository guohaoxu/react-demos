import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Timeago from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import zhString from 'react-timeago/lib/language-strings/zh-CN'

const formatter = buildFormatter(zhString)

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: this.props.location.query.keyword
    }
  }
  componentDidMount() {
    this.props.updateArticles({keyword: this.state.keyword})
  }
  render() {
    return (
      <ul className="list-group my-search">
        {this.props.articles.map((article, index) => 
          <li key={index} className="list-group-item clearfix">
            <div className="pull-left"><Link to={`/articles/${article._id}`}>{article.title}</Link> - 作者: <Link to={`/u/${article.author}`}>{article.author}</Link></div>
            <div className="pull-right"><small><Timeago date={article.time} formatter={formatter} /></small></div>
          </li>
        )}
      </ul>
    )
  }
}
