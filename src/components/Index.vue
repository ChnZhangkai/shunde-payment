<!--进件首页-->imgPath
<template>
  <!-- 最外层的div start -->
  <mt-loadmore :top-method="loadTop" ref="loadmore">
    <div id='indexContainer'>
      <ToolBar :isShowNav='false'><span class="toolBar">安田惠通</span></ToolBar>
      <div>
      </div>
      <div class="netErrorBgcImg" v-if="netError"></div>
			<div class='section__title' v-if="!netError">
        <div>我的价值</div>
      </div>
			<div :class="['cost_div']" v-if="!netError">
				<div class="new" >
					<p :class="creditInfoTitleCss">{{creditMsgTitle}}</p>
          <p v-if="preCreditTipVisible" class="pre-credit-tip">(最终授信以银行审批为准)</p>
          <p v-if="creditAmtAndRateVisible" class="credit-amt-rate-cls">{{creditAmtAndRate}}</p>
					<p :class="creditInfoContentCss">{{creditMsgContent}}<span v-if="dateRateVisible" class="daterate-info-cls">(日息：0.033%)</span></p>
				</div>
				<div class="bt">
				  <input type="button" :disabled="!btnEnable" :class="['btn777', 'btn777-color', {'btn-bg-color-orange': isCanApply === '10'}, {'btn-bg-color-red': isCanApply === '11'}, {'btn-bg-color-grey': isCanApply === '14'}]" :value="pro_word" @click="toRepaySkip()" />
          <input v-if="visibleQueryAcct" type="button" class="btn555" value="查询账单还款" @click="toBillPayment()"/>
				</div>
			</div>
       <div class='section__title_flex'>
        <div>我的资讯</div>
      	<div><input type="button" class="btn666"  value="更多资讯>"  @click="toInformation()"/>
      	</div>
      </div>
      <div class=''>
        <!-- 加一个白色背景图start -->
        <div class='white_bac_new news'>
					<ul>
						<li v-for="(item,index) in newslist" :key="index" @click="toInformationDetail(item)">
						<img class='img' :src="item.imgPath">
						<div class='content'>
							<p class="title" style="-webkit-line-clamp: 2;">{{item.title}}</p>
							<p class="time">{{item.relDate}}</p>
						</div>
						</li>
					</ul>
        </div>
        <!-- 加一个白色背景图end -->
      </div>
			 <div class='white_bac_wj'>
				<div class="wj">
					<p class="title">尊敬的烟草商户：</p>
					<p class="content">为给您提供最优的商业资讯服务，特邀请您填写本问卷，我们将严格为您保密，谢谢您的合作！</p>
					<div class="bt"><input type="button" class="btn999"  value="打开问卷" @click="openWj"/>
					</div>
				</div>
			</div>
      <!--<Main></Main>-->
      <!-- 加一个白色背景图end -->
      <div>
      </div>
      <div id="allmap"></div>
    </div>
  </mt-loadmore>
  <!-- 申请的进度end -->
  <!-- 最外层的divend-->
</template>
<script>
  import ToolBar from './ToolBar.vue';
  import locationFun from '../api/location.js';
  import {Loadmore} from 'mint-ui';
  import Store from '../store';

  // 需要校验授权是否失效以及地区是否开展的状态
  const needCheckAuthAndArea = ['01', '05', '07', '09', '12']
  // 提款状态
  const toBankPageStatus = ['10']
  // 查询申请进度的几种状态
  const checkApplyProgressStatus = ['04', '06', '13']

