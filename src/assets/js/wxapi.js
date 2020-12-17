import {getUserInfo} from "./api.js";
function getUrlParam(name) {
  var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
  if (reg.test( window.location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
  return "";
}
// 通过code获取 openId等用户信息，
function _getUserInfo(codes){
  alert('第二次获取code:'+codes)
  let data={
    code:codes
  }
  getUserInfo(data).then(result=>{
      alert('进入接口成功')
      alert(result.data)
      if(result.status==false){
        alert('错误')
        
        
      }
      localStorage.setItem('openId',result.data.user_info.openid);
      localStorage.setItem('userId',result.data.user_info.id);
      alert('1获取openid:' + result.data.user_info.openid)
      alert('2获取id:' + result.data.user_info.id)
      alert('3获取subscribe:' + result.data.user_info.subscribe)
      if(result.data.user_info.subscribe !=1){
        //判断是否关注公众号
        window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5OTA2MjQ0MA==&scene=124#wechat_redirect'
      }
       
       alert('请求接口成功结束')
  })
}

export function  getCode() {
    // 非静默授权，第一次有弹框
    alert('请求授权')
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