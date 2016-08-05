import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <form method="post" action="">
            <div className="panel panel-default">
              <div className="panel-heading">登录</div>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="logName">用户名：</label>
                  <input type="text" name="username" className="form-control" id="logName" placeholder="用户名" />
                </div>
                <div className="form-group">
                  <label htmlFor="logPw">密码：</label>
                  <input type="password" name="password" className="form-control" id="logPw" placeholder="密码" />
                </div>
              </div>
              <div className="panel-footer"><button type="submit" className="btn btn-default">登录</button></div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}