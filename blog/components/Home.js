import React, { Component, PropTypes } from 'react'
import Article from './Article'

export default class Home extends Component {
  render() {
    var articles
    if (this.props.articles.length) {
      articles = this.props.articles.map((article, index) => {
       return <Article key={index} article={article} />
     })
   } else {
     articles = <div>暂无文章</div>
   }
     
    return (
      <div>{articles}</div>
    )
  }
}

Home.propTypes = {
  // articles: PropTypes.array.isRequired
}