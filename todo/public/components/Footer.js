import React, { Component, PropTypes } from 'react'
export default class Footer extends Component {
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name
    }
    return (
      <a href='#' onClick={e => {
        e.preventDefault()
        this.props.onFilterChange(filter)
      }}>
        {name}
      </a>
    )
  }
  render() {
    return (
      // <p>
      //   Show:
      //   {' '}
      //   {this.renderFilter('SHOW_ALL', 'ALL')}
      //   {', '}
      //   {this.renderFilter('SHOW_COMPLETED', 'Completed')}
      //   {', '}
      //   {this.renderFilter('SHOW_ACTIVE', 'Active')}
      //   .
      // </p>
      <footer className="footer">
      
				<span className="todo-count"><strong>0</strong> item left</span>
				<ul className="filters">
					<li>
						<a className="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
			</footer>
    )
  }
}
Footer.propTypes = {
  onFilterChange:PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}