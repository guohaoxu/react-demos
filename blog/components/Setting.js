import React, { Component } from 'react'
import { browserHistory } from 'react-router'

export default class Setting extends Component {
  componentWillMount() {
    if (!this.props.user.username) {
      browserHistory.push('/login')
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">设置</div>
            <div className="panel-body">
              <form id="txForm" method="post" action="/api/upload" encType="multipart/form-data">
                <div className="form-group">
                  <label htmlFor="userDesc">个人头像：</label>
                  <div className="imgTx"><img src="/static/imgs/default.jpg" alt="#" className="img-rounded" /></div>
                  <label className="btn btn-default openFile">修改头像<input type="file" name="avatar" id="txUpload" data-user="aaa" /></label>
                  <div id="upTip"><span className="glyphicon glyphicon-refresh"></span> <span className="upTipTxt"></span></div>
                </div>
              </form>
              <form method="post" action="/api/setting">
                <div className="form-group">
                  <label htmlFor="userDesc">个人描述：</label>
                  <textarea name="userdesc" className="form-control" id="userDesc" value={this.props.user.description}></textarea>
                  <input type="hidden" name="imgSrc" id="hiddenImgSrc" value="" />
                </div>
                <button type="submit" className="btn btn-default">保存</button>
              </form>
            </div>
          </div>
        </div>

        <script src="/static/js/jquery.form.js"></script>
      </div>
    )
  }
}
