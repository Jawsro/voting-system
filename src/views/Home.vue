<template>
  <div class="home" v-show='isShow'>
    <Banner  @func='getEvent'></Banner>
    <List :requestUrl='requestUrl'></List>
  </div>
</template>
<script>
import Banner from "@/components/Home/Banner.vue";
import List from "@/components/Home/List.vue";
import {getUserScribeInfo} from "../assets/js/api.js";
import {getCode} from "../assets/js/wxapi.js";
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
    List
  },
  created(){
    let openId = localStorage.getItem('openId');
    if(openId =='undefined' || openId == undefined){
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
  methods:{
    getEvent(data){
      this.isShow = data
    },
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