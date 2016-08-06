import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import fetch from 'isomorphic-fetch'

const API_URL = 'http://localhost:3000'
const API_HEADERS = {
  'Content-Type': 'application/json'
}

export default class Reg extends Component {
  handleReg(e) {
    e.preventDefault()
    var reqBody = {
      username: this.refs.username.value.trim(),
      password: this.refs.password.value.trim(),
      password_re: this.refs.password_re.value.trim()
    }
    fetch(`${API_URL}/api/reg`, {
      method: 'post',
      headers: API_HEADERS,
      credentials: 'include',
      body: JSON.stringify(reqBody)
    })
    .then(response => response.json())
    .then(responseData => {
      if (!responseData.success) {
        this.props.showTip(responseData.text)
      } else {
        this.props.editState(responseData.username)
      }
    })
    .catch((error) => {
      browserHistory.push('/error')
    })
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <form method="post" action="/api/reg" method="post" onSubmit={this.handleReg.bind(this)}>
            <div className="panel panel-default">
              <div className="panel-heading">注册</div>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="regName">用户名：</label>
                  <input type="text" name="username" ref="username" className="form-control" id="regName" placeholder="用户名" />
                </div>
                <div className="form-group">
                  <label htmlFor="regPw">密码：</label>
                  <input type="password" name="password" ref="password" className="form-control" id="regPw" placeholder="密码" />
                </div>
                <div className="form-group">
                  <label htmlFor="regPwre">确认密码：</label>
                  <input type="password" name="password_re" ref="password_re" className="form-control" id="regPwre" placeholder="确认密码" />
                </div>
              </div>
              <div className="panel-footer"><button type="submit" className="btn btn-default">注册</button></div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Reg.propTypes = {
  showTip: PropTypes.func,
  editState: PropTypes.func
}