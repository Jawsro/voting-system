<template>
  <div class="rules" v-show='isShow'>
    <Banner @func='getEvent'></Banner>
    <count-down></count-down>
    <div class='cut'></div>
    <div class='getrules'> 
      <h1 class='title'>“魅力新城·印象伍家”</h1>
      <p class='text'>伍家岗区摄影大赛活动方案</p>
      <div class='container'>
        为记录和见证伍家岗“十三五”发展历程、可喜变化及丰硕成果，由伍家岗区委宣传部、伍家岗区融媒体中心、伍家岗区文联、伍家岗区摄影家协会联合举办“魅力新城·印象伍家”伍家岗区摄影大赛，通过镜头展现伍家岗的发展变化、生态环境、人文风貌和伍家儿女追求幸福生活努力奋斗的精神风貌，为谱写新时代伍家岗高质量发展新篇章注入强大的精神动力。
      </div>
      <div class='main'>
        <div class='sort'>
          <h3 class='small-title'>一、作品主题</h3>
          <p class='margin-bottom'>
            本次活动面向全社会公开征集，诚邀社会各界摄影爱好者踊跃参与，作品应紧扣“魅力新城·印象伍家”主题，导向积极向上，具体选题需包含伍家岗元素，可体现但不限于以下主题：
          </p>
          <p class='margin-bottom'>
            <span class='text-color'>1、秀美伍家。</span>聚焦伍家岗的自然风光，展现伍家岗生态颜值，生动诠释“绿水青山就是金山银山”。
          </p>
          <p class='margin-bottom'>
            <span class='text-color'>2、文化伍家。</span>聚焦伍家岗人文景观，刻画伍家岗人文魅力。可将风景与文化相结合，展现伍家岗的历史文化、非物质文化遗产、民风民俗、美食特产等。
          </p>
          <p class='margin-bottom'>
            <span class='text-color'>3、活力伍家。</span>聚焦伍家岗社会经济发展，展现伍家岗项目建设、都市工业、现代服务业、社会民生等方面的发展成果。
          </p>
          <p class='margin-bottom'>
            <span class='text-color'>4、追梦伍家。</span>聚焦新时代伍家岗人，展现伍家岗各行各业的普通人在伍家岗建设发展中所作出的贡献。镜头可以对准师生、建筑工人、志愿者、快递小哥、环卫工人以及千千万万的劳动者。
          </p>
        </div>

        <div class='sort'>
          <h3 class='small-title'>二、组织机构</h3>
          <p class='padding-small'>主办单位：伍家岗区委宣传部</p>
          <p class='padding-small'>承办单位：伍家岗区融媒体中心、伍家岗区文联</p>
          <p class='padding-small'>指导单位：伍家岗区摄影家协会</p>
        </div>

        <div class='sort'>
          <h3 class='small-title'>三、时间安排</h3>
          <p class='margin-bottom'>本次活动时间为2020年10月-2020年12月。具体分为以下几个阶段：</p>
          <p class='margin-bottom'>1、作品征集（2020年10月10日-11月10日）：面向全社会征集“魅力新城·印象伍家”相关主题摄影作品。</p>
          <p class='margin-bottom'>2、作品线上展示（2020年11月10日-11月30日）：经过组委会初步筛选，合格作品将上传至“魅力新城伍家岗”官方微信进行展示。</p>
          <p class='margin-bottom'>3、作品评选（2020年12月）：评委会经过初选、终选以及网络投票结果综合评选出获奖作品并进行公示。</p>
          <p class='margin-bottom'>4、颁奖仪式（2020年12月底）：所有获奖作品将在“魅力新城伍家岗”官微上集中展示，并为入选作品颁发奖品及荣誉证书。</p>
        </div>

        <div class='sort'>
          <h3 class='small-title'>四、活动规则</h3>
          <p class='margin-bottom'>1.一个微信号24小时限投五票，五票须分别投给不同参赛作品，给一个作品仅能投一票。</p>
          <p class='margin-bottom'>2.投票微信号仅限湖北省内范围。</p>
          <p class='margin-bottom'>3.本次活动严禁一切刷票行为，系统全程监控，系统将自动冻结存在恶意刷票嫌疑选手，24小时解冻。若冻结两次以上， 一经核实，将取消参赛资格。</p>
          <p class='margin-bottom'>4.本次活动中，如选手票数中外地票（宜昌市以外）超过70％均视为有刷票行为。</p>
          <p class='margin-bottom'>5、本次大赛不收参赛费，所有来稿一律不退。对于入选作品，主办单位有权在出版画册、举办展览、相关宣传中使用，并不再支付稿酬。参赛作品主办方有权在“魅力新城伍家岗”微博、微信等平台刊载。</p>
          <p class='margin-bottom'>6、大赛期间，组委会将不定期择优举办图片展。</p>
          <p class='margin-bottom'>7、大赛遵循“公平、公开、公正”的原则。同一作者多幅作品参赛，只能获一次等次奖励，优秀奖不限。谢绝本活动组委会和评委会成员及亲属投稿。作品务必保证真实性、原创性，可以必要修饰调节，谢绝后期人为删改；作者承担作品著作权、肖像权等法律责任，由此引起的法律纠纷与赛事方无关。凡上述原因导致相关纠纷的，一切法律责任均由投稿者本人承担。</p>
        </div>
        
        <div class='sort'>
          <h3 class='small-title'>五、奖项设置</h3>
          <p class='padding-small margin-bottom'>活动组委会将邀请摄影专家组成评审委员会，对征集的作品进行初评、终评以及网络投票评选，最终成绩以专家组评审（70%）和网络投票（30%）综合评定，获奖作品将颁发荣誉证书和奖品。</p>
          <p class='padding-small text-color'>一等奖10名，华为P40手机一部</p>
          <p class='padding-small text-color'>二等奖15名，华为 Sound X 智能音箱一个</p>
          <p class='padding-small text-color'>三等奖30名，华为 FreeLace Pro 无线耳机一个</p>
          <p class='padding-small text-color'>优秀奖若干名，万达影城或恒大影城电影票两张</p>
        </div>

        <div class='sort'>
          <h3 class='small-title'>六、征集方式</h3>
          <p class='padding-small text-color'>投稿邮箱：mlxcwjgzj@163.com</p>
          <p class='padding-small'>大赛组委会咨询电话：0717-6562251</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Banner from "@/components/Home/Banner.vue";
  import CountDown from "@/components/Home/Countdown.vue";
  export default {
    name: "Rules",
    components: {
       Banner,
      CountDown,
    },
    data(){
      return{
         isShow:false
      }
    },
    methods:{
      getEvent(data){
        this.isShow = data
      }
    }
  };
</script>
<style lang="stylus" scoped>
  @import "../assets/css/common.styl";
  .text-color
    color:$color-text
    font-weight:$font-weight
  .cut
    border-top:3px solid #CCCDCF
    margin-top:$padding-medium
  .getrules
    padding:$padding-medium $padding-larg-x $padding-larg-xl 
    .title
      color:$color-text
      text-align:center
      font-size:$font-size-large
    .text
      text-align:center
      font-size:$font-size-medium
      margin:$padding-medium 0
    .container
      margin:$padding-larg-x 0 
      font-size:$font-size-medium
    .main
      font-size:$font-size-medium
      .sort
        margin-top:$padding-larg-x 
        .small-title
          font-size:$font-size-medium-x
          margin-bottom:$padding-medium
        .margin-bottom
          margin-bottom:$padding-medium
        .padding-small
          padding:$padding-small-s 0
</style>