//  安卓获取地理位置回调
    window.onLocAccess = function () {
      locationFun.getLocation(function (location) {
        //获取经纬度
        // console.log('安卓地理位置成功授权的回调');
        sessionStorage.setItem('location', location);
      });
    };

    //  ios第一次获取地理位置回调
    // window.onLocAccessIos = function () {
    //   locationFun.getLocation(function (location) {
    //     sessionStorage.setItem('location', location);
    //   });
    // };

    //  ios第二次获取地理位置回调
    // window.getIOSLocation = function (latitude,longitude) {
    //   locationFun.getIOSLocationIos(latitude,longitude,function (locationIOS) {
    //     sessionStorage.setItem('location', locationIOS);
    //   });
    // };

  export default {
    components: {ToolBar},
    data(){
      return {
        money: '500,000',//预授信额度
        netError: false,//true是没网
        account: '',
				isCanApply:'00',
        creditMsgTitle: '', // 展示授信信息title
        creditInfoTitleCss: '', // 授信信息title css
        creditAmtAndRate: '28万元(日息：0.033%)', // 授信金额及日息信息
        creditAmtAndRateVisible: false, // 授信金额及日息信息是否展示
        creditInfoContentCss: '', // 授信信息content css
        creditMsgContent: '', // 展示授信信息content
        dateRateVisible: false, // 日息相关信息是否显示
        pro_word: 'loading',
        visibleQueryAcct: false, // "点击查询账单还款按钮是否显示"
        isBtnColorOrange: true, // 按钮颜色是否为橙色，默认为橙色
        btnEnable: false, // 按钮是否可用
        preCreditTipVisible: false, // 是否显示首次估值提示信息
				newslist:[
					{
            imgPath:'../../static/assets/antian.png',
						title:'面对正常经营的正规烟草商户，以商户经营状况为基础进行银行信用授信以商户经营状况为基础进行银行信用授信',
            relDate:'2018-05-01'
					},
					{
            imgPath:'../../static/assets/antian.png',
						title:'面对正常经营的正规烟草商户，以商户经营状况为基础进行银行信用授信以商户经营状况为基础进行银行信用授信',
            relDate:'2018-05-01'
					},
					{
            imgPath:'../../static/assets/antian.png',
						title:'面对正常经营的正规烟草商户，以商户经营状况为基础进行银行信用授信以商户经营状况为基础进行银行信用授信',
            relDate:'2018-05-01'
					}
				]
      }
    },
    mounted(){
        if(window.appId==='IOS'){
          // window.interfacePhone.accessLocIos();
        }
        if(window.appId==='ANDROID'){
          let phoneVer=  window.interfacePhone.accessLoc();
          if(!this.$StringUtils.isEmpty(phoneVer) && phoneVer<=this.$ERRCODE.STATIC_ERRORCDDE.ANDORID_VERTION_CODE){
            sessionStorage.setItem('location', "版本过低，不支持获取地理位置信息");
          }
        }


      //15分钟之后登陆态失效，强制重新登陆
      if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
        this.$CACHE.showErr();
        return
      }else{
        this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
      }
      var that = this;
      //清除掉地址选择器的缓存，解决用户常规进件填写了地址，又进去到快捷，导致快捷进件地址为空的异常提示
      // that.toastLocation(); //弹出临时的通知的弹出框
      that.checkNetWork();   //调取监听网络状态的代码
      that.selecCreditStatus();//查询当前授信状态

      this.$api.post(this.$Constants.GET_INFORMATION, {
        "pageSize": 3,
        "orderBy":"REL_DATE DESC",
        "status":"1"
      }, function (result) {
        let list = result.records;
        for(var i = 0 ; i < list.length ; i++){
          list[i].relDate = this.$utils.getDate(list[i].relDate,"yyyy-MM-dd");
        }
        this.newslist = list;
      }.bind(this))
    },
    methods: {
      IOSlocation(){
        //重新获取ios用户的地理位置
        window.interfacePhone.accessLocIos();
      },
      AndroidLocation(){
        //重新获取安卓用户的地理位置
        let phoneVer=  window.interfacePhone.accessLoc();
        if(!this.$StringUtils.isEmpty(phoneVer) && phoneVer<=this.$ERRCODE.STATIC_ERRORCDDE.ANDORID_VERTION_CODE){
          sessionStorage.setItem('location', "版本过低，不支持获取地理位置信息");
        }
      },
			//打开问卷
			openWj(){
				// console.log("打开问卷")
			},
      countCountly(status){
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        var tempKey = "";
        switch (status) {
          case "01":
            tempKey = this.$Constants.confirmClick;
            break;
          case "04":
            tempKey = this.$Constants.FailClick
            break;
          case "10":
            tempKey = this.$Constants.OvertimeClick
            break;
          case "17":
            tempKey = this.$Constants.expireClick
            break;
          case "15":
            tempKey = this.$Constants.drawingClick
            break;
          case "13":
            tempKey = this.$Constants.signButton
            break;
        }
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: tempKey,
          "segmentation": {
            appId: window.appId,
          }
        });
      },
      //弹出临时的通知的弹出框
      toastLocation(){
        var that = this;
        //跳个临时的 授权信息通知的弹出框
        var tempTan = localStorage.getItem("tan");
        if (that.$StringUtils.isEmpty(tempTan)) {
          tempTan = 'yes';
        }
        if (tempTan == 'yes') {
          that.$dialog.confirm("    ", '安田惠通想给您发送通知。通知可能包括提醒、声音和图标标记。这些可在设置中配置',
            {
              confirmButtonText: '允许',
              cancelButtonText: '不允许'
            }).then(() => {
              Countly.init({
                app_key: that.$Constants.APPKEY,
                url: that.$Constants.ROOTMAI, //your server goes here
                debug: true,
              })
              Countly.track_sessions();
              Countly.track_pageview();
              Countly.add_event({
                key: that.$Constants.inform,
                "segmentation": {
                  appId: window.appId,
                }
              });
              // console.info("停留在当前页面")
              localStorage.setItem("tan", "no");
            })
            .catch(() => {
              // console.info("停留在当前页面")
              localStorage.setItem("tan", "no");
            });
        }
      },
      //监听网络状态
      checkNetWork(){
        let that = this;
        let el = document.body;
        if (el.addEventListener) {
//          addEventListener——兼容：firefox、chrome、IE、safari、opera；不兼容IE7、IE8
          window.addEventListener("online", function () {
            that.netError = false;
            let sessionStatus = sessionStorage.getItem("nowStatus");
            if (!that.$StringUtils.isEmpty(sessionStatus)) {
              that.selecCreditStatus();//查询当前授信状态
            }
          });
          window.addEventListener("offline", function () {
            that.netError = true;
          });
        }
      },
      //查询授信状态的方法
      selecCreditStatus(){

        //15分钟之后登陆态失效，强制重新登陆
        if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
          this.$CACHE.showErr();
          return
        }else{
          this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
        }
        var that = this;
        if (that.netError) {
          sessionStorage.setItem('nowStatus', "6666");
          return
        }

        // 每次查询状态之前先把按钮设置为不可点击
        this.btnEnable = false
        let timestamp = that.$utils.generateSignTime()
        let reqId = that.$utils.generateSignTime()
        let sign = that.$utils.generateSign(reqId, timestamp)
        that.$http.post(that.$api.ROOT + that.$Constants.QUERYCREDITSTATUS, {
          reqId: reqId,
          appId: window.appId,
          sign: sign,
          timestamp: timestamp,
          openId: this.$StringUtils.getOpenId(),
          data: {}
        }).then(function (res) {
          if (res.data.ret === '0') {
            // 返回成功状态按钮可点击
            this.btnEnable = true

            let resData = res.data.data
            that.isCanApply = resData.isCanApply
            // 清除缓存中的状态，避免之缓存的状态影响
            sessionStorage.removeItem('creditStatusInfo')
            // 若返回状态为可以申请烟草贷的几种状态之一，则在session中存入可以申请烟草贷的状态，以便后续经营诊断页面判断使用
            needCheckAuthAndArea.includes(resData.isCanApply) && sessionStorage.setItem('creditStatusInfo', JSON.stringify({
              canApply: '1',
              applyStatus: resData.isCanApply
            }))
            let creditInfo = that.getCreditInfoByStatus(resData)
            that.creditMsgTitle = creditInfo.title
            that.creditMsgContent = creditInfo.content
            //把查询到的状态存到缓存
            sessionStorage.setItem('nowStatus', that.isCanApply);
            var newBusinessAccount = res.data.data.newBusinessAccount;//新商盟账号
            that.account = newBusinessAccount;//赋值新商盟账号给全局变量
            // 把新商盟账号存到sessionStorage中便于后面的流程读取
            sessionStorage.setItem('account', that.account)
            var custName = res.data.data.custName;//商户名称
            //把返回来的其他数据缓存起来
            sessionStorage.setItem('newBusinessAccount', newBusinessAccount);
            sessionStorage.setItem('custName', custName);
          } else {
            // 返回状态为失败时把按钮状态设置为不可点击
            this.btnEnable = false
            if (res.data.ret === '000002') {
              that.$dialog.alert("    ",that.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
              that.$StringUtils.loginOut();
              return
            } else {
              that.$dialog.alert("    ", "查询失败，请稍后下拉刷新试试")
              return
            }
          }
        }).catch(function (err) {
          this.pro_word = '下拉刷新'
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);//这里要处理一下
        })
      },
      getOpenApp() {
          //跳转去 登陆的界面
        if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
          this.$router.replace({path: '/security/fingerLockView'});
        } else {
          this.$router.replace(this.$RM.Login);
        }
      },
      loadTop() {
        // console.log('下拉刷新');
        var that = this;
        that.selecCreditStatus();//查询当前授信状态
        that.checkNetWork();//监听网络状态
        that.$refs.loadmore.onTopLoaded(); // 这个是用来关闭刷新的
      },
      onIndexSelected(){
        var that = this;
        that.selecCreditStatus();//查询当前授信状态
        that.checkNetWork();   //调取监听网络状态的代码
      },
      toRepaySkip(){
        // 15分钟之后登陆态失效，强制重新登陆
        if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
          this.$CACHE.showErr();
          return
        }else{
          this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
        }
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        });
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.inquiryClick,
          "segmentation": {
            appId: window.appId,
          }
        });

        // 若当前状态为可以进行申请烟草贷，则需要校验授信激活与地区是否开展业务
        if (needCheckAuthAndArea.includes(this.isCanApply)) {
          let that = this
          let reqId = that.$utils.generateSignTime()
          let timestamp = Date.now()
          // 在跳转到下一步的页面之前，先校验授权是否失效以及区域是否开展
          that.$indicator.open("请稍候...")
          this.$http.post(this.$api.ROOT + this.$Constants.CHECK_AREA_AUTH, {
            reqId: reqId,
            appId: window.appId,
            sign: that.$utils.generateSign(reqId, timestamp),
            timestamp: timestamp,
            openId: this.$StringUtils.getOpenId(),
            data: {
              Status: this.isCanApply
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
              } else if (res.data.ret === '100002') { // 失效状态，提示后跳转到激活页面
                this.$toast(res.data.msg)
                setTimeout(() => {
                  this.$router.push(this.$RM.BusinessAccess)
                }, 3000)
              } else {
                this.$toast(res.data.msg)
              }
            }
          }).catch((err) => {
            that.$indicator.close()
            this.$toast('啊哦，出了点问题，请稍微再试~')
          })
        }

        // 若当前状态为'00'(新用户)或'02'(无额度)或'11'(授权失效)，则跳转到授信激活页
        if (this.isCanApply === '00' || this.isCanApply === '02' || this.isCanApply === '11') {
          this.$router.push(this.$RM.BusinessAccess)
        }

        // 若当前进件装备为提交到本地系统但未提交到银行系统，则可以继续提交上次进件申请内容
        if (this.isCanApply === '03') {
          let reqId = this.$StringUtils.getReqId()
          let timeStamp = Date.now()
          this.$indicator.open({
            text: '信息正在提交中，请稍等…',
            spinnerType: 'fading-circle'
          })
          this.$http.post(`${this.$api.ROOT}/api/customer/pingan/integrappinterface.htm`, {
            appId: window.appId,
            reqId: reqId,
            timestamp: timeStamp,
            sign: this.$utils.generateSign(reqId, timeStamp),
            openId: this.$CACHE.getCache("loginSession"),
            data: {
              phoneNo: this.$StringUtils.getPhone()
            }
          }).then((res) => {
            this.$indicator.close()
            if (res.data.ret === '0') {
              window.interfacePhone.toPinganPage(res.data.data.uRL.replace('https://', ''))
            } else {
              this.$dialog.confirm(res.data.msg, '', {
                showCancelButton: false,
                confirmButtonText: '确定'
              }).then(() => {
              })
            }
          }).catch((err) => {
            this.$indicator.close()
            this.$toast('出了点小意外，请稍后再试')
          })
        }

        // 若当前状态为查看进度，则跳转到查看进度页面
        if (checkApplyProgressStatus.includes(this.isCanApply)) {
          // this.$router.push(this.$RM.checkApplyProgress)
          window.interfacePhone.toProgressPage(this.$Constants.CHECK_APPLY_PROGRESS_URL.replace('https://', ''))
        }

        // 签署授信合同
        if ('08' === this.isCanApply) {
          window.interfacePhone.toPingAnSign()
        }

        // 若当前状态可跳转到银行页面
        if (toBankPageStatus.includes(this.isCanApply)) {
          if(window.appId==='IOS'){
            window.interfacePhone.toPingAnBill()
          }else{
            window.interfacePhone.toPingAnApp()
          }
        }
      },
      /**
       * 点击查询账单还款事件
       */
      toBillPayment () {
        if(window.appId==='IOS'){
          window.interfacePhone.toPingAnBill()
        }else{
          window.interfacePhone.toPingAnApp()
        }
      },
      toInformation(){

        this.$router.push(this.$RM.InformationCenter);
      },
      toInformationDetail(item){

        this.$router.push({path: this.$RM.InformationDetail, query: {detail: item}})
      },
      /**
       * 根据授信状态返回对应的提示信息
       */
      getCreditInfoByStatus (resData) {
        // 先重置之前的一些boolean状态
        this.dateRateVisible = false
        this.visibleQueryAcct = false
        this.isBtnColorOrange = true
        this.creditAmtAndRateVisible = false
        this.preCreditTipVisible = false
        let status = resData.isCanApply
        let creditAmt = resData.bankCreditAmount || ''
        switch (status) {
          case '00': // 新用户
            this.pro_word = '一键测算'
            this.creditInfoTitleCss = 'credit-info-title1'
            this.creditInfoContentCss = 'credit-info-content1'
            return {
              title: '测一测',
              content: '您的平安惠商贷预授信额度'
            }
          case '01': // 有预授信额度
            this.pro_word = '申请平安惠商贷'
            this.creditInfoTitleCss = 'credit-info-title2'
            this.creditInfoContentCss = 'money'
            this.preCreditTipVisible = true
            return {
              title: '恭喜您！获得平安惠商贷预授信额度为',
              content: resData.preMinAmt + '-' + resData.preMaxAmt
            }
          case '02': // 无资格，0额度
            this.pro_word = '一键测算'
            this.creditInfoTitleCss = 'credit-info-title2'
            this.creditInfoContentCss = 'credit-info-content2'
            return {
              title: '抱歉，您的商户暂无平安惠商贷预授信额度,请一个月后再次测算',
              content: ''
            }
          case '03': // 安田端进件成功
            this.pro_word = '再次提交申请'
            this.creditInfoTitleCss = 'credit-info-title2'
            this.creditInfoContentCss = 'credit-info-content2'
            return {
              title: '很抱歉!',
              content: '您的申请未成功提交到平安惠商贷'
            }
          case '04': // 线上鉴权失败
            this.pro_word = '查看申请进度'
            this.creditInfoTitleCss = 'credit-info-title-04'
            this.creditInfoContentCss = 'credit-info-content-04'
            return {
              title: '请等待平安银行客户经理与您联系！',
              content: '(点击查看平安银行客户经理信息)'
            }
          case '05': // 安田端审核拒绝
            this.pro_word = '重新申请'
            this.creditInfoTitleCss = 'credit-info-title2'
            this.creditInfoContentCss = 'credit-info-content2'
            return {
              title: '很抱歉！您的平安惠商贷授信申请被拒',
              content: '(您可在一个月后再次提交申请)'
            }
          case '06': // 面签中(待面签激活)
            this.pro_word = '查看申请进度'
            this.creditInfoTitleCss = 'credit-info-title-679'
            this.creditInfoContentCss = 'credit-info-content-679'
            this.creditAmtAndRateVisible = false
            return {
              title: '恭喜您！您的平安惠商贷授信申请已通过',
              content: '等待面签中'
            }
          case '07': // 银行端审核拒绝
            this.pro_word = '重新申请'
            this.creditInfoTitleCss = 'credit-info-title2'
            this.creditInfoContentCss = 'credit-info-content2'
            return {
              title: '很抱歉！您的平安惠商贷授信申请被拒',
              content: '(您可在一个月后再次提交申请)'
            }
          case '08': // 签署授信合同
            this.pro_word = '签署授信合同'
            this.creditInfoTitleCss = 'credit-info-title2'
            this.creditInfoContentCss = 'credit-info-content3'
            this.dateRateVisible = true
            return {
              title: '恭喜您！您的平安惠商贷授信已面签通过',
              content: `${creditAmt.toLocaleString()}元`
            }
          case '09': // 重新申请授信合同
            this.pro_word = '申请平安惠商贷'
            this.creditInfoTitleCss = 'credit-info-title-679'
            this.creditInfoContentCss = 'credit-info-content-red'
            this.creditAmtAndRateVisible = false
            return {
              title: `您的预授信额度为${resData.preMinAmt}-${resData.preMaxAmt}`,
              content: '授信失效，请重新申请'
            }
          case '10': // 授信激活(已经授信成功)
            this.pro_word = '提款'
            this.visibleQueryAcct = true
            this.creditInfoTitleCss = 'credit-info-title2'
            this.creditInfoContentCss = 'credit-info-content3'
            this.dateRateVisible = true
            return {
              title: '恭喜您！您的平安惠商贷为',
              content: `${creditAmt.toLocaleString()}元`
            }
          case '11': // 授权失效
            this.pro_word = '商户授权失败'
            this.isBtnColorOrange = false
            this.visibleQueryAcct = true
            this.creditInfoTitleCss = 'credit-info-title2'
            this.creditInfoContentCss = 'credit-info-content3'
            this.dateRateVisible = true
            return {
              title: '恭喜您！您的平安惠商贷授信为',
              content: `${creditAmt.toLocaleString()}元`
            }
          case '12': // 授信结清
            this.pro_word = '申请平安惠商贷'
            this.creditInfoTitleCss = 'credit-info-title2'
            this.creditInfoContentCss = 'credit-info-content3'
            return {
              title: '您的平安惠商贷已失效，请点击申请再次获取平安惠商贷授信',
              content: '预授信金额:10万-20万'
            }
          case '13': // 安田审核与平安都进件成功
            this.pro_word = '查看申请进度'
            this.creditInfoTitleCss = 'credit-info-title-13'
            this.creditInfoContentCss = 'credit-info-content3'
            return {
              title: '恭喜您！您的平安惠商贷授信申请已受理',
              content: ''
            }
          case '14': // 进件信息提交成功，但未到审核阶段
            // 此状态按钮不可点击
            this.btnEnable = false
            this.pro_word = '查看申请进度'
            this.creditInfoTitleCss = 'credit-info-title2'
            this.creditInfoContentCss = 'credit-info-content2'
            return {
              title: '',
              content: '恭喜您！您的资料已提交成功，请稍后查看申请进度'
            }
          default:
            return {}
        }
      }
    }
  }
