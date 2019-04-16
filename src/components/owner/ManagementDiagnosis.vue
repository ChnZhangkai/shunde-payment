<template>
  <div>
    <ToolBar :isShowNav="false">经营诊断</ToolBar>
    <Divider></Divider>
    <!-- 顶部提示信息 -->
    <div class="top-tip-area">
      <p>商户烟草分析以大数据为基础结合个人商户信息对比展示。</p>
      <p>
        <span class="orange-text">请录入当地烟草主管部门所指定的网上订烟系统信息！</span>
        (包括但不限于：中烟新商盟、卷烟销售网等)，分析结果仅供参考。
      </p>
    </div>
    <!-- 表单区域 -->
    <div class="form-info-area">
      <div class="form-title">
        <span><strong>商户身份确认</strong></span>
      </div>
      <!-- 填写账号 -->
      <div class="form-input-item">
        <div class="pre-solt">
          <img src="/static/assets/acctSolt.png" >
        </div>
        <div class="acct-pwd-input">
          <input
            type="text"
            v-model="acct"
            placeholder="请输入订烟系统账号" />
        </div>
        <div class="append-solt">
          <img v-if="acctClearVisible" @click="clearInput(1)" src="/static/assets/clearInput.png" >
        </div>
      </div>
      <!-- 填写密码 -->
      <div class="form-input-item">
        <div class="pre-solt">
          <img src="/static/assets/passwordSolt.png" >
        </div>
        <div class="acct-pwd-input">
          <input
            type="password"
            v-model="password"
            placeholder="请输入订烟系统密码" />
        </div>
        <div class="append-solt">
          <img v-if="pwdClearVisible" @click="clearInput(2)" src="/static/assets/clearInput.png" >
        </div>
      </div>
      <!-- 协议提示 -->
      <div class='protocol'>
        <Checkbox class="checkbox" @onCheckChange="onCheckChange"></Checkbox>
        <div class='tips'>本人已阅读并同意签署<span style="color:#ff6400" @click="toProcol">《商户经营性数据授信查询》</span></div>
      </div>
      <!-- 生成报表按钮 -->
      <div align="center">
        <input
          type="button"
          :class="['bottom-button', {'btn-enable-background': btnEnable}]"
          value="点击生成商户经营性报表"
          :disabled="!btnEnable"
          @click="generateReoprt" />
      </div>
    </div>
    <!-- 分析内容区域 -->
    <div class="analyse-title">
      商户分析将包含以下内容：
    </div>
    <div class="analyse-contents-area">
      <!-- 遍历所有的分析内容渲染 -->
      <template v-for="(item, index) in analyseContents">
        <div
          :key="index"
          class="analyse-contents-item">
          <div class="contents-text">
            {{item}}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ToolBar from '../ToolBar.vue'
import Divider from '../Divider.vue'
import Checkbox from '../Checkbox'

