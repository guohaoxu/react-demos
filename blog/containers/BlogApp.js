import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import update from 'react-addons-update'
import 'whatwg-fetch'
import 'babel-polyfill'

import Header from '../components/Header'

const API_URL = 'http://localhost:3000'
const API_HEADERS = {
  'Content-Type': 'application/json'
}

export default class BlogApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: window.username
      }
    }
  }
  editState(o) {
    this.setState({
      user: {
        username: o
      }
    })
    browserHistory.push('/')
  }
  showTip(text) {
    var node = document.getElementById('tip-route')
    node.innerHTML = text
  }
  render() {
    var propsChildren = this.props.children && React.cloneElement(this.props.children, {
      editState: this.editState.bind(this),
      showTip: this.showTip.bind(this)
    })
    return (
      <div>
        <Header nav={this.props.location.pathname} user={this.state.user} showTip={this.showTip.bind(this)} />
        <div className="container main-content">{propsChildren}</div>
        <footer>
          <div className="container">
            <p>友情链接： <a href="https://www.github.com/" target="_blank">github</a> | <a href="https://nodejs.org/en/" target="_blank">Node.js</a> | <a href="https://www.npmjs.com/" target="_blank">npmjs</a></p>
            <p>Copyright &copy; 2016 <a href="https://github.com/guohaoxu" target="_blank">@guohaoxu</a>.</p>
          </div>
        </footer>
        <div id="tip-route">请输入标题</div>
        <div id="upTop" className="btn btn-default"><span className="glyphicon glyphicon-menu-up"></span></div>
      </div>
    )
  }
}
