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