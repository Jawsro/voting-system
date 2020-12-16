<template>
  <div class="home" v-show='isShow'>
    <Banner  @func='getEvent'></Banner>
    <count-down></count-down>
    <List :requestUrl='requestUrl'></List>
  </div>
</template>
<script>
import Banner from "@/components/Home/Banner.vue";
import CountDown from "@/components/Home/Countdown.vue";
import List from "@/components/Home/List.vue";

//import {getCode} from "../assets/js/wxapi.js";
export default {
  name: "Home",
  data(){
    return{
      BannerImg:'',
      isShow:false,
      requestUrl:"/api/work/getWorkList",
      openId:null,
      userId:null
    }
  },
  components: {
    Banner,
    CountDown,
    List
  },
  created(){
    
    //getCode()
  },
  methods:{
    getEvent(data){
      this.isShow = data
    },
    //判断是否关注公众号
    // getSubscribe(){
    //   let access_token = '40_3E6VQ-QaahgXMTFnF4XE96aawVnXIfWno9pyVvmvnAC2m2eR9wqHErUhCuy2OWbsL9';
    //   let openid = 'oqPC3uJjtTr-nOqmvKd2y0k1I3cM';
    //   this.$ajax(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${access_token}&openid=${openid}&lang=zh_CN`)
    //   .then(res=>{
    //     console.log(res)
    //     if(res.subscribe!=1){
    //       window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5OTA2MjQ0MA==&scene=124#wechat_redirect'
    //     }
    //   })
    // },
    

  }
 
};
</script>
<style lang="stylus" scoped>
  .home /deep/ .van-search
    padding:0 
  .home /deep/ .van-search__content
    background:#fff
    padding:0
  .home /deep/ .van-search .van-cell
    padding:0
</style>