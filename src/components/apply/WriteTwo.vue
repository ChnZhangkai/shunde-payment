<!--进件中,资料填写的第二步-->
<template>
  <div class="page">
    <!--bgcHidden背景图片一开始 让它显示，同时加载一个隐藏的断网占位图，默认是隐藏的，然后断网之后，显示出来，-->
    <NetBroken v-show="netErrorHidden"></NetBroken>
    <div :hidden="bgcHidden">
      <ToolBar class="fixed">资料填写</ToolBar>
      <div class='top margain_top_30_two word_left'>
        以下信息仅将提供银行信审使用！其中选填项中资料的提交可以提高您的授信额度，请确认提交信息准确。
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
      <!-- 个人信息完善(2/2) -->
      <div class='middle'>
        <div class='section__title'>个人信息完善(2/2)<span class="accountCss">(选填项)</span></div>
        <!-- 加一个白色底色背景 start -->
        <div class='bgc_white'>
          <!-- 城市级联 -->
          <div class='common_center_Three'>
            <div class='juzhong'>
              <div class="common_margin_left common_font input-info-lable-cls">个人房产地址<span class="maohao">：</span></div>
              <div>
                <textarea
                  ref="rStreet"
                  v-model="vStreet"
                  placeholder='请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等'
                  oninput="if(value.length>50)value=value.slice(0,50)"
                  id="feedbackcontent"
                  maxlength="50">
                </textarea>
              </div>
            </div>
          </div>
          <Divider></Divider>
          <!-- 个人房产价值 -->
          <div class='common_center_Three'>
            <div class='common_margin_left common_font input-info-lable-cls'>个人房产价值<span class="maohao">：</span></div>
            <input
              ref="houseValue"
              v-model="vHouseValue"
              @blur="handleHouseValueBlur"
              class="expandOne"
              type='text'
              maxlength="15"
              placeholder='请输入个人房产价值(万元)'/>
            <img class='clearUserPhoneCss' v-show="vHouseValue" @click="clearData(1)" src="/static/assets/clear.png"/>
          </div>
          <Divider></Divider>
          <!-- 个人车辆号码 -->
          <div class='common_center_Three'>
            <div class='common_margin_left common_font input-info-lable-cls'>个人车辆号码<span class="maohao">：</span></div>
            <input
              ref="carNo"
              v-model="vCarNo"
              class="expandOne"
              type='text'
              maxlength="8"
              placeholder='请输入个人车辆号码'/>
            <img class='clearUserPhoneCss' v-show="vCarNo" @click="clearData(2)" src="/static/assets/clear.png"/>
          </div>
          <Divider></Divider>
          <!-- 个人车辆价值 -->
          <div class='common_center_Three'>
            <div class='common_margin_left common_font input-info-lable-cls'>个人车辆价值<span class="maohao">：</span></div>
            <input
              ref="carValue"
              v-model="vCarValue"
              @blur="handleCarValueBlur"
              class="expandOne"
              type='text'
              maxlength="15"
              placeholder='请输入个人车辆价值(万元)'/>
            <img class='clearUserPhoneCss' v-show="vCarValue" @click="clearData(3)" src="/static/assets/clear.png"/>
          </div>
          <Divider></Divider>
          <!-- 推荐人代码 -->
          <div class='common_center_Three'>
            <div class='common_margin_left common_font input-info-lable-cls'>推&nbsp;荐&nbsp;人&nbsp;代码<span class="maohao">：</span></div>
            <input
              ref="referrerCode"
              v-model="vReferrerCode"
              class="expandOne"
              type='text'
              maxlength="20"
              placeholder='请输入推荐人代码'/>
            <img class='clearUserPhoneCss' v-show="vReferrerCode" @click="clearData(4)" src="/static/assets/clear.png"/>
          </div>
          <Divider></Divider>
        </div>
        <div class='section__title '></div>
        <!-- 加一个白色底色背景 start -->
        <div class='bgc_white'>
          <!-- 手机号码 -->
          <div class='common_center_Three'>
            <div class='common_margin_left common_font input-info-lable-cls'>手&nbsp;&nbsp;机&nbsp;&nbsp;号&nbsp;&nbsp;码<span class="maohao">：</span></div>
            <input
              ref="phoneNum"
              v-model="vPhoneNum"
              class="expandOne"
              type='text'
              maxlength="11"
              :readonly="!phoneNumEditable"
              placeholder='请输入手机号码'/>
            <img class='clearUserPhoneCss' v-show="phoneNumEditable && vPhoneNum" @click="clearData(5)" src="/static/assets/clear.png"/>
          </div>
          <Divider></Divider>
          <!-- 手机验证码 -->
          <div class='common_center_Three'>
            <div class='common_margin_left common_font input-info-lable-cls'> 手机&nbsp;验&nbsp;证&nbsp;码<span class="maohao">：</span></div>
            <input
              ref="phoneVerifyCode"
              v-model="vPhoneVerifyCode"
              class="codeInput"
              placeholder='请输入验证码'
              oninput="if(value.length>4)value=value.slice(0,4)"
              type='number'
              min="0"
              maxlength="4"
              inputmode="numeric"
              pattern="[0-9]*"
              title="Non-negative integral number" />
            <img class='clearUserPhoneCss' v-show="vPhoneVerifyCode" @click="clearData(6)" src="/static/assets/clear.png"/>
            <input
              type="button"
              class="btn999"
              :style="verifyCodeBtnCss"
              :disabled="!verifyCodeBtnEnable"
              :value="verifyCodeBtnVal"
              @click="getVerifyCode" />
          </div>
        </div>
      </div>
      <div class='protocol'>
        <!--导入复选框组件-->
        <Checkbox class="checkbox" @onCheckChange="onCheckChange"></Checkbox>
        <div class='tips'>本人已阅读并同意签署<span style="color:#ff6400" @click="toProcol">《个人授权协议》</span></div>
      </div>
      <!--底部按钮-->
      <div align="center">
        <input
          type="button"
          class="btn666"
          value="下一步"
          :style="btnRegister"
          v-bind:disabled="btnDisabled"
          @click="secondNext()" />
      </div>
    </div>
  </div>
