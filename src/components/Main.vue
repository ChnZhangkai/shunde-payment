<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="首页">
          <Index @toOwner="toOwner" ref="index"></Index>
        </mt-tab-container-item>
        <mt-tab-container-item id="经营诊断" >
          <ManagementDiagnosis ref="managementDiagnosis"></ManagementDiagnosis>
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          <Owner></Owner>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="首页">
        <img slot="icon" :src="borrowIcon">
        <span :style="{color:borrowColor}">首页</span>
      </mt-tab-item>
      <mt-tab-item id="经营诊断" click="RepayClick">
        <img slot="icon" :src="repayIcon">
        <span :style="{color:repayColor}">经营诊断</span>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" :src="ownerIcon">
        <span :style="{color:ownerColor}">我的</span>
      </mt-tab-item>
    </mt-tabbar>
    <div id="allmap"></div>
  </div>
</template>
<script>


  import Owner from './owner/Owner.vue'
  import RepaySkip from './repay/RepaySkip.vue'
  import Index from './Index.vue'
  import location from '../api/location.js'
  import ManagementDiagnosis from './owner/ManagementDiagnosis.vue'
  export default{
    components: {Owner, RepaySkip, Index, ManagementDiagnosis},
    data() {
      return {
        selected: this.$variable.selected
      };
    },
    computed: {
      borrowIcon() {
        return '../../static/assets/'.concat(this.selected == ('首页') ? 'lend.png' : 'lend_no.png')
      },
      repayIcon(){
        return '../../static/assets/'.concat(this.selected == ('经营诊断') ? 'repay.png' : 'repay_no.png')
      },
      ownerIcon(){
        return '../../static/assets/'.concat(this.selected == ('我的') ? 'my.png' : 'my_no.png')
      },
      borrowColor(){
        return this.selected == ('首页') ? '#ff6400' : '#666666'
      },
      repayColor(){
        return this.selected == ('经营诊断') ? '#ff6400' : '#666666'
      },
      ownerColor(){
        return this.selected == ('我的') ? '#ff6400' : '#666666'
      }
    },
    methods: {
      toOwner(){
        this.selected = '我的'
      },
      toIndex(){
        this.$refs.index.onIndexSelected();
      },
    },
    destroyed(){
      this.$variable.selected = this.selected
    },
    mounted(){

      this.toIndex();
      console.log('params：' + this.$route.params.selected);
      console.log('route: ' + JSON.stringify(this.$route.params))
      if (this.$route.params && this.$route.params.selected) {
        this.selected = this.$route.params.selected;
        return
      }
    },
    watch: {
      selected: function (val, oldVal) {
        if (this.selected === '首页') {

          console.log('点击首页')
          this.$refs.index.onIndexSelected();
          return
        }
        else if(this.selected === '经营诊断'){

          //15分钟之后登陆态失效，强制重新登陆
          if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
            this.$CACHE.showErr();
            return
          }else{
            this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
          }
          var that = this;
          if (that.nonet) {
            Countly.init({
              app_key: that.$Constants.APPKEY,
              url: that.$Constants.ROOTMAI, //your server goes here
              debug: true,
            })
            Countly.track_sessions();
            Countly.track_pageview();
            Countly.add_event({
              key: that.$Constants.NoNetwork,
              "segmentation": {
                appId: window.appId,
              }
            });

            that.$toast("网络异常，请重试");
            that.$router.push(that.$RM.Netbroken);
          } else {

            let timeStamp=Date.now();
            that.$api.post(that.$api.ROOT + that.$Constants.QUERY_BANK_LIST, {
              appId: window.appId,
              reqId: that.$StringUtils.getReqId(),
              timestamp:timeStamp,
              sign: that.$utils.generateSign(that.$StringUtils.getReqId(),timeStamp),
              openId: this.$CACHE.getCache("loginSession"),
              data: {}
            }, function (res) {
              that.$indicator.close()
              if (res.ret === '0') {
                // 请求成功
                this.$refs.managementDiagnosis.managementSelected()

                Countly.init({
                  app_key: this.$Constants.APPKEY,
                  url: this.$Constants.ROOTMAI, //your server goes here
                  debug: true,
                })
                Countly.track_sessions();
                Countly.track_pageview();
                Countly.add_event({
                  key: this.$Constants.RepayClick,
                  "segmentation": {
                    appId: window.appId,
                  }
                });

              } else {
                // 请求失败
                if (res.ret === '000002') {
                  this.$dialog.alert("    ", this.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN)
                  this.$StringUtils.loginOut()
                } else {
                  this.$dialog.alert("    ", res.data.msg)
                }

              }
            }.bind(that), function () {
              that.$indicator.close();
            }.bind(that));
          }

        }
        else if(this.selected === '我的'){
          console.log('点击我的')
        }
      }
    }
  }
</script>
<style scoped>

  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

</style>
