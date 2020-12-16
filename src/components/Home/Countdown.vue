<template>
  <div class='countdown' >
    <div class='text' v-show ='!textIsShow'>
      <span>距离摄影比赛投票截止：</span>
    </div>
    <div class='text' v-show ='textIsShow'>
      <span>本次活动已结束</span>
    </div>
    <div class='time' v-show='isShow && !textIsShow'>
      <span class='bgcolor'> {{days}}</span>
      <span class='time-text'>天</span>
      <span class='bgcolor'> {{hours}}</span>
      <span class='time-text'>时</span>
      <span class='bgcolor'> {{minutes}}</span>
      <span class='time-text'>分</span>
      <span class='bgcolor'> {{seconds}}</span>
      <span class='time-text'>秒</span>
    </div>
  </div>
</template>
<script>
import {checkTime} from '../../assets/js/common.js'
export default { 
  data(){
    return{
      days:'',
      hours:'',
      minutes:'',
      seconds:'',
      isEnd:false,//倒计时是否结束
      endTime:'',//应为接口获取到的结束时间
      isShow:false,
      textIsShow:false
    }
  },
  created(){
    this.setEndTime()
  },
  methods:{ 
   setEndTime(){
      this.endTime = localStorage.getItem('endTime');
      let that = this;
      let interval = setInterval(()=>{
          let date = new Date(that.endTime)-(new Date())
          if(date < 0){
            that.isEnd = true
            that.days = '00'
            that.hours = '00'
            that.minutes = '00'
            that.seconds = '00'
            that.isShow = false
            that.textIsShow =!that.textIsShow
            clearInterval(interval)
            return false
          }else{
            that.days = checkTime(parseInt(date / 1000 / 60 / 60 / 24 , 10));
            that.hours = checkTime(parseInt(date / 1000 / 60 / 60 % 24 , 10));
            that.minutes = checkTime(parseInt(date / 1000 / 60 % 60, 10));
            that.seconds = checkTime(parseInt(date / 1000 % 60, 10));
          }
      },1000)
     
      setTimeout(()=>{
        this.isShow = true
      },1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../assets/css/common.styl";
  .countdown
    text-align:center
    font-weight:$font-weight-x
    padding:$padding-small 0 
    .text
      color:$color-text
      font-size:$font-size-medium-x 
    .time
        margin-top:$padding-small
        font-size:$font-size-medium
      .bgcolor
        display: inline-block
        width:40px
        height:28px
        line-height:28px
        color:$color-fff
        background:$color-banckground
        border-radius: $border-radius
      .time-text
        margin:0 $padding-small
        color:$color-text 
</style>