</template>

<script>
  import Checkbox from '../Checkbox'
  import NetBroken from '../error/NetBroken.vue'//引入网络中断提示图片
  import Divider from '../Divider.vue'
  import SM from '../../api/SessionManager.js'
  import ToolBar from '../ToolBar.vue'

  export default {
    name: SM.WriteTwo,
    components: {Checkbox, ToolBar, Divider, NetBroken},
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
        progressCss: 'background-color: #ff6400;;width:50%;height: 1px;',
        btnRegister: 'background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);',//立即注册样式
        btnDisabled: false,//立即注册 按钮默认不可用
        token: null,
        check: false,
        vStreet: '',
        vHouseValue: '', // 个人房产价值
        vCarNo: '', // 个人车辆号码
        vCarValue: '', // 个人车辆价值
        vReferrerCode: '', // 推荐人代码
        vPhoneNum: '', // 手机号码
        phoneNumEditable: false, // 手机号码是否可修改，若从缓存里能够获取手机号码，则不可修改
        vPhoneVerifyCode: '', // 手机验证码
        verifyCodeBtnCss: '', // 获取手机验证码按钮css
        verifyCodeBtnEnable: true, // 获取手机验证码按钮是否可用(默认可用)
        verifyCodeBtnVal: '获取验证码', // 获取手机验证码按钮的文本值
        countDown: 60, // 获取手机验证码倒计时
        countDownEvent: null // 倒计时事件
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
      getOpenApp () {
        // 跳转登陆失效的页面
        if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
          this.$router.replace({path: '/security/fingerLockView'})
        } else {
          this.$router.replace(this.$RM.Login)
        }
      },
      /**
       * 清除输入框数据
       */
      clearData: function (num) {
        switch (num) {
          case 1:
            this.vHouseValue = ''
          break
          case 2:
            this.vCarNo = ''
          break
          case 3:
            this.vCarValue = ''
          break
          case 4:
            this.vReferrerCode = ''
          break
          case 5:
            this.vPhoneNum = ''
          break
          case 6:
            this.vPhoneVerifyCode = ''
          break
          default:
          break
        }
      },
      /**
       * 跳转到协议页
       */
      toProcol() {
        // 把已经填写的选填项资料缓存起来
        let writeTwoInfo = {
          street: this.vStreet,
          houseValue: this.vHouseValue,
          carNo: this.vCarNo,
          carValue: this.vCarValue,
          referrerCode: this.vReferrerCode,
          phoneVerifyCode: this.vPhoneVerifyCode
        }
        sessionStorage.setItem('writeTwoInfo', JSON.stringify(writeTwoInfo))

        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.dataClick,
          "segmentation": {
            appId: window.appId,
          }
        });
        this.$router.push(this.$RM.PersonProtocol);
      },
      toOpert() {
        //跳转去操作指引页面
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.handleClick,
          "segmentation": {
            appId: window.appId,
          }
        });

        this.$router.push(this.$RM.Operation);
      },
      onCheckChange(val) {
        //checkbox勾选框选中与否的状态
        this.check = val;
        sessionStorage.setItem("cacheGou", this.check);

      },
      /**
       * 点击获取验证码按钮获取手机验证码
       */
      getVerifyCode () {
        this.verifyCodeBtnCss = 'color:#999999;border:1px solid #e1e1e1; box-shadow:0 0 4px 0 rgba(193,193,193,0.40);'
        this.verifyCodeBtnEnable = false
        this.verifyCodeBtnVal = `(${this.countDown})重新获取`
        this.countDownEvent = this.getVerifyCodeCountDown()
      },
      /**
       * 获取手机验证码倒计时
       */
      getVerifyCodeCountDown () {
        setTimeout(() => {
          if (this.countDown > 1) {
            this.countDown -= 1
            this.verifyCodeBtnVal = `(${this.countDown})重新获取`
            this.getVerifyCodeCountDown()
          } else {
            clearTimeout(this.countDownEvent)
            this.countDown = 60
            this.verifyCodeBtnCss = ''
            this.verifyCodeBtnEnable = true
            this.verifyCodeBtnVal = '获取验证码'
          }
        }, 1000)
      },
      //点击下一步，表单校验
      secondNext() {
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
          // 校验提交的表单数据
          if (!this.checkFormData()) {
            return
          }
          //校验勾选框
          if (!that.check) {
            //如果不正确
            that.$toast('请勾选阅读并同意签署《个人授权协议》后点击下一步');
            return;
          }
          //获取缓存的地理位置
          var userLocation = sessionStorage.getItem("location");
          if (that.$StringUtils.isEmpty(userLocation)) {
            userLocation = "未获得地理位置，录入测试地址";
          }

          //开始请求常规进件接口
          that.$indicator.open({
            text: '信息正在提交中，请稍等…',
            spinnerType: 'fading-circle'
          })
          // 从sessionStorage中获取个人信息第一步缓存的信息
          let writeOneInfo = JSON.parse(sessionStorage.getItem('writeOneInfo'))
          // 获取绑卡缓存信息
          let writeOtherInfo = JSON.parse(sessionStorage.getItem('writeOtherInfo'))
          let timeStamp=Date.now();
          that.$api.post(that.$Constants.APPLYLOANDATA, {
            appId: window.appId,
            reqId: that.$StringUtils.getReqId(),
            timestamp:timeStamp,
            sign: that.$utils.generateSign(that.$StringUtils.getReqId(),timeStamp),
            openId: that.token,
            data: {
              name: writeOneInfo.name,
              idNo: writeOneInfo.idNo,
              phoneNo: this.vPhoneNum,
              spouseInfoType: writeOneInfo.spouseInfoType,
              spouseName: writeOneInfo.spouseName,
              spouseIdCard: writeOneInfo.spouseIdCard,
              spousePhoneNum: writeOneInfo.spousePhoneNum,
              relationship: writeOneInfo.relationship,
              contactName: writeOneInfo.contactName,
              contactPhoneNo: writeOneInfo.contactPhoneNo,
              houseAddress: this.vStreet.replace(/\s/g, ''),
              houseValue: this.vHouseValue.replace(/[\u4e00-\u9fa5]/g, ''),
              carNo: this.vCarNo,
              carValue: this.vCarValue.replace(/[\u4e00-\u9fa5]/g, ''),
              checkCode: this.vPhoneVerifyCode,
              businessLicense: writeOneInfo.businessLicense,
              referralNo: this.vReferrerCode,
              location: userLocation,
              mac: sessionStorage.getItem('fingerprint'),
              corpName: writeOneInfo.entName,
              bankName: writeOtherInfo.bankName,
              bankAccount: writeOtherInfo.bankAccount,
              contractNo: writeOtherInfo.contractNo
            }
          }, function (res) {
            that.$indicator.close()
            if (res.ret === '0') {
              let custNo = res.data.custNo;//客户编号
              let applyId = res.data.applyId;//申请编号
              that.$sessionManager.clearWrite()

              // 审核成功后，把部分进件参数传递到下一个页面，与平安接口交互时使用
              let integrappinterfaceParams = {
                businessLicense: writeOneInfo.businessLicense,
                custNo: custNo,
                applyId: applyId,
                cityCode: res.data.cityCode,
                corpName: writeOneInfo.entName,
                relatedApplyArray: [
                  {
                    APPLICANT_TYPE: 'MAIN',
                    REPR_CLIENT_NAME: writeOneInfo.name,
                    REPR_GLOBAL_NO: writeOneInfo.idNo,
                    RESERVER_PHONE_NO: this.vPhoneNum
                  }
                ],
                assetsArray: []
              }
              // 如果婚姻状态为已婚，则需要在关联申请人数组中添加配偶信息
              writeOneInfo.spouseInfoType === '02' && integrappinterfaceParams.relatedApplyArray.push({
                APPLICANT_TYPE: 'MATE',
                REPR_CLIENT_NAME: writeOneInfo.spouseName,
                REPR_GLOBAL_NO: writeOneInfo.spouseIdCard,
                RESERVER_PHONE_NO: writeOneInfo.spousePhoneNum
              })
              // 如果填写了房产相关信息，则需要在资产信息数组添加房产信息
              if (this.vStreet || this.vHouseValue) {
                integrappinterfaceParams.assetsArray.push({
                  ASSETTYPE: 'HOUSE',
                  ASSETS_VALUE: this.vHouseValue.replace(/[\u4e00-\u9fa5]/g, ''),
                  ASSETINFO: this.vStreet
                })
              }
              // 如果填写了车辆相关信息，则需要在资产信息数组添加车辆信息
              if (this.vCarNo || this.vCarValue) {
                integrappinterfaceParams.assetsArray.push({
                  ASSETTYPE: 'CAR',
                  ASSETS_VALUE: this.vCarValue.replace(/[\u4e00-\u9fa5]/g, ''),
                  ASSETINFO: this.vCarNo
                })
              }

              sessionStorage.setItem('integrappinterfaceParams', JSON.stringify(integrappinterfaceParams))
              // 请求成功后清除第一步与第二步中填写的资料
              sessionStorage.removeItem('writeOneInfo')
              sessionStorage.removeItem('writeTwoInfo')
              // 跳转页面
              that.$router.push({
                path: this.$RM.applyResult,
                query: {
                  applyResult: 'Y'
                }
              })
            } else {
              that.$sessionManager.clearWrite()
              if (res.ret === '300001') { // 没有查询到匹配的数据仓库的客户信息
                this.$dialog.confirm(res.msg, '', {
                  showCancelButton: false,
                  confirmButtonText: '确定'
                }).then(() => {
                  return false
                })
              } else if (res.ret === '300032') { // 审核拒绝
                that.$router.push(that.$RM.applyResult + "?applyResult=N")
                return false
              } else if (res.ret === '300036') { // 客户的额度为0
                that.$dialog.confirm(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300036, '', {
                  showCancelButton: false,
                  confirmButtonText: '返回首页'
                }).then(() => {
                  that.$router.push(that.$RM.Main)
                })
                return false
              } else if (res.ret === '300037') { //客户的地区未开展该业务
                that.$dialog.confirm(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300037, '', {
                  showCancelButton: false,
                  confirmButtonText: '返回首页'
                }).then(() => {
                  that.$router.push(that.$RM.Main)
                })
                return false
              } else if (res.ret === '300005') { // 授权激活失效
                that.$dialog.confirm('授权失效', '', {
                  showCancelButton: false,
                  confirmButtonText: '返回首页'
                }).then(() => {
                  that.$router.push(that.$RM.Main)
                })
                return false
              } else { // 其他情况
                this.$dialog.confirm(res.msg, '', {
                  showCancelButton: false,
                  confirmButtonText: '确定'
                }).then(() => {
                  return false
                })
              }
            }
          }.bind(that), function () {
            that.$indicator.close();
          }.bind(that));
        }
      },
      /**
       * 校验提交的表单数据
       */
      checkFormData () {
        // 校验房产地址格式
        if (this.vStreet && !this.$utils.checkAddress(this.vStreet.replace(/\s/g, ''))) {
          this.$toast('地址格式有误，仅限于中文、英文、数字')
          return false
        }

        // 校验房产价值格式
        if (this.vHouseValue && !this.$utils.checkRmbAmt(this.vHouseValue)) {
          this.$toast('个人房产价值为2位小数金额')
          return false
        }

        // 校验个人车辆号码格式
        if (this.vCarNo && !this.$utils.checkCarNo(this.vCarNo)) {
          this.$toast('车牌号格式不正确，请重新输入')
          return false
        }

        // 校验个人车辆价值格式
        if (this.vCarValue && !this.$utils.checkRmbAmt(this.vCarValue)) {
          this.$toast('个人车辆价值为2位小数金额')
          return false
        }

        // 校验推荐人代码格式
        if (this.vReferrerCode && !/^[0-9]{1,}$/.test(this.vReferrerCode)) {
          this.$toast('推荐人代码格式不正确，请重新输入')
          return false
        }

        // 校验手机验证码
        if (!this.vPhoneVerifyCode) {
          this.$toast('手机验证码不能为空')
          return false
        }
        if (!/^[0-9]{4}$/.test(this.vPhoneVerifyCode)) {
          this.$toast('请输入4位数字手机验证码')
          return false
        }

        return true
      },
      /**
       * 房产价值输入框失焦后添加单位(万元)
       */
      handleHouseValueBlur (evnet) {
        let val = event.target.value
        val = val.replace(/[\u4e00-\u9fa5]/g, '')
        val && (this.vHouseValue = `${val}万元`)
      },
      /**
       * 车辆价值输入框失焦后添加单位(万元)
       */
      handleCarValueBlur (event) {
        let val = event.target.value
        val = val.replace(/[\u4e00-\u9fa5]/g, '')
        val && (this.vCarValue = `${val}万元`)
      }
    },
    //生命周期方法
    mounted() {
      //监听网络状态
      this.checkNetWork();
      //获取登录态
      var token = this.$CACHE.getCache("loginSession");
      this.token = token;//登陆态，赋值给全局变量

      // 获取缓存里的手机号,若有值则初始化手机号且不能手动填写手机号码，若无值则可以手动填写手机号码
      var cphone = this.$StringUtils.getPhone()
      if (!this.$StringUtils.isEmpty(cphone)) {
        this.vPhoneNum = cphone
      } else {
        this.phoneNumEditable = true
      }

      // 获取是否有缓存的第二步填写资料，若有则在页面加载完成后初始化
      let cachedWriteTwoInfo = sessionStorage.getItem('writeTwoInfo')
      if (cachedWriteTwoInfo) {
        cachedWriteTwoInfo = JSON.parse(cachedWriteTwoInfo)
        this.vStreet = cachedWriteTwoInfo.street
        this.vHouseValue = cachedWriteTwoInfo.houseValue
        this.vCarNo = cachedWriteTwoInfo.carNo
        this.vCarValue = cachedWriteTwoInfo.carValue
        this.vReferrerCode = cachedWriteTwoInfo.referrerCode
        this.vPhoneVerifyCode = cachedWriteTwoInfo.phoneVerifyCode
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
    margin-left: 0.3rem;
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
    width: 260px;
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
    font-size: 30px;
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
    margin-bottom: 10px;
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
    height: 100%;
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
    background-image: linear-gradient(-90deg, #ffa366 0%, #ffa366 100%);
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
    margin-left: 0.5rem;
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

</style>
