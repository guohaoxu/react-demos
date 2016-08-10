import React, { Component } from 'react'
import { browserHistory } from 'react-router'

export default class Setting extends Component {
  componentWillMount() {
    if (!this.props.user.username) {
      browserHistory.push('/login')
    }
  }
  handleTx() {
    var tmpStr = $(this.refs.txUpload).val(),
      str = tmpStr.slice(tmpStr.indexOf('.'), tmpStr.length)
    $("#txForm").ajaxSubmit()
    $("#upTip").show()
    var that = this
    var tagImg = new Image()
    tagImg.onload = function () {
      setTimeout(function () {
        $("#upTip").hide()
        $(".img-rounded").attr("src", `${window.ctx}/uploads/${that.props.user.username}${str}?t=${Math.random()}`)
      }, 1000)
    }
    tagImg.src = `${window.ctx}/uploads/${this.props.user.username}${str}?t=${Math.random()}`
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">设置</div>
            <div className="panel-body">
              <form ref="txForm" id="txForm" method="post" action="/api/upload" encType="multipart/form-data">
                <div className="form-group">
                  <label htmlFor="userDesc">个人头像：</label>
                  <div className="imgTx"><img src="/static/imgs/default.jpg" alt="#" className="img-rounded" /></div>
                  <label className="btn btn-default openFile">修改头像<input type="file" name="avatar" ref="txUpload" data-user="aaa" onChange={this.handleTx.bind(this)} /></label>
                  <div id="upTip"><span className="glyphicon glyphicon-refresh"></span> <span className="upTipTxt">uploading...</span></div>
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

      </div>
    )
  }
}
