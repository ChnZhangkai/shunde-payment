<!--进件中,资料填写的第一步的页面-->
<template>
  <div class="page">
    <ToolBar class="fixed">资料填写</ToolBar>
    <div class='top margain_top_30_two word_left'>
      以下信息仅将提供银行信审使用！其中选填项中资料的提交可以提高您的授信额度，请确认提交信息准确。
    </div>
    <!-- 步骤进度star -->
    <div class='progress_line'>
      <!-- 加一个白色背景图 start -->
      <div class='white_bac'>
        <div class='margin_top50'>
          <div class='common_center_Two margain_top_30 '>
            <div class='radius ' :style="backcolor_orange">
              <div class='numbercss '>1</div>
            </div>
            <!-- 来条线 -->
            <div class='lineCss'>
              <div :style="progressCss"></div>
            </div>
            <!-- 画个圆点 -->
            <div class='radius'>
              <div class='numbercss '>2</div>
            </div>
            <!-- 来条线 -->
            <div class='lineCss'></div>
            <!-- 画个圆点 -->
            <div class='radius'>
              <div class='numbercss '>3</div>
            </div>
          </div>
          <div class='common_center margain_top_30 splex'>
            <div :style="text_orange">信息完善</div>
            <div>银行鉴权</div>
            <div>审批通过</div>
          </div>
        </div>
      </div>
      <!-- 加一个白色背景图 end -->
    </div>
    <!-- 步骤进度 end -->

    <!-- 中部借款人信息 -->
    <!--加入表单验证-->
    <div class='middle'>
      <div class='section__title'>个人信息完善<span class="accountCss">(1/2)</span></div>
      <!-- 加一个白色底色背景start -->
      <div class='bgc_white'>
        <!-- 姓名 -->
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'>借&nbsp;款&nbsp;&nbsp;人&nbsp;&nbsp;姓&nbsp;&nbsp;名<span class="maohao">：</span></div>
          <input
            name='lawName'
            ref="rLawName"
            v-model="vLawName"
            class='expandOne'
            type='text'
            maxlength="6"
            placeholder='请输入姓名' />
          <img class=' clearUserPhoneCss' v-show="vLawName" @click="clearData(1)" src="/static/assets/clear.png"/>
        </div>
        <Divider></Divider>
        <!-- 身份证号码 -->
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'>借款人身份证号<span class="maohao">：</span></div>
          <input
            ref="rIdcard"
            v-model="vIdcard"
            class='expandOne'
            type='text'
            placeholder='请输入有效身份证号码' />
          <img class=' clearUserPhoneCss' v-show="vIdcard" @click="clearData(2)" src="/static/assets/clear.png"/>
        </div>
        <Divider></Divider>
        <!-- 营业执照注册号 -->
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'>
            <p>营业执照注册号<span class="maohao">：</span></p>
            <p class="smaller-tip-cls">(统一社会信用代码)</p>
          </div>
          <input
            ref="businessLicenseNo"
            v-model="businessLicenseNo"
            class='expandOne'
            type='text'
            maxlength="18"
            placeholder='请输入营业执照注册号' />
          <img class='clearUserPhoneCss' v-if="businessLicenseNo !== ''" @click="clearData(3)" src="/static/assets/clear.png"/>
        </div>
        <Divider></Divider>
        <!-- 配偶信息类型选择 -->
        <div class='common_center_Three' @click="selectSpouseType">
          <div class='common_margin_left common_font'>婚&nbsp;&nbsp;&nbsp;&nbsp;姻&nbsp;&nbsp;&nbsp;&nbsp;状&nbsp;&nbsp;&nbsp;况<span class="maohao">：</span></div>
          <input
            ref="spouseInfoi"
            v-model="spouseInfoType"
            class='expandOne'
            type='text'
            placeholder='请选择'
            readonly />
          <img class='img' src="/static/assets/right_arrow.png"/>
        </div>
        <Divider></Divider>
        <!-- 婚姻状况选择popup -->
        <SpouseInfoPopup
          ref="spouseTypePicker"
          :popupVisible="spouseInfoVisible"
          @onValueChange="handleSpouseTypeChange">
        </SpouseInfoPopup>
        <!-- 配偶信息 -->
        <div v-if="toggleInputSpouseInfo">
          <div class='common_center_Three'>
            <div class='common_margin_left common_font'>
              配偶姓名<span class="maohao">：</span>
            </div>
            <input
              ref="spouseName"
              v-model="spouseName"
              class='expandOne'
              type='text'
              maxlength="6"
              placeholder='请输入配偶姓名' />
            <img class='clearUserPhoneCss' v-if="spouseName !== ''" @click="clearData(4)" src="/static/assets/clear.png"/>
          </div>
          <Divider></Divider>
          <div class='common_center_Three'>
            <div class='common_margin_left common_font'>
              <p>配偶身份证号码<span class="maohao">：</span></p>
            </div>
            <input
              ref="spouseIdCard"
              v-model="spouseIdCard"
              class='expandOne'
              type='text'
              maxlength="18"
              placeholder='请输入配偶身份证号' />
            <img class='clearUserPhoneCss' v-if="spouseIdCard !== ''" @click="clearData(5)" src="/static/assets/clear.png"/>
          </div>
          <Divider></Divider>
          <div class='common_center_Three'>
            <div class='common_margin_left common_font'>
              <p>配偶手机号码<span class="maohao">：</span></p>
            </div>
            <input
              ref="spousePhoneNum"
              v-model="spousePhoneNum"
              class='expandOne'
              type='text'
              maxlength="11"
              placeholder='请输入配偶手机号码' />
              <img class='contact-name-css' @click="chooseSpouseName" src="/static/assets/contact.png"/>
            <img class='clearUserPhoneCss' v-if="spousePhoneNum !== ''" @click="clearData(6)" src="/static/assets/clear.png"/>
          </div>
          <Divider></Divider>
        </div>
        <!-- <div class='common_center_Three'>
          <div class='common_margin_left common_font'>手机号码<span class="maohao">：</span></div>
          <input v-model="vPhone" class='expandOne' readonly="readonly"/>
        </div>
        <Divider></Divider>
        <div class='common_center margin_top_bottom'>
          <div class='common_margin_left verticode_font'> 手机验证码<span class="maohao">：</span></div>
          <input placeholder='请输入验证码' class='codeInput' @blur='checkYanCode' ref="rYanCode" v-model="vYanCode"
                 oninput="if(value.length>4)value=value.slice(0,4)" type='number' min="0" inputmode="numeric"
                 pattern="[0-9]*" title="Non-negative integral number"/>
          <img class=' clearUserPhoneCss' v-show="vYanCode" @click="clearData(3)" src="/static/assets/clear.png"/>

          <input type="button" class="btn999" :style="btnVertBackStyle" v-bind:disabled="vertDisabled" :value="time"
                 @click="getVerificationCode()"/>
        </div>
        <Divider></Divider> -->
      </div>
      <!-- 加一个白色底色背景 end -->
      <div class='section__title '><!-- 紧急联系人信息<span class="accountCss">(必填项)</span> --></div>
      <!-- 加一个白色底色背景 start -->
      <div class='bgc_white'>
        <div class='common_center_Three'>
          <div class='commonCss' @click="choose">
            <div class='common_margin_left common_font'>紧急联系人关系<span class="maohao">：</span></div>
            <input class="rightText" placeholder="请选择" v-model="vRelation" type='text' readonly="readonly"/>
            <img src="/static/assets/right_arrow.png" class="img">
          </div>
        </div>
        <Divider></Divider>
        <!-- 紧急联系人姓名 -->
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'>紧急联系人姓名<span class="maohao">：</span></div>
          <input
            ref="rUrgentName"
            v-model="vUrgentName"
            class='emerinput'
            type='text'
            readonly
            placeholder='请选择紧急联系人' />
          <img class='contact-name-css' @click="chooseUrgentName" src="/static/assets/contact.png"/>
          <img class=' clearUserPhoneCss' v-if="vUrgentName" @click="clearData(7)" src="/static/assets/clear.png"/>
        </div>
        <Divider></Divider>
        <!-- 紧急联系人电话 -->
        <div class='common_center_Three'>
          <div class='common_margin_left common_font'>紧急联系人号码<span class="maohao">：</span></div>
          <input
            ref="rUrgentPhone"
            v-model="vUrgentPhone"
            class='emerinput'
            type='text'
            readonly
            placeholder='请选择紧急联系人' />
          <img class=' clearUserPhoneCss' v-show="vUrgentPhone" @click="clearData(8)" src="/static/assets/clear.png"/>
        </div>
        <Divider></Divider>
      </div>
    </div>
    <!-- 加一个白色底色背景 end -->
    <div align="center">
      <input type="button" class="btn666" value="下一步" :style="btnRegister" v-bind:disabled="btnDisabled"
             @click="firstNext()"/>
    </div>
    <!-- 紧急联系人关系选择popup -->
    <ContactRelationPicker
      ref="picker"
      @onValueChange="onValueChange">
    </ContactRelationPicker>
  </div>

