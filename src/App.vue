<template>
  <div id="app">
    <div id="nav">
      <van-tabbar v-model="active" class="bg" active-color="#4BB892" inactive-color="#282828">
          <van-tabbar-item  
              v-for="(item,index) in tabbars" 
              :icon='item.icon'
              :key="index"
              @click="tab(index,item.name)">
              {{item.title}}
          </van-tabbar-item>
      </van-tabbar>
    </div>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        active:0,
        tabbars:[{
          name:'/',
          title: "首页",
          icon:"home-o"
        },{
          name:'Ranking',
          title: "排行榜",
          icon:"bar-chart-o"
        },{
          name:'Rules',
          title: "活动规则",
          icon:"label-o"
        }]
      }
    },
    methods: {
      tab(index, val) {
        this.$router.push(val);
      }
  }
};
</script>

<style lang="stylus" scoped>
@import "../src/assets/css/common.styl";
#app /deep/ .bg .van-tabbar-item
  font-size:$font-size-medium !important 
#app /deep/ .bg .van-tabbar-item__icon
  font-size:$font-size-large-x !important 
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  .bg
    background-color:#fff !important
    border-top:1px solid transplate
    box-shadow:0px 5px 20px #CCCDCF
</style>