</script>

<style scoped>

  .bgcImg {
    background: url(/static/assets/index_backImg.png) no-repeat;
    height: 9.4rem;
    background-size: 100% 9.4rem;
    margin-top: 30px;
    box-shadow: 0 0 8px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 8px;
    text-align: center;
  }

  .netErrorBgcImg {

    background: url(/static/assets/btnImgError.png) no-repeat;
    height: 9.4rem;
    background-size: 100% 9.4rem;
    margin-top: 30px;
    box-shadow: 0 0 8px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 8px;
    text-align: center;
  }

  #indexContainer {
    margin-right: 30px;
    margin-left: 30px;
    background-color: #ffffff;
  }

  /* flex的垂直居中、水平居中，都可以抽出来当公共的演示 */
  .common_center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .top_font {
    font-size: 24px;
    color: #999999;
    line-height: 75px;
  }

  .margain_top_30 {
    margin-top: 30px;
  }

  /* 画个圆点 */
  .radius {
    width: 14px;
    height: 14px;
    background-color: #b1b1b1;
    border-radius: 100%;
  }

  .section__title {
    font-weight: bold;
    font-size: 36px;
    color: #111111;
    text-align: left;
    margin-bottom: 10px;
  }
 .section__title_flex {
    font-weight: bold;
    font-size: 36px;
    color: #111111;
    text-align: left;
    margin-top: 80px;
    margin-bottom: 10px;
		display: flex;
		justify-content:space-between;
  }
  .rmb {
    font-size: 88px;
    color: #111111;
  }