</template>
<script>
  import Checkbox from '../Checkbox'
  import RelationPicker from '../Picker'
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  import SM from '../../api/SessionManager.js'
  import SpouseInfoPopup from '../SpouseInfoPopup.vue'
  import ContactRelationPicker from '../ContactRelationPicker.vue'
  import locationFun from '../../api/location.js';

  // 婚姻状况描述与代码
  const spouseTypeConstants = {
    '未婚': '01',
    '已婚': '02',
    '离异': '03',
    '丧偶': '04'
  }

  // 家庭关系描述与代码
  const homeReConstants = {
    '父母': '01',
    '儿女': '02',
    '兄弟姐妹': '03'
  }

  //  ios第一次获取地理位置回调
  // window.onLocAccessIos = function () {
  //   locationFun.getLocation(function (location) {
  //     //获取经纬度
  //     console.log('ios第一次地理位置成功授权的回调');
  //     alert('ios第一次地理位置成功授权的回调')
  //     sessionStorage.setItem('location', location);
  //   });
  // };

  //  ios第二次获取地理位置回调
  window.getIOSLocation = function (locationIOS) {
    sessionStorage.setItem('location', locationIOS);
  };

  //  ios第二次获取地理位置回调
  // window.getIOSLocation = function (latitude,longitude) {
  //   locationFun.getIOSLocationIos(latitude,longitude,function (locationIOS) {
  //     alert('ios地理位置经纬度获取并解析成功---> ' +locationIOS)
  //     sessionStorage.setItem('location', locationIOS);
  //   });
  // };

  export default {
    name: SM.WriteOne,
    components: {Checkbox, RelationPicker, ToolBar, Divider, ContactRelationPicker, SpouseInfoPopup},
    data () {
      return {
        idCardLength: 18,
        lawNameLength: 6,
        urgentNameLength: 6,
        testCheck: null,
        vertiCode: null,
        text_orange: '',
        backcolor_orange: '',
        progressCss: '',
        btnRegister: 'background-image:linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);',//下一步样式
        btnDisabled: false,//下一步按钮默认不可用
        token: null,
        vertDisabled: false,//验证码按钮可用
        btnVertBackStyle: '',//发送验证码样式置灰
        check: false,
        nonet: false,
        time: '获取验证码', //倒计时
        alreaUserCode: null,
        vRelation: null,//紧急联系人关系
        vLawName: '', // 借款人姓名
        vIdcard: '', // 借款人身份证号
        vUrgentPhone: '',
        vUrgentName: '',
        businessLicenseNo: '', // 营业执照注册号
        spouseInfoVisible: false, // 婚姻状况类型popup是否显示
        spouseInfoType: '', // 已选择的婚姻状况类型
        toggleInputSpouseInfo: false, // 是否显示填写配偶信息输入框(当选择已婚类型才显示)
        spouseName: '', // 配偶姓名
        spouseIdCard: '', // 配偶身份证号
        spousePhoneNum: '', // 配偶手机号
        custPhoneNo: '', // 客户手机号码
      }
    },
    // 初始化
    created() {
      // 调用原生获取位置授权信息
      this.saveLocation()
    },
    //生命周期方法
    mounted() {
      //15分钟之后登陆态失效，强制重新登陆
      if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
        this.$CACHE.showErr();
        return
      }else{
        this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
      }
      this.token = this.$CACHE.getCache("loginSession");//登陆态，赋值给全局变量

      // 获取缓存里的手机号
      var cphone = this.$StringUtils.getPhone();
      if (!this.$StringUtils.isEmpty(cphone)) {
        this.custPhoneNo = cphone
      }

      // 如果有缓存过的必填项相关资料，则在页面加载完成后初始化到页面
      let cachedWriteOneInfo = sessionStorage.getItem('writeOneInfo')
      if (cachedWriteOneInfo) {
        cachedWriteOneInfo = JSON.parse(cachedWriteOneInfo)
        // 获取缓存的借款人信息
        this.vLawName = cachedWriteOneInfo.name
        this.vIdcard = cachedWriteOneInfo.idNo
        this.businessLicenseNo = cachedWriteOneInfo.businessLicense
        // 若婚姻状况为已婚，则显示配偶相关信息
        if (cachedWriteOneInfo.spouseInfoType && cachedWriteOneInfo.spouseInfoType === '02') {
          this.spouseInfoType = '已婚'
          this.toggleInputSpouseInfo = true
          this.spouseName = cachedWriteOneInfo.spouseName
          this.spouseIdCard = cachedWriteOneInfo.spouseIdCard
          this.spousePhoneNum = cachedWriteOneInfo.spousePhoneNum
        } else {
          // 若婚姻状况为未婚，则根据常量定义翻译为具体的婚姻状况
          for (let k in spouseTypeConstants) {
            if (spouseTypeConstants[k] === cachedWriteOneInfo.spouseInfoType) {
              this.spouseInfoType = k
              break
            }
          }
        }
        // 获取缓存的紧急联系人信息
        for (let k in homeReConstants) {
          if (homeReConstants[k] === cachedWriteOneInfo.relationship) {
            this.vRelation = k
            break
          }
        }
        this.vUrgentName = cachedWriteOneInfo.contactName
        this.vUrgentPhone = cachedWriteOneInfo.contactPhoneNo
      }

      // 调用方法保存通话记录与通讯录信息
      this.saveAddressBook()
      this.saveCallRecords()
    },
    methods: {
      choose: function () {
        this.$refs.picker.popupVisible = true
      },
      onValueChange: function (value) {
        this.vRelation = value;
      },
      /**
       * 当输入框有值时，点击输入框后面的清除图标清空对应输入框的值
       */
      clearData (num) {
        switch (num) {
          case 1:
            this.vLawName = ''
          break
          case 2:
            this.vIdcard = ''
          break
          case 3:
            this.businessLicenseNo = ''
          break
          case 4:
            this.spouseName = ''
          break
          case 5:
            this.spouseIdCard = ''
          break
          case 6:
            this.spousePhoneNum = ''
          break
          case 7:
            this.vUrgentName = ''
          break
          case 8:
            this.vUrgentPhone = ''
          break
          default:
          break
        }
      },
      toProcol() {
        //跳转个人协议
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.agreementClick,
          "segmentation": {
            appId: window.appId,
          }
        });
        this.$router.push(this.$RM.PersonProtocol);
      },
      onCheckChange: function (val) {
        //nCheckChange勾选框的状态
        this.check = val;
      },
      getRelation(res) {
        this.vRelation = res
      },
      /**
       * 点击选择配偶信息类型
       */
      selectSpouseType () {
        // 点击选择婚姻状况时，弹出popup选择
        this.spouseInfoVisible = true
      },
      /**
       * 当选择的婚姻状况类型发生改变时的触发事件
       */
      handleSpouseTypeChange (val) {
        if (val === 'cancle') {
          // 若取消则只隐藏popup，其他数据不做改变
          this.spouseInfoVisible = false
        } else {
          // 若选择了某种婚姻状况类型,婚姻状况更改为已选择的类型并隐藏popup
          this.spouseInfoType = val
          this.spouseInfoVisible = false
          // 当选择的婚姻为已婚时，显示填写配偶信息的输入框，其他情况则隐藏
          if (val === '已婚') {
            this.toggleInputSpouseInfo = true
          } else {
            this.toggleInputSpouseInfo = false
          }
        }
      },
      /**
       * 点击下一步，表单校验
       */
      firstNext() {
        //15分钟之后登陆态失效，强制重新登陆
        if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
          this.$CACHE.showErr();
          return
        }else{
          this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
        }
        var that = this;

        if (that.nonet) {
          that.$toast("网络异常，请重试");
          that.$router.push(that.$RM.Netbroken);
        } else {
          // 校验借款人姓名是否为空与格式是否合规
          if (that.$StringUtils.isEmpty(that.vLawName)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_200004);
            return;
          }
          if (!(that.$utils.checkName(that.vLawName))) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.LAWNAMEERROR);
            return;
          }

          // 校验身份证是否为空与格式是否合规
          if (that.$StringUtils.isEmpty(that.vIdcard)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_200005);
            return;
          }
          if (!that.$utils.check18IdCard(that.vIdcard)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IDCARD_IS_ERROR);
            return;
          }

          // 校验营业执照注册号是否为空与格式是否合规
          if (!that.businessLicenseNo) {
            that.$toast('营业执照注册号不能为空')
            return
          }
          if (!that.$utils.checkLicense(that.businessLicenseNo)) {
            that.$toast('营业执照注册号由13-18位数字或字母组成')
            return
          }

          // 校验是否选择婚姻状况
          if (!that.spouseInfoType) {
            that.$toast('请选择婚姻状况')
            return
          }
          let spouseTypeCode = spouseTypeConstants[that.spouseInfoType]

          // 若婚姻状况为'已婚'，则需要校验配偶相关信息
          if (that.toggleInputSpouseInfo) {
            if (!that.spouseName || !that.spouseIdCard || !that.spousePhoneNum) {
              that.$toast('配偶相关信息为必填项')
              return
            }

            if (!that.$utils.checkName(that.spouseName)) {
              that.$toast('配偶姓名由2-6位汉字组成')
              return
            }

            if (!that.$utils.check18IdCard(that.spouseIdCard)) {
              that.$toast('配偶身份证号码格式错误，请重新输入')
              return
            }

            if (!that.$utils.checkPhone(that.spousePhoneNum.replace(/\s/g, ''))) {
              that.$toast('配偶手机号码格式不正确，请重新输入')
              return
            }

            if (that.vIdcard === that.spouseIdCard) {
              that.$toast('借款人与配偶身份证号码不能一致')
              return
            }
          }

          // 校验紧急联系人关系
          if (that.$StringUtils.isEmpty(that.vRelation)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201003);
            return;
          }
          let checkEmerRelationTemp = homeReConstants[that.vRelation]

          // 校验紧急联系人姓名
          if (that.$StringUtils.isEmpty(that.vUrgentName.replace(/\s/g, ''))) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201004)
            return
          }

          //校验紧急联系人手机号
          if (that.$StringUtils.isEmpty(that.vUrgentPhone)) {
            that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_201005)
            return
          }

          // 把第一步填写的个人信息保存到sessionStorage中，在个人信息第二步中提交进件信息时需要用到
          let writeOneInfo = {
            name: that.vLawName,
            idNo: that.vIdcard,
            businessLicense: this.businessLicenseNo,
            spouseInfoType: spouseTypeCode,
            relationship: checkEmerRelationTemp,
            contactName: that.vUrgentName,
            contactPhoneNo: that.vUrgentPhone
          }
          // 若婚姻状况为已婚，则需要加上配偶信息
          if (that.toggleInputSpouseInfo) {
            writeOneInfo.spouseName = that.spouseName
            writeOneInfo.spouseIdCard = that.spouseIdCard
            writeOneInfo.spousePhoneNum = that.spousePhoneNum
          }

          // 校验客户信息与营业执照注册号
          this.$indicator.open()
          let reqId = this.$StringUtils.getReqId()
          let timeStamp = Date.now()
          this.$http.post(this.$api.ROOT + '/credit/checkIdCardAndbusinessLicense.htm', {
            appId: window.appId,
            reqId: reqId,
            timestamp: timeStamp,
            sign: this.$utils.generateSign(reqId, timeStamp),
            openId: this.$CACHE.getCache("loginSession"),
            data: {
              // phoneNo: '18800000900',
              phoneNo: this.$StringUtils.getPhone(),
              name: this.vLawName,
              idNo: this.vIdcard,
              businessLicense: this.businessLicenseNo
            }
          }).then((res) => {
            this.$indicator.close()
            if (res.data.ret === '0') {

              if(res.data.data.bankName != null && res.data.data.bankName != undefined){
                var bindBankCardInfo = {
                  bankName: res.data.data.bankName,
                  bankAccount: res.data.data.bankAccount,
                  notUpdate: true,
                  mobile: ''
                }
                let oldSession = sessionStorage.getItem('writeOtherInfo');
                console.log(oldSession)
                if(oldSession != null){
                  bindBankCardInfo.mobile = JSON.parse(oldSession).mobile
                }
                console.log(JSON.stringify(bindBankCardInfo))
                sessionStorage.setItem('writeOtherInfo', JSON.stringify(bindBankCardInfo))
              }

              // 校验身份证号与工商信息成功后，取出响应参数中的企业名称
              let entName = res.data.data.entName
              writeOneInfo.entName = entName
              // 把填写的信息保存在sessionStorage中，在第二步返回到第一步时可以初始化已缓存的值
              sessionStorage.setItem('writeOneInfo', JSON.stringify(writeOneInfo))

              // 跳转到信息填写的第二步
              that.$router.push(that.$RM.WriteOther)
            } else {
              let retCode = res.data.ret
              if (res.data.ret === '000002') {
                this.$dialog.alert("    ", this.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN)
                this.$StringUtils.loginOut()
              } else if (retCode === '300001') { // 根据身份证号码未查询到相关信息
                this.$toast('借款人姓名与身份证号码不匹配') 
              } else {
                this.$toast(res.data.msg)
              }
            }
          }).catch((err) => {
            this.$indicator.close()
            this.$toast('出现了一点小意外，请稍后重试')
          })
        }
      },
      /**
       * 从通讯录选择配偶信息
       */
      chooseSpouseName () {
        let _this = this
        // 获取联系人列表
        window.onContactSelectSuccess = function (result) {
          if (window.appId === 'ANDROID') {
            let selectedContact = JSON.parse(result)
            _this.spousePhoneNum = selectedContact.number.replace(/\s/g, '') || ''
          }

          if (window.appId === 'IOS') {
            let contactsArr = JSON.parse(result)
            _this.spousePhoneNum = contactsArr[0].number.replace(/\s/g, '') || ''
          }
        }
        window.interfacePhone.selectContact()
      },
      /**
       * 从通讯录选择紧急联系人信息
       */
      chooseUrgentName () {
        let _this = this
        // 获取联系人列表
        window.onContactSelectSuccess = function (result) {
          if (window.appId === 'ANDROID') {
            let selectedContact = JSON.parse(result)
            _this.vUrgentName = selectedContact.name
            _this.vUrgentPhone = selectedContact.number
          }

          if (window.appId === 'IOS') {
            let contactsArr = JSON.parse(result)
            _this.vUrgentName = contactsArr[0].name || ''
            _this.vUrgentPhone = contactsArr[0].number || ''
          }
        }
        window.interfacePhone.selectContact()
      },
      /**
       * 在页面渲染完成后保存通讯录信息
       */
      saveAddressBook () {

        // 获取通讯录回调函数
        window.onContactListSuccess = (result) => {
          // alert('获取address book: ' + result)
          let addressBook = JSON.parse(result)
          // 添加客户手机号到需要保存的数组的每一项
          addressBook.map((item) => {
            item['phoneNo'] = this.custPhoneNo
            return item
          })

          //15分钟之后登陆态失效，强制重新登陆
          if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
            this.$CACHE.showErr();
            return
          }else{
            this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
          }
          // 发送请求保存通话记录
          let reqId = this.$StringUtils.getReqId()
          let timeStamp = Date.now()
          this.$http.post(this.$api.ROOT + this.$Constants.SAVE_ADDRESS_BOOK, {
            appId: window.appId,
            reqId: reqId,
            timestamp: timeStamp,
            sign: this.$utils.generateSign(reqId, timeStamp),
            openId: this.token,
            data: addressBook
          }).then((res) => {
            // this.$toast('success')
          }).catch((err) => {
          })
        }
        // 调用原生获取通讯录接口
        window.interfacePhone.getContacts()
      },
      /**
       * 在页面渲染完成后保存通话记录
       */
      saveCallRecords () {
        /* let cr = [
          {
            number: '13600000001',
            date: '2019-02-24 12:00:00',
            duration: '10',
            type: '已接'
          }, {
            number: '13600000002',
            date: '2019-02-24 13:00:00',
            duration: '0',
            type: '未接'
          }, {
            number: '13600000003',
            date: '2019-02-24 14:00:00',
            duration: '20',
            type: '已接'
          }
        ] */
        //
        window.onCallLogsSuccess = (result) => {
          let callRecords = JSON.parse(result)
          // 添加客户手机号到需要保存的数组的每一项
          callRecords.map((item) => {
            item['phoneNo'] = this.custPhoneNo
            return item
          })
          // 发送请求保存通话记录
          let reqId = this.$StringUtils.getReqId()
          let timeStamp = Date.now()
          this.$http.post(this.$api.ROOT + this.$Constants.SAVE_CALL_RECORDS, {
            appId: window.appId,
            reqId: reqId,
            timestamp: timeStamp,
            sign: this.$utils.generateSign(reqId, timeStamp),
            openId: this.token,
            data: callRecords
          }).then((res) => {

          }).catch((err) => {
          })
        }
        // 调用原生获取通话记录接口(仅安卓系统,IOS不能获取)
        if(window.appId==='ANDROID'){
          window.interfacePhone.getLatestCalls()
        }
      },
      // 调用获取地理位置授权
      saveLocation(){
        if(window.appId==='IOS'){
          window.interfacePhone.accessLocIos();

          window.interfacePhone.writeOne()
        }
      }
    },
    watch: {
      vUrgentName(val, oldval) {
        if (val.length > this.urgentNameLength) {
          this.vUrgentName = String(val).slice(0, this.urgentNameLength);
        }
      },
      vIdcard(val, oldval) {
        val = val.replace(/[\W]/g, '');
        if (val.length > this.urgentNameLength) {
          this.vIdcard = String(val).slice(0, this.idCardLength);
        }
      },
      vLawName(val, oldval) {
        if (val.length > this.lawNameLength) {
          this.vLawName = String(val).slice(0, this.lawNameLength);
        }
        if (!this.$StringUtils.isEmpty(this.vLawName)) {
          this.progressCss = 'background-color: #ff6400;;width:50%;height: 1px;';//进度条橙色
          this.text_orange = 'color: #ff6400;';//文字橙色
          this.backcolor_orange = 'background-color: #ff6400;';//背景橙色
        }
        else {
          this.progressCss = '';//暗色
          this.text_orange = '';
          this.backcolor_orange = '';
        }

      }
    },
    destroyed() {
      this.$sessionManager.saveWrite(this.vRelation)
    }
  }
