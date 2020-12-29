<template>
  <div class='list-vue'>
    <div class='search-box' v-show='requestUrl == "/api/work/getWorkListByVote" ? false :true'>
        <div class='search'>
          <van-search
              v-model="value"
              show-action
              placeholder="请输入名称或编号">
              <template #action>
                <div @click="onSearch" class='search-btn'>搜索</div>
              </template>
          </van-search>
        </div>
    </div>
    <div class='cut'></div>
    <div class='list' 
      v-infinite-scroll='loadMore'
      infinite-scroll-disabled='busy'
      infinite-scroll-distance="10">

      <div class='item' 
          v-for='(item,index) in WorkList'
          :key='index'
          >

        <div class='img' @click='goVotesDetails(item.id)'>
          <img alt="" v-lazy=" baseUrl+item.work_image[0].image_url" />
          <div class='msg'>
            <div class='name'>
              <span>{{item.title}}</span>
            </div>
            <div class='opus'>
              <p class='left'>{{item.id}}号</p>
              <p class='right'>{{item.author_name }}</p>
            </div>
          </div>
          <div class='vote-ranking' v-show='requestUrl == "/api/work/getWorkListByVote" && index < 101 ? true :false'>
            <span>第</span>
            <span class='padding-small'>{{index+1}}</span>
            <span>名</span>
          </div>
        </div>

        <div class='votes'>
          <p class='left'> {{item.votes_number }}票</p>
          <p class='right votes-btn' @click='votesBtn(item.id)'> 
            <van-icon name="like" class='padding-s'/>
            投TA一票
          </p>
        </div>
      </div>

    </div>
    <van-loading color=" #4BB892" type="spinner" v-show="loadTxt == '加载中...' ?true:false" class='van-loading'/>
    <van-divider :style="{ color: '#CCCDCF', borderColor: '#CCCDCF'}" class='loading'>{{loadTxt}}</van-divider>
  </div>
