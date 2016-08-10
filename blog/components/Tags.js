import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Article from './Article'
export default class Tags extends Component {
  componentDidMount() {
    this.props.getTags()
  }
  render() {
    return (
      <table className="table table-striped table-bordered">
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
              <td><Link to={`/tags/${tag.tagName}`}>{tag.tagName}</Link></td>
              <td>{tag.count}</td>
              <td><Link to={`/u/${tag.lastUser}`}>{tag.lastUser}</Link></td>
            </tr>
          })}
        </tbody>
      </table>
    )
  }
}
