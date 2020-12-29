<template>
  <div class='votes-details'>
    <div class='votes-msg' v-show='isShow'>
      <h1>{{votesDetails.title}}</h1>
      <div class='msg'>
        <div class='left'>
          <p class='msg-item'>
            <span>作者姓名：</span>
            <span class='text-color'>{{votesDetails.author_name}}</span>
          </p>
          <p class='msg-item'>
            <span>作品编号：</span>
            <span class='text-color'>{{votesDetails.id}}号</span>
          </p>
          <p class='msg-item'>
            <span>当前票数：</span>
            <span class='text-color'>{{votesDetails.votes_number}}票</span>
          </p>
          <p class='msg-item'>
            <span>当前排名：</span>
            <span class='text-color'>{{votesDetails.rank}}名</span>
          </p>
        </div>
        <div class='right'>
           <img alt="" :src="baseUrl+headerImg" @load='loadImg'/>
        </div>
      </div>
    </div>

    <div class='votes-list'>
       <div v-for='(item,index) in workImage' 
            :key='index'>
        <img :src="baseUrl+item.image_url" alt="" @click='bigImg(item.image_url)'>
      </div>
   </div>


    <div class='btns'>
      <div class='votes-btn' @click.stop='votesBtn(votesDetails.id)'>
        <img src="../assets/img/zan.png" alt="">
      </div>
      <div class='votes-btn' @click.stop='shareBtn()' >
        <img src="../assets/img/share.png" alt="">
      </div>
    </div>


    <van-action-sheet 
      v-model="showShare" 
      :actions="actions"
      cancel-text="取消"
      close-on-click-action 
      @select="onSelect" />
  </div>
</template>
<script>
  import {getUserVote,getDetail,getWxShare,getUserScribeInfo} from "../assets/js/api.js";
  import {baseUrl} from "../assets/js/request.js";
  import md5 from 'js-md5';
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  import {wxShare} from "../assets/js/wxshare.js";
  import wx from 'weixin-js-sdk';// 引入微信SDK
  let votesBtnLocks =false;
  export default {
    name:'VotesDetails',
    data(){
      return{
          showShare: false,
          actions: [{ name: '' },{ name: '点击右上角分享到朋友圈活朋友' },{ name: '' }],
          work_id:null,
          rankIndex:null,
          votesDetails:{},
          workImage:[],
          headerImg:'',
          baseUrl:'',
          isShow:false,
          openId:null,
          userId:null
      }
    },
    created(){
      this.work_id = this.$route.query.voteId;
      this.rankIndex = this.$route.query.rankIndex;
      this.baseUrl = baseUrl;
      this._getDetail();
      this._getWxShare()
    },
    methods:{
      bigImg(url){
        let imgUrlArr=[];
        this.workImage.forEach(item=>{
          imgUrlArr.push(this.baseUrl+item.image_url)
        })
        wx.previewImage({
          current:this.baseUrl+url, // 当前显示图片的http链接
          urls:imgUrlArr // 需要预览的图片http链接列表
        });
      },
      _getWxShare(){
        let shareUrl=window.location.href
       if(shareUrl.indexOf('code') !=-1){
            shareUrl = shareUrl.split('?code')[0]
        }
      let option={
        desc:`${this.votesDetails.author_name}的${this.votesDetails.id}号作品正在参赛，快来给他点赞吧`,
        link:shareUrl,
        imgUrl:baseUrl+this.headerImg
      }
      
      let data={
        share_url:shareUrl
      };
      getWxShare(data).then(res=>{
        if(res.status == true){
          wxShare(res.data,option)
        }
      })
    },
      loadImg(){
        this.isShow =true
      },
      _getDetail(){
        let data = {
          work_id:this.work_id
        };
        getDetail(data).then(result=>{
          if(result.status == true){
            this.votesDetails = result.data.works
            this.workImage = result.data.works.work_image
            this.headerImg = this.workImage[0].image_url
            this._getWxShare()

            this.$previewRefresh();
            
          }
        })
      },
      shareBtn(){
        this.showShare = true
      },
      onSelect() {
        this.showShare = false;
      },
      votesBtn(workId){
        if(votesBtnLocks){
          return false ;
        }
        votesBtnLocks = true;
        this.openId = localStorage.getItem('openId');
        this.userId = localStorage.getItem('userId');
        //未登录
        if(localStorage.getItem('openId') == null|| localStorage.getItem('openId') == undefined){
           Dialog.alert({
            title: '提示',
            message: '微信授权未成功，请刷新页面重新授权',
          }).then(() => {
            // on close
            votesBtnLocks = false;
          });
        }else if(localStorage.getItem('subscribe')!=1){
           getUserScribeInfo({open_id:this.openId}).then(res=>{
              if(res.status == true){
                //没有关注引导跳转关注公众号
                if(res.subscribe ==0){
                  Dialog.confirm({
                    title: '提示',
                    message: '投票需要关注公众号，确定关注公众号吗？',
                  })
                  .then(() => {
                    window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5ODc2ODU0OQ==&scene=124#wechat_redirect'
                  })
                  .catch(() => {
                    // on cancel
                  });
                }else{
                  localStorage.setItem('subscribe',res.subscribe);
                }
              }
            votesBtnLocks = false;
           })
        }else {
          let voteSecret = md5('work_vote'+this.userId.toString()+workId.toString())
          let data={
            work_id:workId,
            user_id:this.userId,
            user_open_id:this.openId,
            vote_secret:voteSecret
          }
          getUserVote(data).then(result=>{
            if(result.status == true){
              Toast.success({
                message: result.msg,
                duration: 2000,
              });
              this.votesDetails.votes_number = this.votesDetails.votes_number+1
            }
            votesBtnLocks = false;
          })
        }
      },
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../assets/css/common.styl";
  .close-swiper
    position:absolute
    top:10px
    right:10px
    width:40px
    height:40px
  .img-swiper
    position:absolute
    top:0px
    right:0px
    left:0
  .votes-details
    .votes-msg
      padding:$padding-medium
      position:fixed
      top:0
      left:0
      background:$color-fff
      h1
        color:$color-text 
        font-size:$font-size-large
        width:50%
        overflow:hidden
        white-space:nowrap
        text-overflow:ellipsis
      .msg
        display:flex
        height:124px
        font-size:$font-size-medium
        .left
          flex:1
          width:180px
          .msg-item
            padding-top:$padding-medium
            color:$color-8A 
            width:100%
            .text-color
              color:$color-text 
        .right
          flex:1
          height:100%
          text-align:center
          img
            border-radius: $border-radius
            height:100%
            object-fit:cover
    .votes-list
      padding:170px $padding-medium $padding-larg-xl $padding-medium
      img
        border-radius: $border-radius
        margin-bottom:$padding-medium
    .btns
      position:fixed
      bottom:50px
      right:37px
      text-align:center
      .votes-btn
        width:50px
        height:50px
        border-radius:50%
        color:$color-fff
        background:$color-banckground
        font-size:$font-size-large-x
        line-height:50px
        margin-bottom:20px
        text-align:center
        img
          width:100%
          height:100%
</style>