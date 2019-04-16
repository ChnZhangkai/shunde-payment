<!--进件中,资料填写的第二步-->
<template>
  <div class="page">
    <!--bgcHidden背景图片一开始 让它显示，同时加载一个隐藏的断网占位图，默认是隐藏的，然后断网之后，显示出来，-->
    <NetBroken v-show="netErrorHidden"></NetBroken>
    <div :hidden="bgcHidden">
      <ToolBar class="fixed">资料填写</ToolBar>
      <div class='top margain_top_30_two word_left'>
        以下信息仅将提供银行信审使用！<font class="topText">其中选填项中资料的提交可以提高您的授信额度，请确认提交信息准确。</font>
      </div>
      <!-- 步骤进度 start -->
      <div class='progress_line'>
        <!-- 加一个白色背景图 start -->
        <div class='white_bac'>
          <div class='margin_top50'>
            <div class='common_center_Two margain_top_30 '>
              <div class='radius backcolor_orange'>
                <div class='numbercss '>1</div>
              </div>
              <!-- 来条线 -->
              <div class='lineCss'>
                <div :style="progressCss"></div>
              </div>
              <!-- 画个圆点 -->
              <div class='radius ' :style="backcolor_orange">
                <div class='numbercss'>2</div>
              </div>
              <!-- 来条线 -->
              <div class='lineCss'></div>
              <!-- 画个圆点 -->
              <div class='radius'>
                <div class='numbercss '>3</div>
              </div>
            </div>
            <div class='common_center margain_top_30 splex'>
              <div class='text_orange'>信息完善</div>
              <div :style="text_orange">银行鉴权</div>
              <div>审批通过</div>
            </div>
          </div>
        </div>
        <!-- 加一个白色背景图 end -->
      </div>
      <!-- 步骤进度 end -->
      <!-- 个人信息完善(2/3) -->
      <div class='middle'>
        <div class='section__title'>个人银行卡绑定<span class="accountCss"></span></div>
        <div class="attention" @click="openAttentionDialog()">
          <img class="attentionImg" src="/static/assets/attention.png"/>
          <div class="attentionText">请优先绑定借款人所在地订烟系统中预留银行卡</div>
        </div>
        <!-- 加一个白色底色背景 start -->
        <div class='bgc_white'>
          <!-- 客户银行 -->
          <div class='common_center_Three'>
            <div class='common_margin_left common_font'>
              开户银行<span class="maohao">：</span>
            </div>
            <input
              ref="houseValue"
              v-model="bankName"
              class="expandOne"
              readonly="readonly"
              type='text'
              maxlength="15"
              placeholder='请选择银行'
              @click="toChooceBank()" />
            <img class="rightBtn" @click="toChooceBank()" v-show="chooceBankShow" src="/static/assets/right.png" />
          </div>
          <Divider></Divider>
          <!-- 银行卡号 -->
          <div class='common_center_Three'>
            <div class='common_margin_left common_font'>
              银行卡号<span class="maohao">：</span>
            </div>
            <input
              ref="carNo"
              v-model="bankAccount"
              class="expandOne"
              type='text'
              maxlength="19"
              v-bind:readonly="!setBankAccountShow"
              placeholder='请输入银行卡号'/>
            <img class='clearUserPhoneCss' v-show="bankAccount && setBankAccountShow" @click="clearData(1)" src="/static/assets/clear.png"/>
          </div>
          <Divider></Divider>
          <!-- 手机号码 -->
          <div class='common_center_Three'>
            <div class='common_margin_left common_font'>
              手机号码<span class="maohao">：</span>
            </div>
            <input
              ref="carValue"
              v-model="mobile"
              class="expandOne"
              type='text'
              maxlength="11"
              placeholder='请输入银行预留手机号码'/>
            <img class='clearUserPhoneCss' v-show="mobile" @click="clearData(2)" src="/static/assets/clear.png"/>
          </div>
          <Divider></Divider>
          <!-- 短信验证码 -->
          <div class='common_center_Three'>
            <div class='common_margin_left common_font'>
              短信验证<span class="maohao">：</span>
            </div>
            <input
              ref="phoneVerifyCode"
              v-model="mobileCode"
              class="codeInput"
              placeholder='请输入验证码'
              oninput="if(value.length>4)value=value.slice(0,6)"
              type='number'
              min="6"
              inputmode="numeric"
              pattern="[0-9]*"
              title="Non-negative integral number" />
            <img class='clearUserPhoneCss' v-show="mobileCode" @click="clearData(3)" src="/static/assets/clear.png"/>
            <input
              type="button"
              class="btn999"
              :style="verifyCodeBtnCss"
              :disabled="!verifyCodeBtnEnable"
              :value="verifyCodeBtnVal"
              @click="getVerifyCode" />
          </div>
          <Divider></Divider>
        </div>
      </div>
      <div class="bottomArea">
        <div class='protocol'>
          <!--导入复选框组件-->
          <Checkbox class="checkbox" @onCheckChange="onCheckChange"></Checkbox>
          <div class='tips'>本人已阅读并同意签署<span style="color:#ff6400" @click="toProcol">《银行卡代扣代付协议》</span></div>
        </div>
        <!--底部按钮-->
        <div align="center">
          <input
            type="button"
            value="确认绑定"
            v-bind:class="[pass ? 'btn666' : 'btn555']"
            v-bind:disabled="btnDisabled"
            @click="secondNext()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Checkbox from '../Checkbox'
  import CitySelect from '../CitySelect.vue'
  import NetBroken from '../error/NetBroken.vue'//引入网络中断提示图片
  import Divider from '../DividerOther.vue'
  import SM from '../../api/SessionManager.js'
  import ToolBar from '../ToolBar.vue'

  export default {
    name: SM.WriteTwo,
    components: {Checkbox, CitySelect, ToolBar, Divider, NetBroken},
    data() {
      return {
        bgcHidden: false,//背景图片，true是隐藏
        netErrorHidden: false,//断网占位图片，true是显示
        netError: false,//有网
        house: "",
        car: "",
        isHouseAble: " ",//默认不禁用这张图片的点击事件
        isCarAble: " ",//默认不禁用这张图片的点击事件
        tempType: "",
        text_orange: '',
        backcolor_orange: '',
        progressCss: 'background-color: #ff6400;;width:25%;height: 1px;',
        btnRegister: 'background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);',//立即注册样式
        btnDisabled: true,//立即注册 按钮默认不可用
        token: null,
        province: null,
        city: null,
        area: null,
        check: false,
        vStreet: '',
        vHouseValue: '', // 个人房产价值
        mobile: '', // 个人车辆价值
        vReferrerCode: '', // 推荐人代码
        vPhoneNum: '', // 手机号码
        phoneNumEditable: false, // 手机号码是否可修改，若从缓存里能够获取手机号码，则不可修改
        mobileCode: '', // 手机验证码
        verifyCodeBtnCss: '', // 获取手机验证码按钮css
        verifyCodeBtnEnable: true, // 获取手机验证码按钮是否可用(默认可用)
        verifyCodeBtnVal: '获取验证码', // 获取手机验证码按钮的文本值
        currentTime: 61, // 获取手机验证码倒计时
        countDownEvent: null, // 倒计时事件
        // -----------------------------
        attentionText: '1.借款人需优先绑定订烟系统中保存的银行卡号,以方便进行身份识别</br>2.目前银行卡绑定支持中国银行、中国工商银行、招商银行等20家银行接入,详情以银行卡类型选择项为准',
        bankAccount: '', // 银行卡号
        bankName: '', //银行名称
        uniqueCode: '', //签约绑定唯一码
        chooceBankShow: true,
        setBankAccountShow: true,
        sessionInfo: {
          bankName: '',
          bankAccount: '',
          mobile: '',
          mobileCode: '',
          ifUpdate: '',
          uniqueCode: ''
        },
        pass: false,
        notUpdate: null
      }
    },
    methods: {
      //监听网络状态
      checkNetWork() {
        let that=this;
        let el = document.body;
        if (el.addEventListener) {
          // addEventListener——兼容：firefox、chrome、IE、safari、opera；不兼容IE7、IE8
          window.addEventListener("online", function () {
            that.netError = false;
            sessionStorage.setItem("cacheNet", "false")
          });
          window.addEventListener("offline", function () {
            that.netError = true;
            sessionStorage.setItem("cacheNet", "true")
          });
        }
      },
      // 清除输入框数据
      clearData: function (num) {
        switch (num) {
          case 1:
            this.bankAccount = ''
          break
          case 2:
            this.mobile = ''
          break
          case 3:
            this.mobileCode = ''
          break
          default:
          break
        }
      },
      // 跳转到协议页
      toProcol() {
        let writeOtherInfo = {
          bankName: this.bankName,
          bankAccount: this.bankAccount,
          mobile: this.mobile,
          mobileCode: this.mobileCode,
          uniqueCode: this.uniqueCode,
          notUpdate: this.notUpdate
        }
        sessionStorage.setItem('writeOtherInfo', JSON.stringify(writeOtherInfo))

        this.$router.push(this.$RM.PersonPayProtocol);
      },
      //checkbox勾选框选中与否的状态
      onCheckChange(val) {
        this.check = val;
        sessionStorage.setItem("cacheGou", this.check);
      },
      // 点击请求预绑卡接口,并发送短信验证码
      getVerifyCode () {
        //15分钟之后登陆态失效，强制重新登陆
        if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
          this.$CACHE.showErr();
          return
        }else{
          this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
        }
        var that = this;

        Countly.init({
          app_key: that.$Constants.APPKEY,
          url: that.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: that.$Constants.bindSms,
          "segmentation": {
            appId: window.appId,
          }
        });

        console.info('现在的网络状态是>>>' + that.nonet)
        if (that.nonet) {
          that.$toast("网络异常，请重试");
          that.$router.push(that.$RM.Netbroken);
        } else {

          // 检验表单完整
          if(that.$StringUtils.isEmpty(that.bankName)){
            that.$toast("请选择开户行")
            return
          };

          if(!that.bankAccount || !that.$utils.checkBankCardNo(that.bankAccount)){
            that.$toast("银行卡号校验错误,请重新输入")
            return;
          }

          if(!that.$utils.checkPhone(that.mobile)){
            that.$toast("手机号码格式错误,请重新输入")
            return;
          }

          // 校验是否修改数据
          let bindBankSuccess = sessionStorage.getItem('bindBankSuccess')
          if(this.checkFormDataIfUpdate() && !this.$StringUtils.isEmpty(bindBankSuccess) && bindBankSuccess === 'Y'){
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100510);
            return;
          }

          // 从sessionStorage中获取个人信息第一步缓存的信息
          let writeOneInfo = JSON.parse(sessionStorage.getItem('writeOneInfo'))
          console.log('sessionWriteOneInfo: ' + JSON.stringify(writeOneInfo))

          let writeOtherInfo = JSON.parse(sessionStorage.getItem('writeOtherInfo'))

          const  url = that.$api.ROOT  + that.$Constants.PREDICT_BIND_BANK_CARD;
          let timeStamp = Date.now();
          that.$indicator.open("请稍候...");

          that.$http.post(url, {
            appId: window.appId,
            reqId: that.$StringUtils.getReqId(),
            timestamp:timeStamp,
            sign: that.$utils.generateSign(that.$StringUtils.getReqId(),timeStamp),
            openId: that.token,
            data: {
              // user_id: '18800000900',
              // user_name: '李文恒',
              // id_card_no: '430104198006020900',
              user_id: this.$StringUtils.getPhone(),
              user_name: writeOneInfo.name,
              id_card_no: writeOneInfo.idNo,
              acc_no: this.bankAccount,
              mobile: this.mobile,
              bank_name: this.bankName
            }
          })
            .then(function (res) {

              console.info('成功请求到后台验证码接口>>>');

              // ------------------暂时模拟--------------------------
              // this.uniqueCode = '123456789';

              if (res.data.ret === '0') {
                
                that.$indicator.close();
                this.uniqueCode = res.data.data.uniqueCode;
                writeOtherInfo.uniqueCode = res.data.data.uniqueCode;
                writeOtherInfo.mobile = this.mobile;
                sessionStorage.setItem('writeOtherInfo', JSON.stringify(writeOtherInfo))
                
                that.getCode();
                that.verifyCodeBtnEnable = false
                that.$toast('验证码已发送')

                
                // 存旧数据进缓存以便确认时对比是否修改
                let writeOtherOld = {
                  bankName: this.bankName,
                  bankAccount: this.bankAccount,
                  mobile: this.mobile
                }
                sessionStorage.setItem('writeOtherOld', JSON.stringify(writeOtherOld))

              } else {
                that.$indicator.close();
                console.log('预绑卡失败')
                that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100500)

                // ------------------暂时模拟--------------------------
                // that.getCode();
                // that.verifyCodeBtnEnable = false
                // that.$toast('验证码已发送')
              }
            })
            .catch(function (error) {
              that.$indicator.close();
              console.error(error);
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
            });
        }
      },
      // 短信验证码倒计时
      getCode () {
        var interval = null //倒计时函数
        var that = this;
        var currentTime = that.currentTime

        interval = setInterval(function () {
            currentTime--;
            that.verifyCodeBtnVal = '(' + currentTime + ')重新获取';
            //发送验证码样式变亮
            that.verifyCodeBtnCss = 'color:#999999;border:1px solid #e1e1e1; box-shadow:0 0 4px 0 rgba(193,193,193,0.40);'
            if (currentTime <= 0) {
              clearInterval(interval);
              that.verifyCodeBtnVal = '重新获取';
              that.currentTime = 61;
              that.verifyCodeBtnEnable = true;//按钮可用
              that.verifyCodeBtnCss = "";//样式置灰
            }
          },
          1000
        )
      },

      //点击确认绑定
      secondNext() {
        //15分钟之后登陆态失效，强制重新登陆
        if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
          this.$CACHE.showErr();
          return
        }else{
          this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
        }
        var that = this;

        Countly.init({
          app_key: that.$Constants.APPKEY,
          url: that.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: that.$Constants.bindNextBtn,
          "segmentation": {
            appId: window.appId,
          }
        });

        if (that.nonet) {
          that.$toast("网络异常，请重试");
          that.$router.push(that.$RM.Netbroken);
        } else {
          
          //校验勾选框
          if (!that.check) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.CHECKBOX_WRITEOTHER_PROCOL);
            return;
          }

          // 校验是否修改数据
          if(!this.checkFormDataIfUpdate()){
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100504);
            return;
          }

          // 判断是否已经绑卡成功
          let bindBankSuccess = sessionStorage.getItem('bindBankSuccess')
          if(!this.$StringUtils.isEmpty(bindBankSuccess) && bindBankSuccess === 'Y'){
            // 已经绑卡，直接跳转第三步
            that.$router.push(that.$RM.WriteTwo)
            return;
          }

          // 校验是否存在预绑定唯一码
          if(that.$StringUtils.isEmpty(this.uniqueCode)){
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100503);
            return;
          }

          // 校验短信验证码
          if(that.$StringUtils.isEmpty(this.mobileCode) || this.mobileCode.length < 6){
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100509);
            return;
          }

          // 进件第一步基础信息缓存
          let writeOneInfo = JSON.parse(sessionStorage.getItem('writeOneInfo'))

          // uniqueCode
          let writeOtherInfo = JSON.parse(sessionStorage.getItem('writeOtherInfo'))
          if(writeOtherInfo.uniqueCode){
            this.uniqueCode = writeOtherInfo.uniqueCode
          }

          //开始请求常规进件接口
          that.$indicator.open({
            text: '信息正在提交中，请稍等…',
            spinnerType: 'fading-circle'
          })

          let timeStamp=Date.now();
          let url = that.$api.ROOT  + that.$Constants.BIND_BANK_CARD

          that.$api.post(url, {
            appId: window.appId,
            reqId: that.$StringUtils.getReqId(),
            timestamp:timeStamp,
            sign: that.$utils.generateSign(that.$StringUtils.getReqId(),timeStamp),
            openId: that.token,
            data: {
              unique_code: this.uniqueCode,
              sms_code: this.mobileCode,
              mobile: this.mobile,
              bankName: this.bankName,
              bankAccount: this.bankAccount,
              idCardNo: writeOneInfo.idNo,
              userName: writeOneInfo.name
              // idCardNo: '430104198006020900',
              // userName: '李文恒'
            }
          }, function (res) {
            that.$indicator.close()
            if (res.ret === '0') {

              let writeOtherInfo = {
                bankName: this.bankName,
                bankAccount: this.bankAccount,
                mobile: this.mobile,
                notUpdate: this.notUpdate,
                contractNo: res.msg
              }
              sessionStorage.setItem('writeOtherInfo', JSON.stringify(writeOtherInfo))

              // 绑定成功标识,防止重复发送短信
              sessionStorage.setItem('bindBankSuccess', 'Y')

              // 跳转进件第三步
              that.$router.push(that.$RM.WriteTwo)
            } else if (res.ret === '300060') {
              console.log('验证码超时')
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100506)
            } else if (res.ret === '300062') {
              console.log('验证码错误')
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100507)
            } else {
              console.log('绑卡失败')
              that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_100502)
            }
          }.bind(that), function () {
            that.$indicator.close();
          }.bind(that));
        }
      },
      // 校验表单数据是否经过修改
      checkFormDataIfUpdate () {
        let writeOtherOld = JSON.parse(sessionStorage.getItem('writeOtherOld'));
        if(writeOtherOld){
          console.log(writeOtherOld)
          if(this.bankName !== writeOtherOld.bankName || this.bankAccount !== writeOtherOld.bankAccount || this.mobile !== writeOtherOld.mobile){
            return false;
          }
        }
        return true;
      },
      // 跳转选择银行页面
      toChooceBank: function() {
        var that = this;
        
        if(!that.chooceBankShow){
          return;
        }

        let writeOtherInfo = {
          bankName: this.bankName,
          bankAccount: this.bankAccount,
          mobile: this.mobile,
          mobileCode: this.mobileCode,
          uniqueCode: that.uniqueCode,
          notUpdate: this.notUpdate
        }
        sessionStorage.setItem('writeOtherInfo', JSON.stringify(writeOtherInfo))
        that.$router.push({path: that.$RM.ChooceBank, replace: true});
      },
      // 打开注意事项弹窗
      openAttentionDialog: function() {
        this.$dialog.confirm("<div style='text-align: left; padding: 0 .4rem'>" + this.attentionText +"</div>",
                             '绑卡注意事项',
                             {showCancelButton: false, showConfirmButton: false})
      },
    // 校验表单元素
    checkFrom: function() {
      var that = this
      let bindBankSuccess = sessionStorage.getItem('bindBankSuccess')
      if(!this.$StringUtils.isEmpty(bindBankSuccess) && bindBankSuccess === 'Y'){
        if(that.$StringUtils.isEmpty(that.bankName) ||
           that.$StringUtils.isEmpty(that.bankAccount) ||
           that.$StringUtils.isEmpty(that.mobile)){
           that.pass = false
        } else {
          that.pass = true
          this.btnDisabled = false
        }
      }else{
        if(that.$StringUtils.isEmpty(that.bankName) ||
           that.$StringUtils.isEmpty(that.bankAccount) ||
           that.$StringUtils.isEmpty(that.mobile) ||
           that.$StringUtils.isEmpty(that.mobileCode)){
           that.pass = false
        } else {
          that.pass = true
          this.btnDisabled = false
        }
      }
    },
    },
    // 页面监听
    watch: {
      bankName: function(curVal, oldVal){
        this.checkFrom()
      },
      bankAccount: function(curVal, oldVal){
        this.checkFrom()
      },
      mobile: function(curVal, oldVal){
        this.checkFrom()
      },
      mobileCode: function(curVal, oldVal){
        this.checkFrom()
      }
    },
    // 生命周期初始化方法
    created() {

    },
    //生命周期方法
    mounted() {
      //监听网络状态
      this.checkNetWork();
      //获取登录态
      var token = this.$CACHE.getCache("loginSession");
      this.token = token;//登陆态，赋值给全局变量
      
      // 获取地理位置经纬度
      // if(window.appId==='IOS'){
      //   window.interfacePhone.writeOther()
      // }

      // 获取是否有缓存的第二步填写资料，若有则在页面加载完成后初始化
      let writeOtherInfo =  sessionStorage.getItem('writeOtherInfo')
      console.log(writeOtherInfo)
      if (writeOtherInfo) {
        var info = JSON.parse(writeOtherInfo)
        if(info.notUpdate){
          this.chooceBankShow = false
          this.setBankAccountShow = false
          this.notUpdate = true
        }
        this.bankName = info.bankName
        this.bankAccount = info.bankAccount
        this.mobile = info.mobile
        this.mobileCode = info.mobileCode
        this.uniqueCode = info.uniqueCode
      } else {
        sessionStorage.setItem('writeOtherInfo', JSON.stringify(this.sessionInfo))
      }

    }
  }
