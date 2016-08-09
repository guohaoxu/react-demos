import React, { Component, PropTypes } from 'react'
import Article from './Article'
export default class Tags extends Component {
  componentDidMount() {
    this.props.updateArticles({
      tag: this.props.params.tag
    })
  }
  render() {
    return (
      <div>
        <div className="my-tag-page"><span className="glyphicon glyphicon-tags my-tag-icon"></span>{this.props.params.tag}</div>
        {this.props.articles.map((article, index) => {
          return <Article article={article} key={index} />
        })}
      </div>
    )
  }
}