</script>
<style>
  .regular-checkbox {
    -webkit-appearance: none;
  }
</style>
<style scoped>
.fixed {
    position: fixed;
    width: 100%;
    margin-top: 0;
    top:0;
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
  }

  .top {
    font-size: 26px;
    color: #999;
    text-align: justify;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.50);
    padding-top: 0.4rem;
  }

  .middle {
    font-size: 28px;
  }

  .section__title {
    font-weight: bold;
    font-size: 32px;
    color: #111111;
    text-align: left;
    margin-left: 0.4rem;
    margin-bottom: 0.4rem;
    margin-top: 0.4rem;
  }

  .common_margin_left {
    width: 250px;
    margin-left: 25px;
  }

  .lineCss {
    background-color: #ddd;
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
    width: 100%;
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

  .smaller-tip-cls {
    font-size: 25px;
    color: #666666;
  }

  .verticode_font {
    font-size: 0.4rem;
    color: #000;
    border: 0;
    width: 2.6rem;
  }

  .bgc_white {
    background-color: #fff;
  }

  .common_center_Three {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 12px;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }

  .emerinput {
    width: 5rem;
    /*height: 1rem;*/
    /*line-height: 1rem;*/
    border: 0;
    /*font-size: 0.4rem;*/

  }

  input::-webkit-input-placeholder {
    font-size: 25px;
    color: #999;
  }

  input {
    font-size: 30px;
  }

  .expandOne {
    width: 5rem;
    border: 0;
  }

  .margin_top_bottom {
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .codeInput {
    width: 3.4rem;
    font-size: 0.4rem;
    flex-grow: 1;
    border: none;
  }

  .accountCss {
    font-size: 26px;
    color: #666666;
    margin-left: 0.2rem;
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
    margin-right: 0.5rem;
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
    margin-right: 0.3rem;
  }

  .contact-name-css {
    width: 0.373333rem;
    height: 0.373333rem;
    margin-right: 0.3rem;
  }

  .rightText {
    font-size: 30px;
    text-align: left;
    /*padding-right: 30px;*/
    border: none;
    outline: none;
    line-height: 42px;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .img {
    width: 17px;
    height: 31px;
    padding-right: 0.5rem;;
    margin: auto;
  }

  .maohao {
    /*margin-left: 0.1rem;*/
  }
  .page {
    background-color: #f2f2f2;
    height: 100%;
    padding-top: 1rem;
  }
</style>