.cost_div {
	  /*background-size: 100% 100%;*/
	  margin-top: 35px;
	  background: url(/static/assets/myWorth_bg.png) no-repeat;
    background-size: cover;
	  /* box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10); */
	  border-radius: 5px;
	  width: 100%;
		text-align: center;
		padding-top: 42px;
		padding-bottom: 42px;

	}

  /* .cost-div-pink {
	  background-image: linear-gradient(to right , #fff9f2, #ffe2c0);
  } */

	.new {
		height: 134px;
		padding-left: 30px;
		padding-right: 30px;
	}
	.new .money {
		font-size:54px;
		font-family:PingFangSC-Medium;
		font-weight:500;
		color:#ffffff;
		line-height:60px;
		text-shadow:0px 1px 0px rgba(255,255,255,1);
		margin-top: 20px;
	}
	.bg {
		background: #FFEFD9;
	}
	.bg .bt .btn777{
		color:#FFFFFF !important;
		background: #FF7F2C !important;
	}
	.cost_div .new .title{

		font-size:56px;
		font-family:Futura-Medium;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:63px;
		letter-spacing:1px;
		text-shadow:1px 3px 0px rgba(218,86,0,1);
	}
	.cost_div .new .content{

		font-size:44px;
		font-family:FZLTXHK--GBK1-0;
		font-weight:normal;
		color:rgba(255,255,255,1);
		line-height:63px;
		letter-spacing:1px;
		text-shadow:1px 3px 0px rgba(218,86,0,1);
		-webkit-text-stroke:1px rgba(255,255,255,1);
		text-stroke:1px rgba(255,255,255,1);
	}
	.cost_div .new .content02{

		font-size:32px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:42px;
		text-shadow:0px 1px 0px rgba(255,255,255,1);
	}
	.cost_div  .bt{
		margin-top: 40px;
		margin-left: -35px;
		text-align: center;
	}
	.bt .btn777{
		-webkit-appearance: none; /*解决iphone safari上的按钮圆角问题*/
		font-size: 30px;
		text-align: center;
		text-shadow: 0 .1px 0 #ffffff;
		border: none;
		-webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
		-moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
		border-radius: 100px;
		-webkit-border-radius: 100px;
		-moz-border-radius: 100px;
		width: 290px;
		height: 76px;
		letter-spacing: 0.03rem;
	}

  .btn777-color {
    background-color: #fcf0e7;
    color: #fe6909;
  }

  .btn-bg-color-orange {
    background: #e4c675;
    color: #ffffff;
  }

  .btn-bg-color-red {
    background: #ffbccc;
    color: #ff3e4d;
  }

  .btn-bg-color-grey {
    background: #fcf0e7;
    color: #FFB280;
  }

  .bt .btn555{
		-webkit-appearance: none; /*解决iphone safari上的按钮圆角问题*/
		font-size: 30px;
		color: #FF6400;
    background-color: #fcf0e7;
		text-align: center;
		text-shadow: 0 1px 0 #ffffff;
		border: 1px solid #fcf0e7;
		-webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
		-moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
		border-radius: 100px;
		-webkit-border-radius: 100px;
		-moz-border-radius: 100px;
		width: 290px;
		height: 76px;
		letter-spacing: 0.03rem;
		background: #FCEFE6;
	}

