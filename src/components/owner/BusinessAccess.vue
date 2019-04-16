<!--新商盟授权页面-->
<template>
  <div style="height: 100%">
    <ToolBar>我的估值</ToolBar>
    <Divider></Divider>
    <div class="tip-div">
      <div class="img-area"></div>
      <p>以下信息将仅提供银行进行授信评估。</p>
      <p><span style="color: orange;">请录入当地烟草主管部门所指定的网上订烟系统信息！</span></p>
      <p>(包括但不限于：中烟新商盟、卷烟销售网等)</p>
    </div>
    <Divider></Divider>
    <EditInfoItem
      isEdit
      :isRight="false"
      placeHolder="请输入订烟系统账号"
      desc="订烟系统账号："
      ref="acct"
      @input.native="acctChange"
      type="text">
      <img class='clear-icon' v-show="!acctEmpty" @click="clearData(1)" src="/static/assets/clearInput.png"/>
      </EditInfoItem>
    <EditInfoItem
      isEdit
      :isRight="false"
      placeHolder="请输入订烟系统密码"
      desc="订烟系统密码："
      ref="password"
      @input.native="change"
      type="password">
      <img class='clear-icon' v-show="!passwordEmpty" @click="clearData(2)" src="/static/assets/clearInput.png"/>
    </EditInfoItem>
    <!-- <EditInfoItem isEdit :isRight="false" placeHolder="请输入有效手机号码" desc="手机号码：" ref="phone" @input.native="change"
                  maxLength="11"></EditInfoItem>
    <EditInfoItem isEdit :isRight="false" placeHolder="请输入手机验证码" desc="手机验证码：" ref="code" @input.native="change"
                  maxLength="4">
      <VerifyCode style="margin-right: 0.3rem; font-size: 0.3rem;margin-top: 0" @click.native="getCode"
                  ref="codeBtn"></VerifyCode>
    </EditInfoItem> -->
    <div class="businessAccess">
      <div class="protocol">
        <Checkbox class="cb" @onCheckChange="onCheckChange"></Checkbox>
        <span class="text">本人已阅读并同意签署
          <span class="protocolContent" @click="toProtocol">《商户经营性数据授信查询》</span>
        </span>
      </div>
      <div class="btnGroup">
        <CommitButton name="点击获取商户估值" :isInputNonEmpty="isInputNonEmpty" @click.native="commit"></CommitButton>
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
        this.passwordEmpty = this.$StringUtils.isEmpty(this.$refs.password.editContent)
      },
      acctChange () {
        this.acctEmpty = this.$StringUtils.isEmpty(this.$refs.acct.editContent)
      },
      onCheckChange: function (val) {
        this.check = val
      },
      commit(){
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
            if (result.ret === '0') {
              // 成功授权后清除sessionStorage中的账号密码信息
              sessionStorage.removeItem("businessAccessInfo")
              // 弹出温馨提示
              this.$dialog.alert(this.$Constants.TIP_AFTER_CREDIT_ACTIVE, '温馨提示')
              // 把授权激活返回数据存入sessionStorage中后续使用
              sessionStorage.setItem('creditActiveInfo', JSON.stringify(result.data))
              this.$router.replace(this.$RM.AccessSuccess)
            } else {
              this.$toast(result.msg)
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
        this.$indicator.open('请求验证码中')
        this.$api.post(this.$Constants.BUSINESS_SEND_SMS, {
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId(),
          "data": {
            "phoneNo": this.$refs.phone.editContent
          }
        }, function (result) {
          this.$indicator.close()
          if (result && result.data) {
            this.$toast('获取验证码成功')
          }
        }.bind(this), function (err) {
          this.$indicator.close()
        }.bind(this))
      },
      /**
       * 清空表单数据
       */
      clearData (num) {
        switch (num) {
          case 1:
            this.$refs.acct.editContent = ''
            this.acctEmpty = true
          break
          case 2: 
            this.$refs.password.editContent = ''
            this.passwordEmpty = true
          break
          default:
          break
        }
      }
    },
    data(){
      return {
        isInputNonEmpty: false,
        check: false,
        acctEmpty: true,
        passwordEmpty: true
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
    background: #f5f5f5;
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
    color: #666666;
    margin-left: 30px;
    text-align: left;
  }

  .businessAccess .protocol .text .protocolContent {
    color: orange;
  }

  .tip-div {
    width: 100%;
    height: 315px;
    font-size: 25px;
    font-weight: 400;
    line-height: 35px;
  }

  .tip-div .img-area {
    width: 150px;
    height: 150px;
    margin: 25px auto;
    background: url(/static/assets/myWorth_img.png) no-repeat;
    background-size: 100% 100%;
  }

  .tip-div p {
    margin-left: 30px;
    color: #666666;
  }

  .clear-icon {
    width: 0.373333rem;
    height: 0.373333rem;
    margin-right: 0.5rem;
  }

</style>
