import {HttpRequest} from "./request.js"

//活动信息
export function getActivity(data){
  return HttpRequest.getRequest({
     method: "POST",
      url: "/api/work/getActivity",
      data: data
  })
}
//作品列表和排行榜
export function getWorkList(data,url){
  return HttpRequest.getRequest({
     method: "POST",
      url: url,
      data: data
  })
}
//投票
export function getUserVote(data){
  return HttpRequest.getRequest({
     method: "POST",
      url: "/api/work/userVote",
      data: data
  })
}
//活动规则
export function getRuleDetail(data){
  return HttpRequest.getRequest({
     method: "POST",
      url: "/api/activity/getRuleDetail",
      data: data
  })
}
//获取作品详情
export function getDetail(data){
  return HttpRequest.getRequest({
     method: "POST",
      url: "/api/work/getDetail",
      data: data
  })
}

//获取openid
export function getUserInfo(data){
  return HttpRequest.getRequest({
      method: "POST",
      url: "/api/weixin/getUserInfo",
      data: data
  })
}

//微信分享
export function getWxShare(data){
  return HttpRequest.getRequest({
      method: "POST",
      url: '/api/weixin/getSignature',
      data: data
  })
}

//获取用户是否关注公众号
export function getUserScribeInfo(data){
  return HttpRequest.getRequest({
      method: "POST",
      url: '/api/weixin/getUserScribeInfo',
      data: data
  })
}