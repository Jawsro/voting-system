import {getUserInfo} from "./api.js";
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
// 通过code获取 openId等用户信息，
function _getUserInfo(code){
  let data={
    code:code
  }
  getUserInfo(data).then(result=>{
      localStorage.setItem('openId',result.openid);
      localStorage.setItem('userId',result.id);
  })
}

export function  getCode() {
    // 非静默授权，第一次有弹框
    const code = getUrlParam("code"); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
    const local = window.location.href;
    const APPID = "wx8854ecd9d8e63134"; // 企业微信
    if (code == null || code == "") {
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        APPID +
        "&redirect_uri=" +
        encodeURIComponent(local) +
        "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    } else {
      _getUserInfo(code); //把code传给后台获取用户信息
    }
}