.news ul{

}
.news li{
	margin-top: 30px;
	margin-bottom: 30px;
}
.news .img{
	width:200px;
	height: 140px;
	float: left;
	margin-left: 30px;
	margin-right: 30px;
}
.news .content{
  position: relative;
	height: 140px;
}
.news .title{
	overflow:hidden;
	text-overflow:ellipsis;
	display:-webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
	line-height: 42px;
	color: #333333;
	font-size: 30px;

}
.news .time{
	overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
		line-height: 33px;
		font-size: 24px;
    position: absolute;
    color: #999999;
    bottom: 0.1rem;
    margin-left: 260px;

}
 .white_bac_new {
    background-size: 100% 195px;
    margin-top: 35px;
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    width: 100%;
		padding-bottom:30px;
		padding-top:30px;
  }
	 .white_bac_wj {
	   background-size: 100% 195px;
	   margin-top: 35px;
	   background: #FF8100;
	   box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
	   border-radius: 5px;
			padding-left:40px;
			padding-top:40px;
	 }
	 .white_bac_wj .wj{
		 font-size: 32px;
		 line-height: 48px;
		 padding-bottom:40px;
		 margin-bottom: 158px;
	 }
	 .white_bac_wj .wj .title{
	 			 color: #FFFFFF;
	 }
	 .white_bac_wj .wj .content{
	 		 margin-top: 20px;
			 color: #FFFFFF;
	 }
	 .white_bac_wj .wj .bt{
		 margin-top: 40px;
	 	 margin-left: -20px;
	 	 text-align: center;

	 }
  .white_bac {
    background-size: 100% 195px;
    margin-top: 35px;
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    width: 100%;
    height: 175px;

  }

  .test-margin {
    padding-top: 15px;
  }

  .splex {
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #666666;
  }

  .common_bettween {
    display: flex;

  }

  .yancao {
    font-size: 22px;
    color: #999999;
    margin-top: 0.3rem;
    margin-bottom: 0.2rem;
  }

  .product_word {
    font-size: 30px;
    color: #666666;
    text-align: left;
    margin-left: 20px;
    margin-right: 10px;
    padding-top: 49px;

  }

  .commom_bottom {
    margin-bottom: 100px;
  }

  .toolBar {
    font-size: 36px;
    color: #111111;
    text-align: center;
    line-height: 48px;
  }

  /*定位*/

  .marginOne {
    margin-left: 10px;
  }

  .marginTwo {
    margin-right: 10px;
  }

  .marginThree {
    margin-right: 17px;
  }

  .marginFour {
    padding-right: 24px;
  }

  .outdateCss {
    font-size: 30px;
    line-height: 54px;
    color: #ea1111;
  }

  .applyContent {
    /*border: 0.013333rem solid red;*/
    width: 4.2rem;
    height: 2.6rem;
    position: relative;
    margin: auto;
    padding-top: 1.7rem;
  }

  .applyContentTitle {
    width: 100%;
    height: 100px;
    letter-spacing: 2px;
    font-size: 32px;
    color: #fff1e8;
    text-shadow: 0 1px 0 rgba(180, 71, 1, 0.50);
  }

  .applyContentWord {
    width: 100%;
    height: 100px;
    opacity: 0.8;
    font-size: 0.373333rem;
    color: #fff1e8;
  }

  .btn888 {
    -webkit-appearance: none; /*解决iphone safari上的按钮圆角问题*/
    font-size: 30px;
    color: #999999;
    text-align: center;
    text-shadow: 0 1px 0 #ffffff;
    border: 1px solid #e1e1e1;
    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
    -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    width: 4.8rem;
    height: 1.06667rem;
    letter-spacing: 0.03rem;

    background: #e1e1e1;
  }
	.btn999 {
	  -webkit-appearance: none; /*解决iphone safari上的按钮圆角问题*/
	  font-size: 30px;
	  color: #FF6400;
	  text-align: center;
	  text-shadow: 0 1px 0 #ffffff;
	  border: 1px solid #e1e1e1;
	  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
	  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
	  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
	  border-radius: 100px;
	  -webkit-border-radius: 100px;
	  -moz-border-radius: 100px;
	  width: 300px;
	  height: 76px;
	  letter-spacing: 0.03rem;

	  background: #FCEFE6;
	}
