<!--新商盟授权页面-->
<template>
  <div class="page">
    <!--先把断网的图片加载出来,等到下面进入v-else条件的时候就可以直接用上-->
    <NetBroken v-show="false"></NetBroken>
    <div v-if="netErrShow">`

      <ToolBar >我的授权激活</ToolBar>
      <form @submit.prevent="toNext">
        <div class="topTxtCss">
          <div class="topTxt">
            请录入当地烟草主管部门所指定的网上订烟系统信息！


            <div style="color: #999999">(包括但不限于：中烟新商盟、卷烟销售网等)</div>
          </div>
        </div>
        <div class='bgc_white'>
          <div class='commonFlex'>
            <div class='common_margin_left common_font'>订烟系统账号<span class="maohao">：</span>
              <input v-model="subForm.vNewAccount" class='expand'  readonly="readonly"/>
            </div>
          </div>
          <!-- 来条灰色横线 -->
          <Divider></Divider>
          <div class='commonFlex'>
            <div class='common_margin_left common_font'>订烟系统密码<span class="maohao">：</span>
              <input v-model="subForm.vAccountPwd" type='password'
                     placeholder='请输入订烟系统密码' class='expand'/>
            </div>
            <img class='clearUserPhoneCss' v-show="subForm.vAccountPwd" @click="clearData(1)"
                 src="/static/assets/clearInput.png"/>
          </div>
          <!-- 来条灰色横线 -->
          <Divider></Divider>
          <div class='commonFlex'>
            <div class='common_margin_left common_font'>手机号码<span class="maohao">：</span>
              <input class='expandOne' type='tel' placeholder='请输入有效手机号码'
                     v-model="subForm.vPhone" ref="rPhone" min="0" inputmode="numeric" pattern="[0-9]*"
                     title="Non-negative integral number"/>
            </div>
            <img class='clearUserPhoneCss' v-show="subForm.vPhone" @click="clearData(2)"
                 src="/static/assets/clearInput.png"/>
          </div>
          <!-- 来条灰色横线 -->
          <Divider></Divider>
          <div class='commonFlex'>
            <div class='common_margin_left verticode_font'>手机验证码<span class="maohao">：</span>
              <!-- 输入验证码 -->
              <input v-model="subForm.vYanCode" type='text' min="0" inputmode="numeric"
                     pattern="[0-9]*" title="Non-negative integral number"
                     placeholder='请输入手机验证码' class='codeInput'/>
            </div>
            <img class='clearUserPhoneCss' v-show="subForm.vYanCode" @click="clearData(3)"
                 src="/static/assets/clearInput.png"/>
            <input type="button" class="btn999" :style="btnBackStyle" v-bind:disabled="vertDisabled" :value="time"
                   @click="getVerificationCode"/>
          </div>
          <!-- 来条灰色横线 -->
          <Divider></Divider>
        </div>
        <div class='protocol'>
          <!--导入复选框组件-->
          <label class="checkboxCss">
            <Checkbox class="checkbox" @onCheckChange="onCheckChange"></Checkbox>
            <span class='tips'>本人已阅读并同意签署</span>
          </label>
          <span @click="toProcol" class="proTxt">《商户经营性数据授信查询》</span>
        </div>
        <div align="center">
          <input type="submit" class="btn666" value="提交" :style="btnRegister" v-bind:disabled="btnDisabled"
          />
        </div>
      </form>
    </div>
    <div v-else>
      <NetBroken></NetBroken>
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
  import NetBroken from '../error/NetBroken.vue'//引入网络中断提示图片

  export default{
    name: SM.AuthorizationActivat,
    components: {ToolBar, Divider, EditInfoItem, Checkbox, CommitButton, VerifyCode,NetBroken},
    data(){
      return {
        netErrShow: true,//断网页面显示与否
        subForm: {
          vNewAccount: "",//新商盟账号
          vAccountPwd: "",//新商盟密码
          vPhone: "",//手机号码
          vYanCode: "",//手机验证码
          check: false,
        },
        nonet: "",//没网
        vertDisabled: false,//验证码按钮可用
        btnBackStyle: '',//发送验证码样式置灰
        currentTime: 61,
        time: '获取验证码', //倒计时
        btnRegister: "",//下一步按钮的样式
        isInputNonEmpty: false,
        account: '',
        check: false,
      }
    },
    created(){
      this.checkNetWork();
    },
    methods: {
      //监听网络状态,断网
      checkNetWork(){
        let that = this;
        let el = document.body;
        if (el.addEventListener) {
//          addEventListener——兼容：firefox、chrome、IE、safari、opera；不兼容IE7、IE8
          window.addEventListener("online", function () {
            console.log("有网....");
            that.netErrShow = true;

          });
          window.addEventListener("offline", function () {
            console.error("网络走丢了....");
            that.netErrShow = false;
          });
        }
      },
      toNext() {
        let that = this;
        console.log('现在的网络状态是>>>' + that.nonet);
        if (that.nonet) {
          that.$router.replace(that.$RM.Netbroken);
          that.$utils.toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);  //跳转断网页面
        } else {
          //表单校验
          if (!that.validata.checkForm(that.subForm)) {
            that.$VALID.dialog(that.validata.errorList[0]);
            return
          }
          //缓存新商盟信息
          that.$CACHE.putCache("BusinessData", JSON.stringify(that.subForm));
          //新商盟密码加密：
          var publicKey = that.$utils.PUBLIC_KEY;//获取公钥
          var encrypt_rsa = new that.$RSA.RSAKey();
          encrypt_rsa = that.$RSA.KEYUTIL.getKey(publicKey);
          var encStr = encrypt_rsa.encrypt(that.subForm.vAccountPwd);
          encStr = that.$RSA.hex2b64(encStr);

          //开始网络请求
          const url =this.$api.ROOT + this.$Constants.BUSINESS_ACCESS
//          const url = that.$EASYMOCK.queryCustInfoByNewBusinessAccount;//校验新商盟账号信息
          that.$http.post(url, {
            appId: window.appId,
            reqId: this.$StringUtils.getReqId(),
            timestamp: Date.now(),
            openId: this.$StringUtils.getOpenId(),
            data: {
              openId:this.$StringUtils.getOpenId(),//openId
              newBusinessAccount: sessionStorage.getItem("newReturnBusinessAccount"),
              newBusinessAccountPwd: encStr,
              phoneNo: that.subForm.vPhone,
              checkCode: that.subForm.vYanCode
            }
          })
            .then(res => {
              if (res.data.ret == '0') {
                  that.activation();
              }
              else {
                console.error('返回码有误！');
                console.error(res.data.ret + "," + res.data.msg);
                that.$toast(res.data.msg);
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
      onBtnChange(){
        if (!this.$StringUtils.isEmpty(this.subForm.vPhone) && !this.$StringUtils.isEmpty(this.subForm.vAccountPwd) && !this.$StringUtils.isEmpty(this.subForm.vYanCode) && this.subForm.check == true) {
          this.btnRegister = 'background-image:linear-gradient(133deg,rgba(255,157,0,1) 0%,rgba(255,100,0,1) 100%);  color: #fff1e8;';//按钮亮色
//          this.btnDisabled = false//按钮可用
        } else {
          this.btnRegister = '';//暗色
//          this.btnDisabled = true//按钮不可用
        }
      },
      toProcol(){
        this.$router.push(this.$RM.Protocol);
      },
      //点击图片获取验证码
      getVerificationCode() {
        var that = this;
        console.info('现在的网络状态是>>>' + that.nonet)
        if (that.nonet) {
          that.$toast("网络异常，请重试")
          //跳转断网页面
          that.$router.push({path: '/components/error/Netbroken'})
        } else {

          // 获取手机号
          var userPhone = that.$refs.rPhone.value;
          console.info("输入的手机号>>>" + userPhone)
          //校验手机号为空
          if (that.$StringUtils.isEmpty(userPhone)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100007);
            return;
          } else {
            if (!that.$utils.checkPhone(userPhone)) {
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              return
            }
          }

          //开始网络请求
          var reqId = that.$utils.generateSignTime();
          const  url=that.$api.ROOT +that.$Constants.OPERATE;

          that.$indicator.open("请稍候...");
          that.$http.post(url, {
            reqId: reqId,
            appId: window.appId,
            data: {phoneNo: userPhone, operType: '5'}//operType操作类型0.注册，1.登陆，5.注册获取验证码，3.忘记密码，6设置密码 8先验证是否已经有注册
          })
            .then(function (res) {

              console.info('成功请求到后台验证码接口>>>');
              console.info(res.data);
              if (res.data.ret === '0') {
                that.$indicator.close();
                var yanCode = res.data.data.verificationCode;
                if (yanCode != null && yanCode != '') {
                  console.info('后台返回的手机验证码是>>>' + yanCode);
                  that.$toast('验证码已发送');
                  //倒计时1分钟，才可重新点击获取
                  that.disabled = ''//按钮不可用
                  that.getCode();
                }
              } else {
                that.$indicator.close();
                if (res.data.ret === '000002') {
                  that.$dialog.alert("    ",that.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
                  that.$StringUtils.loginOut();
                  return
                }

                console.warn('发送验证码失败...');
                that.$toast(res.data.msg);

              }
            })
            .catch(function (error) {
              that.$indicator.close();
              console.error(error);
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });
          //倒计时1分钟，才可重新点击获取
          that.getCode();
          that.vertDisabled = ''//按钮不可用
        }
      },
      //验证码倒计时
      getCode() {
        var interval = null; //倒计时函数
        var that = this;
        var currentTime = that.currentTime;
        interval = setInterval(function () {
            currentTime--;
            that.time = '(' + currentTime + ')重新获取';
            //按钮颜色置灰
            that.btnBackStyle = 'color:#999999;border:1px solid #e1e1e1; box-shadow:0 0 4px 0 rgba(193,193,193,0.40);'
            if (currentTime <= 0) {
              clearInterval(interval);
              that.time = '获取验证码';
              that.currentTime = 61;
              that.vertDisabled = false;//按钮可用
              that.btnBackStyle = "";//按钮颜色变亮
            }
          },
          1000
        )
      },
      activation() {
        this.$api.post(this.$Constants.IS_UPDATE_ACTIVATION, {
          //        "appId": window.appId,
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId(),
          "data": {
            "newBusinessAccount": sessionStorage.getItem("newReturnBusinessAccount")
      }
      }, function (result) {
          console.info(result.data);
          if (result.ret === '0') {
            console.warn('发送验证码失败456');
                  this.$router.push({
                    name: '/main',
                    params: {
                      selected: '首页'
                    }
                  })
          }
        }.bind(this))
      },
      //清除输入框数据
      clearData(num) {
        let that = this;
        if (num == 1) {
          that.subForm.vAccountPwd = '';
        }
        if (num == 2) {
          that.subForm.vPhone = '';
        }
        if (num == 3) {
          that.subForm.vYanCode = '';
        }
      },
      //缓存回显
      cacheShow(){
        let that = this;
        sessionStorage.getItem("inputPhone"),
//        let cacheAccount = "460550105184";

          that.subForm.vNewAccount =sessionStorage.getItem("newReturnBusinessAccount").replace(/(\d{5})\d{4}(\d{3})/,"$1****$2")
        let BusinessData = that.$CACHE.getCache("BusinessData");
        if (!that.$StringUtils.isEmpty(BusinessData)) {
          BusinessData = JSON.parse(BusinessData);
          //新商盟密码
          if (!that.$StringUtils.isEmpty(BusinessData.vAccountPwd)) {
            that.subForm.vAccountPwd = BusinessData.vAccountPwd;
          }
          //手机号码
          if (!that.$StringUtils.isEmpty(BusinessData.vPhone)) {
            that.subForm.vPhone = BusinessData.vPhone;
          }
          //验证码
          if (!that.$StringUtils.isEmpty(BusinessData.vYanCode)) {
            that.subForm.vYanCode = BusinessData.vYanCode;
          }

        }

      },
      onCheckChange: function (val) {
        this.subForm.check = val;
        this.onBtnChange();
      },
      validForm(){
        let that = this;
        //初始化表单校验的值
        that.validata = new that.$VALID.proveUtil({
          vAccountPwd: that.$VALID.rules.newAccountPwd, //新商盟密码规则
          vPhone: that.$VALID.rules.phoneRule, //手机号规则
          vYanCode: that.$VALID.rules.verifycode, //数字验证码规则
          check: that.$VALID.rules.agree
        }, {
          vAccountPwd: that.$VALID.messages.newAccountPwd,
          vPhone: that.$VALID.messages.phoneRule,
          vYanCode: that.$VALID.messages.verifycode,
          check: that.$VALID.messages.agree
        });
      },
    },
    mounted(){
      let that = this;
      that.validForm();//初始化表单验证
      //缓存回显
      that.cacheShow();

    },
    watch: {
      //监听这两个值的改变，一改变样式也相对改变
      'subForm.vAccountPwd': {
        handler(val){

          this.onBtnChange();
          this.subForm.vAccountPwd=val;
          this.$CACHE.putCache("BusinessData",JSON.stringify(this.subForm));//存入缓存
          if (val.length > this.$CONST.CData.idCardLen) {
            this.subForm.vAccountPwd = String(val).slice(0, this.$CONST.CData.idCardLen);
          }
        }
      },
      'subForm.vPhone': {
        handler(val){

          this.onBtnChange();
          this.subForm.vPhone=val;
          this.$CACHE.putCache("BusinessData",JSON.stringify(this.subForm));//存入缓存
          if (val.length > this.$CONST.CData.phoneLen) {
            this.subForm.vPhone = String(val).slice(0, this.$CONST.CData.phoneLen);
          }
        }
      },
      'subForm.vYanCode': {
        handler(val){

          this.onBtnChange();
          this.subForm.vYanCode=val;
          this.$CACHE.putCache("BusinessData",JSON.stringify(this.subForm));//存入缓存
          if (val.length > this.$CONST.CData.codeLen) {
            this.subForm.vYanCode = String(val).slice(0, this.$CONST.CData.codeLen);
          }
        }
      },
    },
  }
</script>
<style scoped>
  .fixed {
    position: fixed;
    width: 100%;
    margin-top: 0;
    top: 0;
  }
  .clearUserPhoneCss {
    width: 0.373333rem;
    height: 0.373333rem;
    margin-right: 0.3rem;
  }

  input::-webkit-input-placeholder {
    font-size: 29px;
    color: #999;

  }

  .expand {
    font-size: 0.4rem;
    border: none;
    color: #999;
  }

  .btn666 {
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    border: none;
    font-size: 30px;
    color: #999999;
    width: 690px;
    height: 88px;
    background: linear-gradient(145deg, rgba(240, 240, 240, 1) 0%, rgba(221, 221, 221, 1) 100%);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
  }

  .btn999 {
    background: #ffffff;
    border: 1px solid #ff6400;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.30);
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    width: 178px;
    height: 58px;
    font-size: 26px;
    color: #ff6400;
    text-align: center;
    line-height: 40px;
    -webkit-appearance: none; /*解决iphone safari上的按钮圆角问题*/
    margin-right: 0.5rem;
  }

  .codeInput {
    width: 3.3rem;
    font-size: 0.4rem;
    flex-grow: 1;
    border: none;
  }

  .verticode_font {
    font-size: 0.4rem;
    color: #7F7F7F;
    border: 0;
  }

  .expandOne {
    border: 0;
    font-size: 0.4rem;
  }

  .maohao {
    margin-left: 0.1rem;
  }

  .common_font {
    font-size: 30px;
    color: #7F7F7F;
  }

  .common_margin_left {
    margin-left: 25px;
  }

  .commonFlex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 12px;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }

  .bgc_white {
    background-color: #fff;
  }

  .topTxtCss {
    margin: 0.4rem;
  }

  .topTxt {
    margin: auto;
    width: 690px;
    height: 76px;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 151, 46, 1);
    line-height: 38px;
    text-shadow: 0px 1px 0px rgba(255, 255, 255, 1);
  }

  .page {
    height: 100%;
    background: #f5f5f5;
  }

  .btnGroup {
    padding: 0 30px;
  }

  .businessAccess {
    background: #f5f5f5;
    padding-bottom: 100%;
  }

  .protocol {
    display: flex;
    margin-top: 20px;
    margin-left: 0.3rem;
    margin-bottom: 0.2rem;
  }

  .checkboxCss {
    display: flex;
  }

  .protocol .checkbox {
    width: 30px;
    height: 30px;
  }

  .protocol .proTxt {
    letter-spacing: 2px;
    font-size: 26px;
    line-height: 30px;
    margin-top: 0.06rem;
    color: #ff6400;
  }

  .protocol .tips {
    letter-spacing: 2px;
    color: #666666;
    font-size: 26px;
    line-height: 30px;
    margin-left: 20px;
    margin-top: 0.06rem;
  }


</style>
