<!--进件中,资料填写的第二步-->
<template>
  <div class="page">
    <!--bgcHidden背景图片一开始 让它显示，同时加载一个隐藏的断网占位图，默认是隐藏的，然后断网之后，显示出来，-->
    <NetBroken v-show="netErrorHidden"></NetBroken>
    <div :hidden="bgcHidden">
      <ToolBar class="fixed">选择银行卡</ToolBar>

      <div class='middle'>
        <!-- 加一个白色底色背景 start -->
        <div class='bgc_white'>
          <div v-bind:key="index" v-for="(item, index) in bankList">
            <div class='common_center_Three' @click="chooceBank(index, item)">
              <img class="bankImg" v-bind:src="item.bankImgUrl" />
              <div class='common_margin_left common_font input-info-lable-cls'>{{item.bankName}}</div>
              <img class="chooceStatus" v-show="chooceIndex === 'chooce' + index" src="/static/assets/isChooce.png"/>
            </div>
            <Divider></Divider>
          </div>
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
  // import con1 from "@/assets/img/con01.png";

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
        btnDisabled: false,//立即注册 按钮默认不可用
        token: null,
        province: null,
        city: null,
        area: null,
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
        countDownEvent: null, // 倒计时事件
        // ------------------------------
        testBankList: [
          {
            bankId: '001',
            bankImgUrl: '/static/assets/gsyh.png',
            bankName: '中国工商银行'
          },
          {
            bankId: '002',
            bankImgUrl: '/static/assets/yzcxyh.png',
            bankName: '中国邮政储蓄银行'
          },
          {
            bankId: '003',
            bankImgUrl: '/static/assets/nyyh.png',
            bankName: '中国农业银行'
          },
          {
            bankId: '004',
            bankImgUrl: '/static/assets/jsyh.png',
            bankName: '中国建设银行'
          },
          {
            bankId: '005',
            bankImgUrl: '/static/assets/zgyh.png',
            bankName: '中国银行'
          }
        ],
        chooceIndex: '', //选中的角标
        bankList: null //银行卡列表
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
      // 跳转登陆失效的页面
      getOpenApp () {
        if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
          this.$router.replace({path: '/security/fingerLockView'})
        } else {
          this.$router.replace(this.$RM.Login)
        }
      },
      // 查询代扣分支持的银行种类
      queryBankList() {
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
            openId: that.token,
            data: {
              
            }
          }, function (res) {
            that.$indicator.close()
            if (res.ret === '0') {
              // 请求成功
              console.log('请求成功')
              this.bankList = res.data.list
              console.log('bankList' + this.bankList)
            } else {
              // 请求失败

            }
          }.bind(that), function () {
            that.$indicator.close();
          }.bind(that));
        }
      },
      // 选中银行类别
      chooceBank: function(index, item) {
        var that = this
        let chooceBank = JSON.stringify(item)
        that.chooceIndex = 'chooce' + index
        sessionStorage.setItem('ChooceBankIndex', index)
        let info = sessionStorage.getItem('writeOtherInfo')
        if(info){
          var writeOtherInfo = JSON.parse(info)
          writeOtherInfo.bankName = item.bankName
          sessionStorage.setItem('writeOtherInfo',JSON.stringify(writeOtherInfo))
        }
        this.$router.go(-1)
      }
    },
    // 生命周期方法,页面初始化加载
    created() {
      console.log('ChooceBank开始初始化')
      //监听网络状态
      this.checkNetWork();
      //获取登录态
      var token = this.$CACHE.getCache("loginSession");
      this.token = token;//登陆态，赋值给全局变量

      // 获取代扣支持的银行卡
      this.queryBankList()

      // 选中状态
      var ChooceBankIndex = sessionStorage.getItem('ChooceBankIndex');
      console.log('ChooceBankIndex  ' + ChooceBankIndex)
      if(ChooceBankIndex){
        this.chooceIndex = 'chooce' + ChooceBankIndex
      }
    },
    //生命周期方法,页面加载完毕
    mounted() {

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
    /* width: 260px; */
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
    color: #000;
  }

  .bgc_white {
    background-color: #fff;
    /* position: fixed; */
    /* width: 100%; */
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
    padding-top: 0.6rem;
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
    width: 75%;
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

  .bankImg {
    width: 0.6rem;
    height: 0.6rem;
    margin-left: .3rem;
  }

  .chooceStatus {
    width: .6rem;
    height: .6rem;
  }

</style>
