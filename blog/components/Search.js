import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Timeago from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import zhString from 'react-timeago/lib/language-strings/zh-CN'

const formatter = buildFormatter(zhString)

export default class Search extends Component {
  componentDidMount() {
    this.props.updateArticles({keyword: this.props.location.query.keyword})
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('---componentWillUpdate-------')
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('---componentDidUpdate-------')
  }
  render() {
    var k_reg = new RegExp(this.props.location.query.keyword, 'i')
    return (
      <ul className="list-group my-search">
        {this.props.articles.map((article, index) => {
          var title2 = article.title.replace(k_reg, `<span class="keyword">${this.props.location.query.keyword}</span>`)
          return  <li key={index} className="list-group-item clearfix">
            <div className="pull-left"><Link to={`/articles/${article._id}`} dangerouslySetInnerHTML={{__html: title2}} /> - 作者: <Link to={`/u/${article.author}`}>{article.author}</Link></div>
            <div className="pull-right"><small><Timeago date={article.time} formatter={formatter} /></small></div>
          </li>
        })}
      </ul>
    )
  }
}
