import React, { Component, PropTypes } from 'react'
import Article from './Article'


var imgsrc = '/static/imgs/default.jpg'
  
export default class User extends Component {
  componentDidMount() {
    this.props.updateArticles(this.props.params.username)
  }
  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body clearfix">
            <img src={imgsrc} className="img-responsive img-rounded pull-left wid120 right20" />
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