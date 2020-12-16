import wx from 'weixin-js-sdk' // 引入微信SDK

export function wxShare(response,option){
  wx.config({
      debug: true ,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId:response.appid, // 必填，公众号的唯一标识
      timestamp:response.timestamp, // 必填，生成签名的时间戳
      nonceStr:response.noncestr, // 必填，生成签名的随机串
      signature:response.signature,// 必填，签名，见附录1
      jsApiList: [
          // 必填，所有要调用的 API 都要加到这个列表中
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
      ]
    });
    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
      //分享给朋友
      wx.updateAppMessageShareData({ 
        title:"伍家岗区摄影大赛线上票选活动", // 分享标题
        desc: option.desc, // 分享描述
        link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: option.imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
      });
       wx.onMenuShareAppMessage({ 
        title:"伍家岗区摄影大赛线上票选活动", // 分享标题
        desc: option.desc, // 分享描述
        link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: option.imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
      });
      //分享到朋友圈
      wx.updateTimelineShareData({ 
        title:"伍家岗区摄影大赛线上票选活动", // 分享标题
        desc: option.desc, // 分享描述
        link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: option.imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
      });
      wx.onMenuShareTimeline({ 
        title:"伍家岗区摄影大赛线上票选活动", // 分享标题
        desc: option.desc, // 分享描述
        link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: option.imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
      })
    }); 
}