</script>

<style scoped>
  .fixed {
    position: fixed;
    width: 100%;
    margin-top: 0;
    top:0;
    z-index: 2;
  }

  .protocol {
    display: flex;
    margin-top: 20px;

  }

  .protocol .checkbox {
    width: 30px;
    height: 30px;
    margin-left: 0.6rem;
  }

  .protocol .tips {
    letter-spacing: 2px;
    color: #c9c9c9;
    font-size: 26px;
    line-height: 30px;
    margin-left: 20px;
    margin-top: 0.03rem;
  }

  .top {
    font-size: 26px;
    color: #999;
    text-align: justify;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.50);
  }

  .middle {
    font-size: 28px;
  }

  .section__title {
    font-weight: bold;
    font-size: 32px;
    color: #111111;
    text-align: left;
    padding:0.4rem;
    background-color: #f2f2f2;
  }

  .common_margin_left {
    width: 2.3rem;
    margin-left: 25px;
  }

  .lineCss {
    background-color: #ddd;
    width: 32%;
    height: 2px;
  }

  .lineCss_orange {
    background-color: #ff6400;
    width: 32%;
    height: 2px;
  }

  .common_center {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .common_center_Two {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .margain_top_30 {
    margin-top: 30px;
  }

  /* 画个圆点 */
  .radius {
    background-color: #b1b1b1;
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 100%;
  }

  .word_left {
    margin-left: 20px;
    margin-right: 20px;

  }

  .margain_top_30_two {
    margin-top: 30px;
  }

  .commonCss {
    display: flex;
    align-items: center;
  }

  .progress_line {
    display: flex;
    justify-content: center;
  }

  .white_bac {
    background-size: 80% 195px;
    margin-top: 0.4rem;
    margin-left: 0;
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    width: 100%;
    height: 155px;
  }

  .margin_top50 {
    margin-top: 50px;
  }

  .splex {
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    margin-left: 59px;
    margin-right: 35px;
    line-height: 10px;
  }

  .numbercss {
    text-align: center;
    color: #fff;
  }

  .backcolor_orange {
    background-color: #ff6400;
  }

  .text_orange {
    color: #ff6400;
  }

  .common_font {
    font-size: .4rem;
    color: #666666;
  }

  .bgc_white {
    background-color: #fff;
  }

  .believeCss {
    font-size: 24px;
    color: #878787;
    text-align: left;
  }

  .believeInputCss {
    width: 5.6rem;
    border: 0;
    margin-bottom: 0.7rem;
    font-size: 0.4rem;
  }

  .common_center_Three {
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }

  textarea {
    width: 6rem;
    height: 1.6rem;
    border: 0;
    font-size: 30px;
    /*去掉多行文本框右下角的伸缩显示，详情见https://bbs.csdn.net/topics/390764944/*/
    resize: none;
    margin-left: -0.1rem;
  }

  input::-webkit-input-placeholder {
    font-size: 29px;
    color: #999;

  }

  textarea::-webkit-input-placeholder {
    font-size: 25px;
    color: #999;
    /*margin-left: -0.05rem;*/
  }

  .expandOne {
    width: 5.6rem;
    border: 0;
    font-size: 0.4rem;
    margin-left: -0.1rem
  }

  .juzhong {
    display: flex;
  }

  .page {
    height: 95%;
    background-color: #f2f2f2;
    padding-top: 1rem;
  }

  .accountCss {
    font-size: 26px;
    color: #666666;
    margin-left: 0.2rem;
  }

  .operation {
    font-size: 26px;
    color: #017ad4;
    margin-left: 4.5rem;
  }

  .btn666 {
    margin-top: 50px;
    margin-bottom: 50px;
    background-image: linear-gradient(-90deg, #FF6400 0%, #FF6400 100%);
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    width: 8.7rem;
    height: 1.3rem;
    border: none;
    font-size: 30px;
    color: #ffffff;
  }

  .btn555 {
    margin-top: 50px;
    margin-bottom: 50px;
    background-color: #C3C7CC;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    width: 8.7rem;
    height: 1.3rem;
    border: none;
    font-size: 30px;
    color: #ffffff;
  }

  .clearUserPhoneCss {
    width: 0.373333rem;
    height: 0.373333rem;
  }

  .garbageCss {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    right: 0;
  }

  .emerinput {
    width: 6.3rem;
    border: 0;
    font-size: 0.4rem;

  }

  .accountNameSpaceCss {
    letter-spacing: 0.32rem;
  }

  .input-info-lable-cls {
    letter-spacing: 0.06rem;
  }

  .margin_top_bottom {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .verticode_font {
    font-size: 0.4rem;
    color: #000;
    border: 0;
  }

  .codeInput {
    width: 2.5rem;
    border: 0;
    font-size: 0.4rem;
    margin-left: -0.1rem
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
    /*margin: auto;*/
    font-size: 26px;
    color: #ff6400;
    text-align: center;
    line-height: 40px;
    -webkit-appearance: none; /*解决iphone safari上的按钮圆角问题*/
    margin-left: 1rem;
    margin-right: 0.5rem;
  }

  .myAddress {
    margin-top: -0.1rem !important;
    /*margin-left: -0.1rem!important;*/
  }

  .maohao {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }

  .rightBtn {
    float: right;
    width: 0.34rem;
    height: 0.5rem;
    /* margin-left: .6rem; */
  }

  .attention {
    color: #FF6400;
    background-color: #FFE8C1;
    height: .7rem;
    display: flex;
  }

  .attentionImg {
    width: 0.5rem;
    height: 0.5rem;
    margin: .05rem .1rem 0 .3rem;
  }

  .attentionText {
    margin: .08rem .05rem .05rem .05rem;
    font-size: .34667rem;
  }

  .bottomArea {
    margin-top: 2rem;
    border-top: 1px solid #E9E9E9;
  }

  .topText{
    color: #FF6400;
  }

</style>
