<template>
  <div class="home">
    <img alt="" :src="baseUrl+BannerImg"   @load='loadImage'/>
    <count-down :endTime='endTime'></count-down>
  </div>
</template>
<script>
import {baseUrl} from "../../assets/js/request.js";
import {getActivity} from "../../assets/js/api.js";
import CountDown from "@/components/Home/Countdown.vue";
export default {
  data(){
    return{
      baseUrl:'',
      show: false,
      BannerImg:'',
      endTime:''
    }
  },
  components: {
    CountDown,
  
  },
  created(){
    this.baseUrl = baseUrl;
    this._getActivity();
  },
  methods:{
    loadImage(){
        this.show = true
        this.$emit('func',this.show)
    },
    _getActivity(){
      getActivity().then(result=>{
          if(result.status == true){
            this.BannerImg = result.data.activity.header_img;
            localStorage.setItem('activityId',result.data.activity.id);
            this.endTime = result.data.activity.end_at
          }
      })
    },
  }
};
</script>
<style lang="stylus" scoped></style>