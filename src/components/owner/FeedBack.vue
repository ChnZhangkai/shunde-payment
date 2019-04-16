<!--意见反馈-->
<template>
  <div style="height: 100%;background: #f5f5f5;">
    <ToolBar>意见反馈</ToolBar>
    <div class="feedBack">
        <div class="leixing">
          <span class="title">反馈类型：</span>
          <div class="bt">
          	<input type="button" class="btn1" :class="{'active': tabActive == 1}"  value="产品意见" @click="buttonss(1)"/>
          	<input type="button" class="btn1"  :class="{'active': tabActive == 2}"  value="体验意见" @click="buttonss(2)"/>
          	<input type="button" class="btn1"  :class="{'active': tabActive == 3}"  value="服务意见" @click="buttonss(3)"/>
          	<input type="button" class="btn1"  :class="{'active': tabActive == 4}"  value="流程意见" @click="buttonss(4)"/>
          </div>

        </div>
      <span class="title">反馈内容：</span>
      <textarea
        type="text"
        class="input"
        v-model="feedBack"
        maxlength="50"
        placeholder="请详细描述您的问题或建议，我们将及时跟进解决。请详细描述您的问题或建议，我们将及时跟进解决。请详细描述您的问题或建议，我们将及时跟进解决。请详细描述您的问题或建议，我们将及时跟进解决。请详细描述您的问题或建议，我们将及时跟进解决。请详细描述您的问题……"
      ></textarea>
      <div class="protocol">
        <Checkbox class="cb" @onCheckChange="onCheckChange"></Checkbox>
        <span class="text">允许后台客户电话回访</span>
      </div>
      <input type="text" class="phone" v-if="check" placeholder="请输入您的电话号码" v-model="phone"
             oninput="if(value.length>11)value=value.slice(0,11)"  onkeyup="value=value.replace(/[^\d]/g,'')">
      <CommitButton name="提交" :isInputNonEmpty="isInputNonEmpty" @click.native="commit"></CommitButton>
    </div>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Checkbox from '../Checkbox.vue'
  import CommitButton from '../CommitButton.vue'
  import SM from '../../api/SessionManager.js'
  export default{
    name: SM.FeedBack,
    components: {ToolBar, Checkbox, CommitButton},
    mounted(){

    },
    data(){
      return {
        check: false,
        feedBack: '',
        phone: '',//可选
        isInputNonEmpty: false,
        tabActive: 1,
        phoneno : sessionStorage.getItem("inputPhone"),
        opinionType:''//产品编号  0-体验意见 1-产品意见 2-流程意见 3-服务
      }
    },
    methods: {
      onCheckChange: function (val) {
        this.check = val
        console.info(this.check)
      },
      commit: function () {
        let toast = this.$toast;
        let indicator = this.$indicator
        let router = this.$router
        if (this.$StringUtils.isEmpty(this.feedBack)) {
          toast('反馈内容不能为空');
          return
        }
        if (this.check && this.$StringUtils.isEmpty(this.phone)) {
          toast('电话号码不能为空')
          return
        }
        if (this.check && !this.$regx.isPhone(this.phone)) {
          toast('电话号码格式错误')
          return
        }
        indicator.open()
        this.$api.post(this.$Constants.FEED_BACK, {
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId(),
          "data": {
            "phoneNo": this.phoneno,
            "allowCallPhoneno": this.phone,
            "opinion": this.feedBack,
            "allowCall": this.check ? 1 : 0,
            "productNo": this.opinionType
          }
        },function (result) {
          indicator.close()
          if (result && result.ret == 0) {
            Countly.init({
              app_key: this.$Constants.APPKEY,
              url: this.$Constants.ROOTMAI, //your server goes here
              debug: true,
            })
            Countly.track_sessions();
            Countly.track_pageview();
            Countly.add_event({
              key: this.$Constants.FeedClick,
              "segmentation": {
                appId: window.appId,
              }
            });

            router.replace(this.$RM.FeedSuccess)
          }
        }.bind(this), function (err) {
          indicator.close()
        })
      },
      buttonss: function (index){
        // if(index == 2){
        //   this.tabActive = index
        //   this.opinionType =0;
        // }else{
        //   this.tabActive = index
        //   this.opinionType =1;
        // }
        this.tabActive = index
        this.opinionType = index;
      },
    },
    watch: {
      feedBack: function (val, oldVal) {
        this.isInputNonEmpty = !this.$StringUtils.isEmpty(val)
      }
    }
  }
</script>
<style scoped>
  .feedBack {
    background: #FFFFFF;
    display: flex;
    padding: 30px 30px 0;
    flex-direction: column;
  }
  .feedBack .leixing{
    margin-bottom: 40px;
  }
  .btn1 {
	  -webkit-appearance: none; /*解决iphone safari上的按钮圆角问题*/
	  font-size: 25px;
	  color: #999999;
	  text-align: center;
	  text-shadow: 0 1px 0 #ffffff;
	  border: 1px solid #E1E1E1;
	  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
	  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
	  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
	  border-radius: 100px;
	  -webkit-border-radius: 100px;
	  -moz-border-radius: 100px;
	  width: 150px;
	  height: 55px;
	  letter-spacing: 0.03rem;

	  background: #FFFFFF;
	  margin-top: 30px;
    margin-right: 1%;
    margin-right: 2%;
	}
  .btn1.active {
    color: #FF6400;
    border: 1px solid #FF6400;

  }
  .bt{
    width: 100%;
  }
  h1{ width: 120px;
    height: 50px;
    margin-top: 20px;
    border:solid 1px #E1E1E1;
    border-radius: 38%;
    margin: 6px;
    font-size: 25px;
    color: #999999;
  }
  .feedBack .title {
    font-size: 26px;
    color: #666666;
    text-align: left;
  }

  .feedBack .input {
    margin-top: 0.21rem;
    background: #F5F5F5;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    padding: 30px;
    font-size: 30px;
    color: #999999;
    text-align: justify;
    line-height: 42px;
    height: 310px;
  }

  .feedBack .protocol {
    display: flex;
    flex-direction: row;
    margin-top: 0.2rem;
  }

  .feedBack .protocol .cb {
    width: 0.30rem;
    height: 0.30rem;
  }

  .feedBack .protocol .text {
    font-size: 26px;
    color: #999999;
    text-align: left;
    margin-left: 30px;
  }

  .feedBack .phone {
    margin-top: 20px;
    padding-left: 30px;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    font-size: 30px;
    outline: none;
    color: #999999;
    letter-spacing: 0;
    line-height: 42px;
    text-align: left;
    border-radius: 5px;
    height: 78px;
  }

  .feedBack .btn {
    background: #e1e1e1;
    border-radius: 0.05rem;
    height: 0.88rem;
    font-size: 0.28rem;
    margin-top: 1.6rem;
    color: #999999;
    text-shadow: 0 1px 0 #ffffff;
    text-align: center;
  }
</style>
