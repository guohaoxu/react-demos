import React, { Component, PropTypes } from 'react'
import Article from './Article'
export default class Tags extends Component {
  render() {
    return (
      <div>
        <div class="my-tag-page"><span class="glyphicon glyphicon-tags my-tag-icon"></span>{this.props.params.tag}</div>
        {this.props.articles.map((article, index) => {
          return <Article article={article} key={index} />
        })}
      </div>
    )
  }
}