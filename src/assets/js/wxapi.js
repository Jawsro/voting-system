import {getUserInfo} from "./api.js";
import { Toast } from 'vant';
function getUrlParam(name) {
  var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
  if (reg.test( window.location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
  return "";
}
// 通过code获取 openId等用户信息，
function _getUserInfo(codes){
  let data={
    code:codes
  }
  Toast.loading({
    message: '正在微信授权登录中，请稍后！',
    forbidClick: true,
    duration:60000
  });
  getUserInfo(data).then(result=>{
       Toast.loading({
          message: '授权成功，可以开始投票啦！',
          forbidClick: true,
        });
      localStorage.setItem('openId',result.data.user_info.openid);
      localStorage.setItem('userId',result.data.user_info.id);
      localStorage.setItem('subscribe',result.data.user_info.subscribe);
      setTimeout(()=>{
        window.location.href = 'http://workvote.shangyouyun.cn/'
      },500)
  })
}

export function  getCode() {
    // 非静默授权，第一次有弹框
    const code = getUrlParam("code"); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
    const local = window.location.href;
    const APPID = "wx036cda8d2ff95423"; // 企业微信
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