export default {
  name: 'managementDiagnosis',
  components: {ToolBar, Divider, Checkbox},
  data () {
    return {
      acct: '', // 输入的账号
      password: '', // 输入的密码
      acctClearVisible: false, // 账号的清除图标是否显示
      pwdClearVisible: false, // 密码的清除图标是否显示
      btnEnable: false, // 生成报表按钮是否可用
      isChecked: false, // 协议是否勾选
      analyseContents: ['#烟草销量趋势分析', '#烟草订单量趋势分析', '#最畅销烟品排名榜', '#烟草贷源紧俏信息', '#您近期订单利润分析'],
      authedAcct: '', // 若已授权，则为已授权的账号
      authedOrNot: false // 当前用户是否授权标志
    }
  },
  mounted () {
    // 查询当前用户是否已经授权激活与授权是否失效
    this.isAuthed()

    // 若缓存中有之前填写的过的账号、密码，则初始化到页面
    let cachedManageInfo = sessionStorage.getItem('ManagementDiagnosisInfo')
    if (cachedManageInfo) {
      cachedManageInfo = JSON.parse(cachedManageInfo)
      this.acct = cachedManageInfo.acct || ''
      this.password = cachedManageInfo.password || ''
    }
  },
  watch: {
    /**
     * 根据账号是否填写显示清除图标是否显示
     */
    acct: function (newVal, oldVal) {
      if (newVal) {
        this.acctClearVisible = true
        // 若账号不为空的同时，密码也不为空，则按钮变为可点击状态，否则不可点击
        if (this.password) {
          this.btnEnable = true
        } else {
          this.btnEnable = false
        }
      } else {
        this.acctClearVisible = false
        this.btnEnable = false
      }
    },
    /**
     * 根据密码是否填写显示清除图标是否显示
     */
    password: function (newVal, oldVal) {
      if (newVal) {
        this.pwdClearVisible = true
        // 若密码不为空的同时账号也不为空，则按钮变为可点击状态，否则不可点击
        if (this.acct) {
          this.btnEnable = true
        } else {
          this.btnEnable = false
        }
      } else {
        this.pwdClearVisible = false
        this.btnEnable = false
      }
    }
  },
  methods: {
    /**
     * 生成分析报表
     */
    generateReoprt () {
      //15分钟之后登陆态失效，强制重新登陆
      if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
        this.$CACHE.showErr();
        return
      }
      else{
        this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
      }
      // 校验是否勾选了协议
      if (!this.isChecked) {
        this.$toast('请勾选阅读并同意签署《商户经营性数据授信查询》后点击验证');
        return false
      }

      // rsa加密订烟系统密码
      let publicKey = this.$utils.PUBLIC_KEY
      let encrypt_rsa = new this.$RSA.RSAKey()
      encrypt_rsa = this.$RSA.KEYUTIL.getKey(publicKey)
      let encStr = encrypt_rsa.encrypt(this.password.trim())
      encStr = this.$RSA.hex2b64(encStr)

      // 校验订烟系统账号密码
      this.$indicator.open()
      let reqId = this.$StringUtils.getReqId()
      let timeStamp = Date.now()
      this.$http.post(this.$api.ROOT + this.$Constants.BUSINESS_ACCESS, {
        appId: window.appId,
        reqId: reqId,
        timestamp: timeStamp,
        sign: this.$utils.generateSign(reqId, timeStamp),
        openId: this.$CACHE.getCache("loginSession"),
        data: {
          newBusinessAccount: this.acct.trim(),
          newBusinessAccountPwd: encStr,
          phoneNo: this.$StringUtils.getPhone()
        }
      }).then((res) => {
        this.$indicator.close()
        if (res.data.ret === '0') {
          // 有预授信额度且区域已展开时在缓存中存入预授信信息，后续经营诊断报表页面可以申请精准授信
          if (res.data.data.creditActiveStatus === '01') {
            sessionStorage.setItem('creditStatusInfo', JSON.stringify({
              canApply: '1',
              applyStatus: '01'
            }))
          }
          // 校验账号密码成功后弹出温馨提示
          this.$dialog.alert(this.$Constants.TIP_AFTER_CREDIT_ACTIVE, '温馨提示')
          this.$router.push(`${this.$RM.chartAnalyse}?acct=${this.acct}`)
        } else {
          if (res.data.ret === '000002') {
            this.$dialog.alert("    ", this.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN)
            this.$StringUtils.loginOut()
          } else {
            this.$toast(res.data.msg)
          }
        }
      }).catch((err) => {
        this.$indicator.close()
        this.$toast('非常抱歉！目前网络拥堵，暂无法提交分析，请稍后尝试提交！')
      })


    },
    /**
     * 点击清除图标清除输入框的值
     */
    clearInput (num) {
      switch (num) {
        case 1:
          this.acct = ''
        break
        case 2:
          this.password = ''
        break
        default:
        break
      }
    },
    /**
     * 协议是否选择事件
     */
    onCheckChange (isChecked) {
      this.isChecked = isChecked
    },
    /**
     * 跳转到协议页面
     */
    toProcol () {
      // 在跳转到协议页面前把已经填好的数据缓存起来
      let managementDiagnosisInfo = {
        acct: this.acct,
        password: this.password
      }
      sessionStorage.setItem('ManagementDiagnosisInfo', JSON.stringify(managementDiagnosisInfo))
      this.$router.push(this.$RM.BusinessService)
    },
    /**
     * 查询当前用户是否已经授权激活与授权是否失效
     */
    isAuthed () {
      // 15分钟之后登陆态失效，强制重新登陆
      if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
        this.$CACHE.showErr()
        return
      } else {
        this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)  // 缓存存个15分钟
      }

      let reqId = this.$StringUtils.getReqId()
      let timeStamp = Date.now()
      this.$http.post(this.$api.ROOT + this.$Constants.CHECK_ISAUTHED, {
        appId: window.appId,
        reqId: reqId,
        timestamp: timeStamp,
        sign: this.$utils.generateSign(reqId, timeStamp),
        openId: this.$CACHE.getCache("loginSession"),
        data: {}
      }).then((res) => {
        if (res.data.ret === '0') {
          // 若已授权，则改变授权标志并保存授权账号
          this.authedOrNot = true
          this.authedAcct = res.data.data.newBusinessAccount
        }
      }).catch((res) => {
      })
    },
    /**
     * 每次切换到经营诊断时后查看是否授权，若已授权则直接跳转到经营报表页面
     */
    managementSelected () {
      this.authedOrNot && this.$router.push(`${this.$RM.chartAnalyse}?acct=${this.authedAcct}`)
    }
  }
}
</script>

