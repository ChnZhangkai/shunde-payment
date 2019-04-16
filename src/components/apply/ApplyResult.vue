<template>
  <div>
    <ToolBar isShowNav="false">资料填写</ToolBar>
    <div class="apply-result-area">
      <div class="result-img">
        <img :src="applyResultInfo.imgSrc">
      </div>
      <div class="result-tip-info">
        <p>{{applyResultInfo.resultTip1}}</p>
        <p>{{applyResultInfo.resultTip2}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import ToolBar from '../ToolBar.vue'

  //  ios第一次获取地理位置回调
  // window.onCallBack = function () {
  // locationFun.getLocation(function (location) {
  //   //获取经纬度
  //   console.log('ios第一次地理位置成功授权的回调');
  //   sessionStorage.setItem('location', location);
  // });
  // window.interfacePhone.toPinganPage(toUrl.replace('https://', ''))
  // alert("99")
  // this.$router.go(-1)
  // };

  export default {
    name: 'applyResult',
    components: {ToolBar},
    data () {
      return {
        applyResult: false, // 申请是否成功
        applyResultInfo: {} // 申请结果信息
      }
    },
    methods: {
      /**
       * 根据返回的结果信息渲染页面
       */
      initPageContent() {
          let that=this;
        if (that.applyResult) {
          that.applyResultInfo = {
            imgSrc: '/static/assets/applyCheckSuccess.png',
            resultTip1: '恭喜您！您的信息已提交成功，',
            resultTip2: '即将前往银行鉴权页面！'
          }

          let reqId = that.$StringUtils.getReqId();
          let timeStamp = Date.now();
          let integrappinterfaceParams = JSON.parse(sessionStorage.getItem('integrappinterfaceParams'));
          that.$http.post(`${that.$api.ROOT}/api/customer/pingan/integrappinterface.htm`, {
            appId: window.appId,
            reqId: reqId,
            timestamp: timeStamp,
            sign: that.$utils.generateSign(reqId, timeStamp),
            openId: that.$CACHE.getCache("loginSession"),
            data: {
              phoneNo: that.$StringUtils.getPhone(),
              PRODUCT_CODE_ARRAY: [{
                PRODUCT_CODE: "1140260"
              }],
              INPUT_CHANNEL: 'antiyht',
              LICENSE_NO: integrappinterfaceParams.businessLicense,
              CORP_NAME: integrappinterfaceParams.corpName,
              RELATED_APPLY_ARRAY: integrappinterfaceParams.relatedApplyArray,
              ASSETS_ARRAY: integrappinterfaceParams.assetsArray,
              CITY_CODE: integrappinterfaceParams.cityCode,
              THIRD_FLOWNO: integrappinterfaceParams.applyId,
              THIRD_CUSTNO: integrappinterfaceParams.custNo
            }
          }).then((res) => {
            // 请求成功后删除缓存的请求参数
            sessionStorage.removeItem('integrappinterfaceParams')
            if (res.data.ret === '0') {
              let toUrl = res.data.data.uRL
              sessionStorage.setItem('toUrl', toUrl)
              if (window.appId === 'IOS') {
                window.interfacePhone.toPinganPage(toUrl.replace('https://', ''));
              } else {
                window.interfacePhone.toPinganPage(toUrl.replace('https://', ''));
              }
            } else {
              that.$dialog.confirm(res.data.msg, '', {
                showCancelButton: false,
                confirmButtonText: '确定'
              }).then(() => {
                that.$router.push(that.$RM.Main)
              })
            }
          }).catch((err) => {
            that.$toast('出了点小意外，请稍后再试')
          })
        }
        else {
          that.applyResultInfo = {
            imgSrc: '/static/assets/applyResultFefuse.png',
            resultTip1: '非常抱歉，您提交的信息初审未通过',
            resultTip2: ' 请仔细核对提交信息，3s后将自动返回申请首页'
          }

          setTimeout(() => {
            that.$router.push(that.$RM.Main)
          }, 3000)

        }
      }
    },
    created () {
      let that = this;
      that.applyResult = that.$route.query.applyResult === 'Y' ? true : false
      that.initPageContent();
    },


  }
</script>

<style scoped>
  .apply-result-area {
    width: 100%;
    padding: 300px 0px;
  }

  .result-img {
    width: 250px;
    margin: 0px auto;
  }

  .result-img > img {
    width: 250px;
  }

  .result-tip-info {
    margin-top: 75px;
    font-size: 32px;
    line-height: 45px;
    text-align: center;
    letter-spacing: 1px;
    color: #737373;
  }
</style>