.btn666 {
    -webkit-appearance: none; /*解决iphone safari上的按钮圆角问题*/
    font-size: 30px;
    color: #999999;
    text-align: center;
    text-shadow: 0 1px 0 #ffffff;
    border: 1px solid #e1e1e1;
    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
    -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    width: 2.5rem;
    height: 0.6rem;
    letter-spacing: 0.03rem;

    background: #ffffff;
  }
  input:disabled, input[disabled] {
    opacity: 1;
  }

  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .credit-info-title1 {
    font-size:38px;
		font-family:Futura-Medium;
		font-weight:500;
		color:#ffffff;
		line-height:63px;
		letter-spacing:1px;
  }

  .credit-info-content1 {
    font-size:34px;
		font-weight:normal;
		color:#ffffff;
		line-height:63px;
		letter-spacing:1px;
    margin-top: 15px;
  }

  .credit-info-title2 {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 42px;
  }

  .credit-info-content2 {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 42px;
    margin-top: 15px;
  }

  .credit-info-content3 {
    font-size: 50px;
    font-family: PingFangSC-Medium;
    font-weight: 550;
    color: #ffffff;
    line-height: 60px;
    margin-top: 15px;
  }

  .daterate-info-cls {
    font-size: 30px;
    color: #ffffff;
  }

  .credit-amt-rate-cls {
    font-size: 25px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.76667rem;
  }

  .credit-info-content-red {
    font-size: 40px;
    font-family: PingFangSC-Medium;
    font-weight: 700;
    color: red;
    line-height: 85px;
  }

  .pre-credit-tip {
    font-size: 30px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 36px;
    margin-top: 5px;
  }

  .credit-info-title-679 {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 60px;
  }

  .credit-info-content-679 {
    font-size: 50px;
    font-family: PingFangSC-Medium;
    font-weight: 550;
    color: #ffffff;
    line-height: 85px;
  }

  .credit-info-title-04 {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 75px;
  }

  .credit-info-content-04 {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 75px;
  }

    .credit-info-title-13 {
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 100px;
  }

</style>