<style scoped>
.top-tip-area {
  width: 90%;
  margin: 10px auto;
}

.top-tip-area p {
  line-height: 40px;
  color: #666666;
}

.top-tip-area .orange-text {
  color: #ffa03f;
}

.form-info-area {
  width: 90%;
  margin: 20px auto;
  border: 1px solid #ffffff;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 2px 2px 5px #cacaca,2px -2px 5px #cacaca,-2px -2px 5px #cacaca,-2px 2px 5px #cacaca;
  -webkit-box-shadow: 2px 2px 5px #cacaca,2px -2px 5px #cacaca,-2px -2px 5px #cacaca,-2px 2px 5px #cacaca;
  -moz-box-shadow: 2px 2px 5px #cacaca,2px -2px 5px #cacaca,-2px -2px 5px #cacaca,-2px 2px 5px #cacaca;
}

.form-info-area .form-title {
  width: 90%;
  margin: 0px auto;
  font-size: 30px;
  padding: 10px 0px;
}

.form-input-item {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 90%;
  height: 1.3rem;
  margin: 17px auto;
  background-color: #f5f5f5;
}

.pre-solt {
  flex: 1 1 15%;
}

.acct-pwd-input {
  flex: 1 1 60%;
}

.append-solt {
  flex: 1 1 15%;
}

.pre-solt img {
  width: 40%;
  height: 70%;
  margin-left: 30%;
}

.acct-pwd-input input {
  width: 90%;
  height: 1rem;
  margin-left: 5%;
  border: none;
  background-color: #f5f5f5;
  font-size: 30px;
}

.append-solt img {
  width: 40%;
  height: 70%;
  margin-left: 30%;
}

.protocol {
  display: flex;
  width: 90%;
  margin: 20px auto;
}

.protocol .checkbox {
  width: 25px;
  height: 25px;
}

.protocol .tips {
  letter-spacing: 2px;
  color: #c9c9c9;
  font-size: 22px;
  line-height: 30px;
  margin-left: 20px;
}

.bottom-button {
  margin-top: 30px;
  margin-bottom: 30px;
  background-image: linear-gradient(to right, #f1f1f1 0%, #dddddd 100%);
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  width: 90%;
  height: 1.3rem;
  border: none;
  font-size: 30px;
  color: #9a9a9a;
}

.btn-enable-background {
  background-image: linear-gradient(to right, #ffa61a 0%, #ff6c0d 100%);
  color: #ffffff;
}

.analyse-title {
  width: 90%;
  margin: 0px auto;
  margin-top: 30px;
  font-size: 25px;
  color: #c9c9c9;
  letter-spacing: 2px;
}

.analyse-contents-area {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 90%;
  margin: 25px auto;
}

.analyse-contents-item {
  flex: 0 0 50%;
}

.analyse-contents-item .contents-text {
  width: 90%;
  height: 52px;
  margin: 10px auto;
  line-height: 52px;
  text-align: center;
  background-color: #f7f7f7;
  border: 1px solid #efefef;
  border-radius: 10px;
  color: #666666
}

</style>
