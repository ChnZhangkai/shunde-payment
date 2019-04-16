<!--新商盟授权页面-->
<template>
  <div class="divClass" style="height: 100%;position:fixed; z-index:999; top:0;">
    <ToolBar>专属服务</ToolBar>
    <Divider></Divider>
    <div class="tip-div">
      <p>以下信息将仅提供银行进行授信评估。</p>
      <p><span style="color: orange;">请录入当地烟草主管部门所指定的网上订烟系统信息！</span></p>
      <p>(包括但不限于：中烟新商盟、卷烟销售网等)</p>
    </div>
    <p class="accessTitle">商户身份确认</p>
    <div class="importFrame">
      <EditInfoItem
        isEdit
        :isRight="false"
        placeHolder="请输入订烟系统账号"
        desc="订烟系统账号："
        ref="acct"
        type="text"></EditInfoItem>
      <EditInfoItem
        isEdit
        :isRight="false"
        placeHolder="请输入订烟系统密码"
        desc="订烟系统密码："
        ref="password"
        @input.native="change"
        type="password">
      </EditInfoItem>
    </div>
    <div class="businessAccess">
      <div class="protocol">
        <Checkbox class="cb" @onCheckChange="onCheckChange"></Checkbox>
        <span class="text">本人已阅读并同意签署
          <span class="protocolContent" @click="toProtocol">《商户经营性数据授信查询》</span>
        </span>
      </div>
      <div class="btnGroup">
        <CommitButton name="商户身份确认" :isInputNonEmpty="isInputNonEmpty" @click.native="commit"></CommitButton>
      </div>
    </div>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import EditInfoItem from '../EditInfoItem.vue'
  import Checkbox from '../Checkbox.vue'
  import CommitButton from '../CommitButton.vue'
  import VerifyCode from '../VerifyCode.vue'
  import SM from '../../api/SessionManager.js'
  export default{
    name: SM.BusinessAccess,
    components: {ToolBar, Divider, EditInfoItem, Checkbox, CommitButton, VerifyCode},
    methods: {
      toProtocol() {
        this.$router.push(this.$RM.BusinessService)
        this.saveInputData();
        if( appId === window.appId) {
          Countly.init({
            app_key: "fac364a78f023a9e1d95e7a3d9be08a53144831b",
            url: "http://10.0.18.37:32768", //your server goes here
            debug: true,

          })
          Countly.track_sessions();
          Countly.track_pageview();
          Countly.add_event({
            key: "dataClick",
            "segmentation": {
              appId: window.appId,
            }
          });
        }

      },
      /**
       * 在跳转到协议页面前保存已填写的新商盟账号与密码
       */
      saveInputData(){
        let businessAccessInfo = {
          acct: this.$refs.acct.editContent,
          password: this.$refs.password.editContent
        }
        sessionStorage.setItem('businessAccessInfo', JSON.stringify(businessAccessInfo))
      },
      change(){
        this.isInputNonEmpty = !this.$StringUtils.isEmpty(this.$refs.acct.editContent) && !this.$StringUtils.isEmpty(this.$refs.password.editContent)
      },
      onCheckChange: function (val) {
        this.check = val
      },
      commit(){

        //15分钟之后登陆态失效，强制重新登陆
        if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
          this.$CACHE.showErr();
          return
        }else{
          this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
        }
        if (!this.isInputNonEmpty) {
          return
        }
        if (!this.check) {
          this.$toast('请勾选阅读并同意签署《商户经营性数据授信查询》后点击验证')
          return
        }

        // 校验账号或密码是否为空
        if (!this.$refs.acct.editContent || !this.$refs.password.editContent) {
          this.$toast('请输入账号与密码')
          return false
        }
        // 去掉账号或密码前后的空格
        this.$refs.acct.editContent = this.$refs.acct.editContent.trim()
        this.$refs.password.editContent = this.$refs.password.editContent.trim()

        // rsa加密新商盟密码
        var publicKey = this.$utils.PUBLIC_KEY
        var encrypt_rsa = new this.$RSA.RSAKey();
        encrypt_rsa = this.$RSA.KEYUTIL.getKey(publicKey);
        var encStr = encrypt_rsa.encrypt(this.$refs.password.editContent)
        encStr = this.$RSA.hex2b64(encStr);

        this.$indicator.open()
        this.$api.post(this.$Constants.BUSINESS_ACCESS, {
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId(),
          "data": {
            "newBusinessAccount": this.$refs.acct.editContent,
            "newBusinessAccountPwd": encStr,
            "phoneNo": this.$StringUtils.getPhone()
          }
        }, function (result) {
          this.$indicator.close()
          if (result && result.ret) {
            if (result.ret == '000442') {
              this.$toast('填写信息有误，无法验证，请核对信息填写正确后点击验证')
            } else {
              // 成功授权后清除sessionStorage中的账号密码信息
              sessionStorage.removeItem("businessAccessInfo")
              // 把授权激活返回数据存入sessionStorage中后续使用
              sessionStorage.setItem('creditActiveInfo', JSON.stringify(result.data))
              this.$router.replace(this.$RM.RemindNote)
            }
          }
        }.bind(this), function (err) {
          this.$toast('非常抱歉！目前网络拥堵，暂无法提交分析，请稍后尝试提交！')
          this.$indicator.close()
        }.bind(this))
      },
      getCode(){
        if (this.$StringUtils.isEmpty(this.$refs.phone.editContent)) {
          this.$toast(this.$ErrorMsg.EMPTY_PHONE)
          return
        }
        if (!this.$regx.isPhone(this.$refs.phone.editContent)) {
          this.$toast(this.$ErrorMsg.ERROR_PHONE)
          return
        }
        this.$refs.codeBtn.getCode();
      }
    },
    data(){
      return {
        isInputNonEmpty: false,
        check: false,
      }
    },
    mounted(){
      // 若之前填写过，则初始化账号密码为填写过的值
      let businessAccessInfo = sessionStorage.getItem('businessAccessInfo')
      if (businessAccessInfo) {
        businessAccessInfo = JSON.parse(sessionStorage.getItem('businessAccessInfo'))
        this.$refs.acct.editContent = businessAccessInfo.acct || ''
        this.$refs.password.editContent = businessAccessInfo.password || ''
      }
      this.change()
    }
  }
</script>
<style scoped>
  .btnGroup {
    padding: 0 30px;
  }

  .businessAccess {
    background: #ffffff;
    padding-bottom: 100%;
  }

  .businessAccess .protocol {
    display: flex;
    flex-direction: row;
    padding-left: 30px;
    padding-top: 20px;
  }

  .businessAccess .protocol .cb {
    width: 30px;
    height: 30px;
  }

  .businessAccess .protocol .text {
    font-size: 28px;
    color: #999999;
    margin-left: 30px;
    text-align: left;
  }

  .businessAccess .protocol .text .protocolContent {
    color: #FF6400;
  }

  .tip-div {
    width: 100%;
    height: 100px;
    margin-top: 40px;
    font-size: 25px;
    font-weight: 400;
    line-height: 35px;
  }
  .accessTitle {
    font-size: 36px;
    color: #111111;
    text-align: left;
    line-height: 44px;
    margin-top: 60px;
    font-weight: bolder;
    margin-left: 30px;
  }
  .tip-div p {
    margin-left: 30px;
    color: #666666;
  }
  .importFrame{
    border: 2px solid #e1e1e1;
    width: 90%;
    margin-left: 5%;
    margin-top: 4%;

  }

</style>
