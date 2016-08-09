import React, { Component, PropTypes } from 'react'

export default class Article extends Component {
  render() {
    return (
      <div className="article-per">
          <div className="img-left wid64">
              <a href=`/u/${this.props.article.author}`><img src=`${this.props.}` alt="#" className="img-responsive"></a>
          </div>
          <div className="content-right">
              <div className="panel panel-default">
                  <div className="panel-heading"><a href="/u/<%= article.author %>"><%= article.author %></a></div>
                  <div className="panel-body">
                      <div className="article-title"><a href="/u/<%= article.author %>/<%= article.time.day %>/<%= article.title %>"><%= article.title %></a></div>
                      <div className="clearfix"><%- article.content %></div>
                      <div><small>日期： <%= article.time.minute %></small></div>
                  </div>
                  <div className="panel-footer clearfix">
                      <div className="pull-left">
                      <% if (article.tags) { %>
                          <span className="glyphicon glyphicon-tags"></span>
                          <% article.tags.forEach(function (tag, index) { %>
                              <% if (tag) { %>
                              <a href="/tags/<%= tag %>"><%= tag %></a>
                              <% }  %>
                          <% }) } %>
                      </div>
                      <div className="pull-right">阅读： <%= article.pv %> | <% if (article.comments) { %>评论： <%=  article.comments.length %><% } %></div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

Article.propTypes = {
  // login: PropTypes.func.isRequired
}

