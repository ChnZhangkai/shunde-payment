<!--授权成功界面-->
<template>
  <div>
    <ToolBar>我的估值</ToolBar>
    <Divider></Divider>
    <div class="tip-div">
      <!-- 显示图片区域 -->
      <div class="img-area"></div>
      <!-- 根据预授信激活状态显示额度区间或提示信息区域 -->
      <div class="creditinfo-area">
        <!-- 在有预授信额度返回时展示额度区间标题 -->
        <div v-if="creditActiveStatus === '01' || creditActiveStatus === '02'" class="creditinfo-title">
          <span>恭喜您！您的平安惠商贷预授信额度为</span>
        </div>
        <!-- 在有预授信额度返回时展示具体的额度区间值 -->
        <div v-if="creditActiveStatus === '01' || creditActiveStatus === '02'" class="creditinfo-content">
          <span>{{creditAmtMin}}-{{creditAmtMax}}元</span>
        </div>
        <!-- 在没有预授信额度返回时展示的提示信息 -->
        <div v-if="creditActiveStatus === '00'" class="nocredit-cls">
          <span class="sorryTips">很抱歉！您的商户暂无平安惠商贷预授信额度</span>
        </div>
      </div>
      <!-- 关于预授信额度的注意事项提示 -->
      <div class="notice-msg">
        <span>尊敬的商户，以上预授信额度区间为初步商户授信，最终商户授信额度为银行终审为准！请知悉。</span>
        <br/>
        <!-- 在区域未开放或无预授信额度时的提示信息 -->
        <span v-if="creditActiveStatus === '00' || creditActiveStatus === '02'" style="color: red;">{{errorMsg}}</span>
      </div>
      <div class="button-area">
        <button class="btn-cls" @click="handleBtnClick">{{btnVal}}</button>
      </div>
    </div>
    <!-- <div class="feedSuccess">
      <img src="/static/assets/commit_success.png">
      <span class="success">提交成功</span>
      <span class="feedDesc">恭喜您，授权提交成功，状态已激活。<br>祝您用款愉快！</span>
      <button @click="goMain">
        返回首页
      </button>
    </div> -->
  </div>
</template>

<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  export default{
    components: {ToolBar, Divider},
    data () {
      return {
        creditActiveStatus: '', // 授信激活返回状态
        creditAmtMin: '', // 预授信额度最小金额
        creditAmtMax: '', // 预授信额度最大金额
        btnVal: '', // 按钮的文本值
        errorMsg: '' // 当地区未开展或无预授信额度时显示文本内容
      }
    },
    mounted () {
      let creditActiveInfo = JSON.parse(sessionStorage.getItem('creditActiveInfo'))
      this.creditActiveStatus = creditActiveInfo.creditActiveStatus
      this.creditAmtMin = creditActiveInfo.preCreditAmtLimit
      this.creditAmtMax = creditActiveInfo.preCreditAmtMax
      this.initPageContent()
    },
    methods: {
      /**
       * 根据授信激活的结果初始化页面内容
       */
      initPageContent () {
        if (this.creditActiveStatus === '02') {
          // 用户所在区域未开放时注意事项中的提示信息
          this.errorMsg = '区域暂未开放支持银行精准授信，敬请期待！'
        } else if (this.creditActiveStatus === '00') {
          // 无预授信额度时注意事项中的提示信息
          this.errorMsg = '请您一个月后进行再次估值测算'
        }
        // 授信激活返回状态为所在区域未开放时按钮的文本值为'返回首页'，其他情况为'一键获取银行精准授信'
        this.btnVal = this.creditActiveStatus === '01' ? '申请获取平安惠商贷精准授信': '返回首页'
      },
      /**
       * 按钮点击事件
       */
      handleBtnClick () {
        // 跳转到资料填写页
        if (this.creditActiveStatus === '01') {
          let that = this
          let reqId = that.$utils.generateSignTime()
          let timestamp = Date.now()
          // 在跳转到下一步的页面之前，先校验授权是否失效以及区域是否开展
          that.$indicator.open()
          this.$http.post(this.$api.ROOT + this.$Constants.CHECK_AREA_AUTH, {
            reqId: reqId,
            appId: window.appId,
            sign: that.$utils.generateSign(reqId, timestamp),
            timestamp: timestamp,
            openId: this.$StringUtils.getOpenId(),
            data: {
              Status: '01'
            }
          }).then((res) => {
            that.$indicator.close()
            // 校验通过
            if (res.data.ret === '0') {
              this.$router.push(this.$RM.WriteOne)
            } else {
              if (res.data.ret === '000002') {
                this.$dialog.alert("    ", this.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN)
                this.$StringUtils.loginOut()
              } else {
                this.$toast(res.data.msg)
              }
            }
          }).catch((err) => {
            that.$indicator.close()
            this.$toast('啊哦，出了点问题，请稍微再试~')
          })
        } else {
          this.$router.push(this.$RM.Main)
        }

      }
    }
  }
</script>

<style scoped>
  /* .feedSuccess {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .feedSuccess > img {
    margin-top: 2.8rem;
    width: 2rem;
    heigh: 2rem;
  }

  .feedSuccess .success {
    font-size: 0.41rem;
    color: #ff6400;
    margin-top: 0.5rem;
  }

  .feedDesc {
    font-size: 0.35rem;
    color: #999999;
    margin-top: 0.5rem;
    text-align: center;
    line-height: 0.42rem;
  }

  .feedSuccess > button {
    background: #ffffff;
    border: 2px solid #ff6400;
    border-radius: 5px;
    width: 2.5rem;
    height: 0.82rem;
    line-height: 0.82rem;
    font-size: 0.35rem;
    color: #ff6400;
    letter-spacing: 0;
    text-align: center;
    margin-top: 1rem;
  } */

  .tip-div .img-area {
    width: 150px;
    height: 150px;
    margin: 50px auto;
    background: url(/static/assets/myWorth_img.png) no-repeat;
    background-size: 100% 100%;
  }

  .tip-div .creditinfo-area {
    width: 90%;
    height: 200px;
    margin: 0px auto;
    background-image: linear-gradient(to right , #ffeeda, #ffd49c);
    border: none;
    border-radius: 10px;
  }

  .creditinfo-title {
    font-size: 30px;
    line-height: 45px;
    color: #666666;
    letter-spacing: 2px;
    text-align: center;
    padding: 35px 0px;
  }

  .creditinfo-content {
    font-size: 54px;
		font-family: PingFangSC-Medium;
		color: #ff6400;
		line-height: 60px;
    text-align: center;
  }

  .creditinfo-area .nocredit-cls {
    width: 100%;
    height: 100%;
    font-size: 35px;
    text-align: center;
    line-height: 200px;
    color: #666666;
  }

  .tip-div .notice-msg {
    width: 90%;
    margin: 0px auto;
    margin-top: 25px;
    font-size: 27px;
    line-height: 45px;
    color: #969393;
  }

  .tip-div .button-area {
    width: 90%;
    margin: 100px auto;
    border: none;
  }

  .btn-cls {
    width: 100%;
    height: 90px;
    background-image: linear-gradient(to right , #ffa61a, #ff6400);
    border-radius: 5px;
    color: #ffffff;
    font-size: 35px;
    border: none;
  }

  .sorryTips{
    font-size: .4rem;
  }
</style>