</template>
<script> 
  import {baseUrl} from "../../assets/js/request.js";
  import {getWorkList,getUserVote,getUserScribeInfo} from "../../assets/js/api.js";
  import md5 from 'js-md5';
  import infiniteScroll from "vue-infinite-scroll";
  import { Toast } from 'vant';
  import {getWxShare} from "../../assets/js/api.js";
  import {wxShare} from "../../assets/js/wxshare.js";
  import { Dialog } from 'vant';
  import {getUserScribeInfo} from "../assets/js/api.js";
  import {getCode} from "../assets/js/wxapi.js";
  let votesBtnLocks =false;
  export default {
    directives: {infiniteScroll},
    props:{
      requestUrl:String
    },
    name:'List',
    data(){
      return{
        value:'',
        baseUrl:'',
        page:1,
        page_has_count:6,
        loadTxt:'加载中...',
        WorkList:[],
        busy:false,
        votesNumber:null,
        buttonLock:false,
        openId:null,
        userId:null
      }
    },
    created(){
      this.baseUrl = baseUrl;
      setTimeout(()=>{
         this._getWorkList();
        
      },1000)
      this._getWxShare();
      this.panduan();
    },
    methods:{
      panduan(){
        let openId = localStorage.getItem('openId');
        if(openId == null || openId == undefined){
          getCode()
        }else{
          //已经授权判断是否关注公众号
          //没有关注
          if(localStorage.getItem('subscribe')!=1 || localStorage.getItem('subscribe')!='1'){
            //console.log('')
            getUserScribeInfo({open_id:openId}).then(res=>{
              if(res.status == true){
                //缓存是否已关注公众号
                localStorage.setItem('subscribe',res.subscribe);
              }
            })
          }
        }
      },
      _getWxShare(){
        let shareUrl=window.location.href;
         if(shareUrl.indexOf('code') !=-1){
            shareUrl = shareUrl.split('?code')[0]
        }
        let option={
          desc:'魅力新城  印象伍家',
          link:'http://workvote.shangyouyun.cn/',
          imgUrl:'http://workvote.shangyouyun.cn/uploads/20201215/5ff1dc2fb68d7d4bc18799a67e347a1a.jpg'
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
      votesBtn(workId){
        if(votesBtnLocks){
          return false ;
        }
        votesBtnLocks = true;
        //投票前，先判断是否已经授权登录 openid用来判断是否已经授权登录
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
          //判断是否关注公众号
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
          //已经授权登录了
          let voteSecret = md5('work_vote'+this.userId.toString()+workId.toString())
          let data={
            work_id:workId,
            user_id:this.userId,
            user_open_id:this.openId,
            vote_secret:voteSecret
          }
          getUserVote(data).then(result=>{
              if(result.status == true){
                Toast({
                  message: result.msg,
                  duration: 2000,
                });
                this.WorkList = this.WorkList.map(value=>{
                  if(value.id==workId){
                    value.votes_number = value.votes_number+1
                  }
                  return value
                })
              }
            votesBtnLocks = false;
          })
        }
      },
      onSearch(){
        this.page = 1;
        this.requestUrl = '/api/work/getWorkList';
        this.loadTxt = '加载中...'
        this.WorkList = [];
        this._getWorkList();
      },
      goVotesDetails(voteId,rankIndex){
          this.$router.push({path:'votesdetails', query:{voteId:voteId,rankIndex:rankIndex}})
      },
      //作品列表
      _getWorkList(){
        let activity_id = localStorage.getItem('activityId');
        this.busy=true
        let data = {
          page:this.page,
          page_has_count:this.page_has_count,
          activity_id:activity_id,
          search_input:this.value
        }
        getWorkList(data,this.requestUrl).then(result=>{
          if(result.status == true){
            this.WorkList =this.WorkList.concat(result.data.works);
            if(result.data.works.length<1){
              this.loadTxt = '暂无数据'
              return;
            }
            if(result.data.works.length<6){
                this.loadTxt='暂无更多数据';
                return;
            }
            this.page++;
            this.loadTxt = '加载更多';
            this.busy = false
          }
        })
      },
      loadMore(){
        if(this.loadTxt != '加载更多'){
					return false;
				}
        this.loadTxt='加载中...';
        this._getWorkList();
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../../assets/css/common.styl";
   .padding-s
    margin-right:$padding-small
   .left
    flex:1
  .right
   flex:1
   text-align:right
   padding-right:$padding-small-s
  .votes-btn
    background:$color-banckground
    color:$color-fff
    padding:$padding-small
    border-radius: $border-radius
    display:flex
    align-items:center
    font-size:$font-size-small
  .search-box
    margin:$padding-small  $font-size-large 0
    border:1px solid #CCCDCF
    border-radius: 30px
    padding:2px 12px
    position:relative
    .search-btn
      border-radius: 30px
      width:65px 
      color:$color-fff
      text-align: center
      line-height: 28px
      position:absolute
      top:0
      right:0
      bottom:0
      background:$color-banckground
  .cut
    border-top:3px solid #CCCDCF
    margin-top:$padding-medium
  .list
    padding:10px 10px
    overflow: hidden
    .item
      width:48%
      margin:5px 3px $padding-large
      font-size:$font-size-medium 
      float:left
      .votes
        display:flex
        justify-content:center
        align-items:center
        color:$color-text 
        margin-top:$padding-small
        padding:$padding-small-s
        .left
          font-size:$font-size-medium-x
          height:100%
      .img
        width:100%
        position:relative
        height: 200px;
        color:$color-fff
        img
          height:100%
          object-fit:cover
        .msg
          position:absolute
          right:0
          bottom:0
          left:0
          padding-bottom:$padding-small-s
          background:rgba(0,0,0,.3)
          .name
            padding:$padding-small-s
          .opus
            display:flex
            border-top:1px solid #A7A7A7
            padding:$padding-small-s
        .vote-ranking
          position:absolute
          top:0px
          right:0px
          padding:4px 10px
          background:$color-banckground
          font-size:16px
          border-bottom-left-radius:$border-radius-m
          .padding-small
             padding:0 $padding-small-s
  .loading
    margin:10px 0 65px 0
    text-align:center   
  .van-loading
    position:absolute
    top:50%
    left:50% 
</style>