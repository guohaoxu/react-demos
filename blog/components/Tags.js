import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Article from './Article'
export default class Tags extends Component {
  render() {
    return (
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>标签</th>
            <th>文章数</th>
            <th>最近更新</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tags.map((tag, index) => {
            return <tr key={index}>
              <td><Link to={`/tags/${tag}`}>{tag}</Link></td>
              <td>{tag}</td>
              <td><Link to={`/tags/${tag}`}>{tag}</Link></td>
            </tr>
          })}
        </tbody>
      </table>
    )
  }
}