<!--我的界面-->
<template>
  <mt-loadmore :top-method="loadTop" ref="loadmore">
    <div class="divOne" style="position:relative">
      <ToolBar isShowNav="false">
        <img src="/static/assets/info.png" slot="right" class="barRight" @click="toMessageCenter">
        <i v-if="isShowBadge" class="smallCircle"></i>
      </ToolBar>
      <!--一行代码即可吊起上拉菜单-->
      <mt-actionsheet :actions="data" v-model="cheetVisible"></mt-actionsheet>
      <div class="toolBarExtra">
        <span class="loginName" @click="login">{{loginName}}</span>
        <span class="loginTips" @click="login">欢迎来到安田</span>

        <div class="test">
          <img class="touxiang" :src="zouseSrc" @click="toActionSheet('zouse')" :style="isHouseAble" />
        </div>
      </div>

      <p class="accessTitle">我的授权</p>
      <div class="accessGroup">
        <div class="accessInfo">
          <span class="businessAccess">订烟系统</span>
          <span v-if="accessState == 11" class="accessInvalid">授权失效，请重新授权</span>
        </div>
        <span class="businessBtn" :class="{auth : accessState == 1}"
              @click="toAccess">{{accessState==1 ?'已授权':'立即授权'}}</span>
      </div>

      <ul style="margin-top: 0.8rem;margin-left: 0.3rem">
        <li v-for="(text,index) in textList" style="margin-left: 0.1rem">
          <img class='imgapp' :src="text.imgPath">
          <IntentltemHelp :index="index" isBold @click.native="intent(index)">{{text.text}}</IntentltemHelp>
        </li>
      </ul>

      <div class="aaaa">
        <ul>
          <li style="margin-left: 0.1rem">
            <img class="imgAppHoe" src="../../../static/assets/phone2x.png" />
            <IntentItem style="margin-left: 0.01rem;" @click.native="intent(6)" isBold>
              电话咨询
              <span slot="extra_text" class="phone" @click="PhoneClick">
	           {{phtwe}}
	            </span>
            </IntentItem>
          </li>
        </ul>
      </div>

      <!-- <ButtonColourMethod style="margin-left: 0.4rem;margin-bottom: 0.6rem; margin-right: 0.4rem " @click.native="exit" isBold>
        安全退出
      </ButtonColourMethod> -->
      <!-- <ButtonColourMethod style="margin-left: 0.4rem;margin-bottom: 0.6rem; margin-right: 0.4rem " @click="exit" isBold>
        安全退出
      </ButtonColourMethod> -->
      <div class="exitDiv">
        <button class="exitBtn" @click="exit">安全退出</button>
      </div>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
  </mt-loadmore>
</template>
<script>
  import IntentltemHelp from '../IntentltemHelp.vue'
  import ToolBar from '../ToolBar.vue'
  import AuthorizationSegment from '../AuthorizationSegment.vue'
  import IntentItem from '../IntentItem.vue'
  import ButtonColourMethod from '../ButtonColourMethod.vue'

  const AUTH = 1;
  const UN_AUTH = 2;
  const INVALID = 11;
  export default{
    components: {IntentltemHelp, ToolBar, AuthorizationSegment,IntentItem,ButtonColourMethod},
    data(){
      return {
        //新商盟授权的状态，1代表已授权，2，代表未授权，3代表失效，失效要显示红色提示消息
        accessState: UN_AUTH,
        loginName: !this.$StringUtils.isLogin() ? '登录/注册' : '安田',
        phone: '呼叫 400-6884-666',
        phtwe: '400-6884-666',
        token: null,
        path:"",
        tempType: "",
        zouseSrc:"../../../static/assets/touXiangX1.png",
        // action sheet 选项内容
        data: [{
          name: '拍照',
          method: this.getCamera	// 调用原生提供的拍照的methods中的函数
        }, {
          name: '从相册中选择',
          method: this.getAlbum	// 调用原生提供的选择图片的methods中的函数
        }],
        // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        sheetVisible: false,
        cheetVisible:false,
        isShowBadge: false,
        newReturnBusinessAccount: '',
        actions: [],
        textList: [
          {
            id: 0,
            text: '我的信息',
            imgPath:"../../../static/assets/Information2x.png"
          }, {
            id: 1,
            text: '业务开展区域校验',
            imgPath:"../../../static/assets/business2x.png"
          }, {
            id: 2,
            text: '安全设置',
            imgPath:"../../../static/assets/safe2x.png"
          }, {
            id: 3,
            text: '专属服务',
            imgPath:"../../../static/assets/serve2x.png"
          },{
            id: 4,
            text: '帮助中心',
            imgPath:"../../../static/assets/help2x.png"
          }, {
            id: 5,
            text: '意见反馈',
            imgPath:"../../../static/assets/opinion2x.png"
          }
        ]
      }
    },
    methods: {
      toActionSheet(type){
        //弹出底部动画
        this.actionSheet();
        this.tempType = type;
      },
      // 打开选择照片action sheet弹出菜单
      actionSheet: function () {
        this.cheetVisible = true;
      },
      PhoneClick(){
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.telephoneClick,
          "segmentation": {
            appId: window.appId,
          }
        });

      },
      getCamera() {
        // var that = this;
        // this.path='data:image/jpeg;base64,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'
        // that.uploadImg(this.path);//调取上传图片方法
             var that = this;
        if (sessionStorage.getItem("cacheNet") === 'true') {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.NET_ERROR);
          that.$router.push(that.$RM.Netbroken);
        } else {
          window.interfacePhone.takePhoto();//吊起原生提供的方法
          //在拍照里面判断，是安卓还是ios还是微信
          if (window.appId == 'ANDROID') {
            console.log('选择安卓相册....');
            window.onPhotoSelected = function () {
              for (var i = 0; i < arguments.length; i++) {
                if (arguments[i].indexOf("9j") != -1) {
                  //一般bsae64的图片都会带上9j这样的字符 //拿到base64的图片，直接调取工具类判断图片大小
                  let photoSize = that.$utils.showSize(arguments[i]);
                  if (photoSize >= 5) {
                    that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IMG_SIZE_LARGE_ERROR);
                    return
                  }
                  //上传图片
                  that.uploadImg(arguments[i]);//调取上传图片方法
                }
              }
            }

          }
          if (window.appId == 'IOS') {
            console.log('苹果相机....');
            window.onPhotoSelectIOS = function (path) {
              if (!that.$StringUtils.isEmpty(path)) {
                const iosBase64 = 'data:image/*;base64,';
                path = iosBase64 + path;//ios返回给我没给我拼接上base64前缀，这里拼接上
                //拿到base64的图片，直接调取工具类判断图片大小
                let photoSize = that.$utils.showSize(path);
                if (photoSize >= 5) {
                  that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IMG_SIZE_LARGE_ERROR);
                  return
                }
                that.uploadImg(path);//调取上传图片方法
              }
            }
          }
        }
      },
      getAlbum() {
        var that = this;
        if (sessionStorage.getItem("cacheNet") === 'true') {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.NET_ERROR);
          that.$router.push(that.$RM.Netbroken);
        } else {
          //安卓
          if (window.appId === 'ANDROID') {
            console.log('选择安卓相册....');
            if (that.tempType === 'stream') {//流水图片
              window.interfacePhone.takePhotos(3 - (that.streamSrcData.length));//多图相册，选择吊起这个方法,最多3张
            } else {
              window.interfacePhone.pickPhoto();//单图相册，选择吊起这个方法
            }
            window.onPhotoSelected = function () {
              for (var i = 0; i < arguments.length; i++) {
                if (arguments[i].indexOf("9j") != -1) {
                  //一般bsae64的图片都会带上9j这样的字符 //拿到base64的图片，直接调取工具类判断图片大小
                  let photoSize = that.$utils.showSize(arguments[i]);
                  if (photoSize >= 5) {
                    that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IMG_SIZE_LARGE_ERROR);
                    return
                  }
                  //上传图片
                  that.uploadImg(arguments[i]);//调取上传图片方法
                }
              }
            }
          }
          //ios
          if (window.appId === 'IOS') {
            console.log('选择苹果的相册....');
            const iosBase64 = 'data:image/*;base64,';
            if (that.tempType === 'stream') {//流水图片
              window.interfacePhone.pickPhoto(3 - (that.streamSrcData.length));//多图相册，选择吊起这个方法,最多3张
            } else {
              window.interfacePhone.pickPhoto(1);//单图相册，选择吊起这个方法
            }
            window.onPhotoSelect = function () {
              for (var i = 0; i < arguments.length; i++) {
//                循环拼接上base64的前缀
                if (arguments[i].indexOf("9j") != -1) {//一般bsae64的图片都会带上9j这样的字符
                  let testPa = iosBase64 + arguments[i];//ios返回给我没给我拼接上base64前缀，这里拼接上
                  let photoSize = that.$utils.showSize(arguments[i]);
                  if (photoSize >= 5) {
                    that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.IMG_SIZE_LARGE_ERROR);
                    return
                  }
                  that.uploadImg(testPa);
                }
              }
            }
          }

        }
      },
      intent(index){
        switch (index) {
          case 0:
            if (!this.$StringUtils.isLogin()) {
              this.$router.push(this.$RM.Login)
            } else {
              if (this.accessState == AUTH) {
                if(this.loginName !='安田'){
                  this.$router.push(this.$RM.PersonInfo)
                }else{
                  this.$router.push(this.$RM.HintMessage)
                }
              } else {
                this.$router.push(this.$RM.HintMessage)
              }
            }
            break;
          case 1:
            if (!this.$StringUtils.isLogin()) {
              this.$router.push(this.$RM.Login)
            } else {
              this.$router.push(this.$RM.QueryBusinessArea)
            }
            break;
          case 2:
            if (!this.$StringUtils.isLogin()) {
              this.$router.push(this.$RM.Login)
            } else {
              this.$router.push(this.$RM.SecuritySetting)
            }
            break;
          case 3:
            if(this.accessState ==1){
              this.$router.replace(this.$RM.RemindNote)
            }else if(this.accessState  ==2){
              this.$router.push(this.$RM.DedicatedServe)
            }else if(this.accessState  ==11){
              this.$router.push(this.$RM.DedicatedServe)
            }
            break;
          case 4:
            this.$router.push(this.$RM.HelpCenter)
            break;
          case 5:
            if (!this.$StringUtils.isLogin()) {
              this.$router.push(this.$RM.Login)
            } else {
              this.$router.push(this.$RM.FeedBack)
            }
            break;
          case 6:
            this.sheetVisible = true
            break
        }
      },
      loadTop(){
        if (!this.$StringUtils.isLogin()) {
          console.log("未登录")
          this.$refs.loadmore.onTopLoaded();
          // 没有登陆则不查询是否授权和是否有未读消息
          return
        }
        console.log('查询授权信息');
        this.$api.post(this.$Constants.IS_QUERY_ACTIVATE, {
          //        "appId": window.appId,
          "appId": window.appId,
          "reqId": this.$StringUtils.getReqId(),
          "timestamp": Date.now(),
          "openId": this.$StringUtils.getOpenId(),
          "data": {
            "phone":sessionStorage.getItem("inputPhone")
          }
        }, function (result) {
          this.$refs.loadmore.onTopLoaded();
          this.saveAccessData(result);
        }.bind(this), function (err) {
          this.$refs.loadmore.onTopLoaded();
        }.bind(this))
      },
      saveAccessData(result){
        if (result && result.ret) {
          if (result.data) {
            this.newReturnBusinessAccount = result.data.newReturnBusinessAccount
            sessionStorage.setItem('newReturnBusinessAccount',this.newReturnBusinessAccount)
            if(result.data.legalPersonName ==null){
              this.loginName ='安田'
            }else{
              this.loginName = result.data.legalPersonName
            }
          }
          switch (result.ret) {
            case '0':
              this.accessState = AUTH
              break
            case '100000':
              this.accessState = UN_AUTH
              break
            case '100002':
              this.accessState = INVALID
              break
          }
        }
      },
      toMessageCenter(){
        if (!this.$StringUtils.isLogin()) {
          this.$router.push(this.$RM.Login)
        } else {
          this.$router.push(this.$RM.MessageCenter)
        }
      },
      toAccess(){
        Countly.init({
          app_key: this.$Constants.APPKEY,
          url: this.$Constants.ROOTMAI, //your server goes here
          debug: true,
        })
        Countly.track_sessions();
        Countly.track_pageview();
        Countly.add_event({
          key: this.$Constants.confirmButton_two,
          "segmentation": {
            appId: window.appId,
          }
        });
        if (!this.$StringUtils.isLogin()) {
          // 没有登陆跳转到登陆界面
          this.$router.push(this.$RM.Login)
        } else {
          switch (this.accessState) {
            case AUTH:
              this.$router.push({name: this.$RM.AccessInfo, params: {account: this.newReturnBusinessAccount}})
              break
            case INVALID:
              this.$router.push({name: this.$RM.AuthorizationActivat, params: {account: this.newReturnBusinessAccount}})
              break
            case UN_AUTH:
              this.$router.push(this.$RM.BusinessAccess)
              break
          }
        }
      },
      call(){
        console.log(window.appId)
        if (window.appId == "ANDROID" || window.appId == "IOS") {
          window.interfacePhone.callPhone(this.phone)
        }


      },
      //监听网络状态
      checkNetWork() {
        let that=this;
        let el = document.body;
        if (el.addEventListener) {
//          addEventListener——兼容：firefox、chrome、IE、safari、opera；不兼容IE7、IE8
          window.addEventListener("online", function () {
//            alert("有网....");
            that.netError = false;
            sessionStorage.setItem("cacheNet", "false")
          });
          window.addEventListener("offline", function () {
//            alert("网络走丢了....");
            that.netError = true;
            sessionStorage.setItem("cacheNet", "true")
          });
        }

      },
      //图片上传到服务器
      uploadImg(path) {
        //15分钟之后失效，强制登陆
        // if (this.$StringUtils.isEmpty(this.$storeData.fetchSession())) {
        //   return
        // }
        var that = this;
        if (sessionStorage.getItem("cacheNet") === "true") {
          that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.NET_ERROR);
          that.$router.push(that.$RM.Netbroken);
        } else {
          let photoType = "";
          //通过全局变量判断点击的上传的类型
          if (that.tempType === 'zouse') {//头像图片
            photoType = "04"
          }
          let fileName = that.$utils.randomString(15) + ".jpg";//文件名必须加个后缀，后台不知道图片格式会报错
          let timestamp = that.$utils.generateSignTime();
          let reqId = that.$utils.generateSignTime();
          let sign = that.$utils.generateSign(reqId, timestamp);
          //开始请求图片上传接口
          const url =that.$api.ROOT +that.$Constants.UPLOAD_IMG;
          that.$indicator.open("上传中...");
          //开始请求上传图片接口
          that.$http.post(url, {
            appId: window.appId,
            reqId: reqId,
            timestamp: timestamp,
            sign: sign,
            openId: that.token,
            data: [
              {
                photoType: photoType, fileName: fileName, base64Str: path
          }
        ]
          })
            .then(function (res) {
              console.info('成功请求到上传图片接口>>>');
              console.info(res.data);
              if (res.data.ret === '0') {
                that.$indicator.close();
                var imageId = res.data.data.imageId;
                if (that.$StringUtils.isEmpty(imageId)) {
                  //图片上传失败
                  that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.RTN_300009);
                  return
                }

                if (that.tempType === 'zouse') {//房产图片
                  //显示进度条
//                  that.imgHouseProgress = true;
//                  that.canvasHouse(100);

                  Countly.init({
                    app_key: that.$Constants.APPKEY,
                    url: that.$Constants.ROOTMAI, //your server goes here
                    debug: true,
                  })
                  Countly.track_sessions();
                  Countly.track_pageview();
                  Countly.add_event({
                    key: that.$Constants.QuickPushHouse,
                    "segmentation": {
                      appId: window.appId,
                    }
                  });
                  that.zouseSrc = 'http://image.antiantech.com/ImagePlatform/file/downloadFile.htm?picId='+imageId;//页面显示图片
                  that.isHouseAble = "pointer-events: none",//是否禁用这个标签，" "是不禁用,
                    that.house = imageId;//后台服务器返回的Id，存入全局变量；
                  sessionStorage.setItem("quickCacheHouseImageId", that.house);//把返回来的图片id也缓存起来，防止丢失，记得清除
                  sessionStorage.setItem("quickCacheHouse", path);//JSON.stringify，把对象转成json字符串
                }
              } else {
                that.$indicator.close();
                if (res.data.ret === '000002') {
                  that.$dialog.alert("    ",that.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
                  that.$StringUtils.loginOut();
                  return
                }
                console.info('上传失败...');
              }
            })
            .catch(function () {
              that.$indicator.close();
              console.info('系统错误...');
            });
        }

      },
      login(){
        if (!this.$StringUtils.isLogin()) {
          this.$router.push(this.$RM.Login)
        }
      },
      exit(){
        let that = this


        if (!that.$StringUtils.isLogin()) {
          that.$router.push(this.$RM.Login)
        } else {
          
          // alert(this.$StringUtils.isLogin())
          // that.$dialog.alert('这是一个窗口')
          // that.$dialog({
          //   title: "温馨提示",
          //   message: "是否退出当前登录账号？",
          //   showCancelButton: true,
          //   confirmButtonText: "是",
          //   cancelButtonText: "否"
          // }).then(action => {
          //   if(action == 'confirm'){
          //     this.$storeData.romveTimeSession()
          //     sessionStorage.removeItem('cachePhone')
          //     sessionStorage.removeItem('writeOneInfo')
          //     sessionStorage.removeItem('writeOtherInfo')
          //     sessionStorage.removeItem('writeOtherOld')
          //     sessionStorage.removeItem('bindBankSuccess')
          //     this.$router.push(this.$RM.Login)
          //   }
          // })
          
          that.$dialog.confirm('  ', '是否退出当前登录账号？', {confirmButtonText: '是', cancelButtonText: '否'})
            .then(function (action) {

              this.$storeData.romveTimeSession()
              sessionStorage.removeItem('cachePhone')
              sessionStorage.removeItem('writeOneInfo')
              sessionStorage.removeItem('writeOtherInfo')
              sessionStorage.removeItem('writeOtherOld')
              sessionStorage.removeItem('bindBankSuccess')
              this.$router.push(this.$RM.Login)

              // if (window.appId == "IOS") {
              //   window.interfacePhone.removeSession()
              //   window.interfacePhone.removePwd()
              // }
            }.bind(that));
        }
      }
    },
    mounted(){
      //监听网络状态
      this.checkNetWork();
      this.actions = [{
        name: this.phone,
        method: this.call
      }];
      //获取登录态
      var token = this.$CACHE.getCache("loginSession");
      this.token = token;//登陆态，赋值给全局变量
      //15分钟之后登陆态失效，强制重新登陆
      if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
        this.$CACHE.showErr();
        return
      }else{
        this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
      }
      console.log('查询是否有未读消息');
      this.$api.post(this.$Constants.GET_MESSAGE_LIST, {
        //        "appId": window.appId,
        "appId": window.appId,
        "reqId": this.$StringUtils.getReqId(),
        "timestamp": Date.now(),
        "openId": this.$StringUtils.getOpenId()
      }, function (result) {
        if (result && result.data) {
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].state === '01') {
              // 只要消息列表有一条未读消息，图标就显示红点
              this.isShowBadge = true
            }
          }
        }
      }.bind(this))

      console.log('查询授权信息');
      this.$api.post(this.$Constants.IS_QUERY_ACTIVATE, {
        //        "appId": window.appId,
        "appId": window.appId,
        "reqId": this.$StringUtils.getReqId(),
        "timestamp": Date.now(),
        "openId": this.$StringUtils.getOpenId(),
        "data": {
          "phone":sessionStorage.getItem("inputPhone")
        }
      }, function (result) {
        this.saveAccessData(result);
      }.bind(this))
    }
  }
</script>
<style scoped>
  .smallCircle {
    position: absolute;
    background: #f43530;
    right: 0;
    margin-top: 12px;
    margin-right: 16px;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    z-index: 1;
  }
  .imgapp{
    width:6%;
    height: 5%;
    float: left;
    margin-top: 4%;
    margin-left: 30px;
    margin-right: 30px;
  }
  .imgAppHoe{
    width:6%;
    height: 5%;
    float: left;
    margin-top: 4%;
    margin-left:49px;
    margin-right: 30px;
  }


  .barRight {
    position: absolute;
    right: 0;
    height: 0.5rem;
    width: 0.55rem;
    margin-top: 0.2rem;
    padding-right: 0.30rem;
  }
  .toolBarExtra {
    background: #ffffff;
    height: 240px;
    display: flex;
    padding-left: 30px;
    flex-direction: column;
    align-items: flex-start;
    -webkit-tap-highlight-color: transparent;
  }

  .toolBarExtra .loginName {
    font-size: 42px;
    color: #333333;
    margin-top: 60px;
    line-height: 60px;
    text-align: left;
    font-weight: bolder;
  }

  .toolBarExtra .loginTips {
    font-size: 26px;
    color: #666666;
    margin-top: 5px;
    text-align: center;
    margin-bottom: 80px;
  }

  .accessTitle {
    font-size: 36px;
    color: #111111;
    text-align: left;
    line-height: 54px;
    margin-top: 60px;
    font-weight: bolder;
    margin-left: 30px;
  }
  .touxiang{
    position: absolute;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    height: 100%;
    width: 100%;
  }
  .accessInvalid {
    font-size: 24px;
    color: #CE3A01;
    letter-spacing: 0;
    text-align: left;
  }

  .accessGroup {
    background: #FF9D00;
    box-shadow: 0 0 4px 0 rgba(255, 100, 0, 0.08), 0 4px 12px 0 rgba(0, 0, 0, 0.10);
    border-radius: 8px;
    height: 180px;
    margin: 20px 30px 0;
    padding: 0 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .accessGroup .accessInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
  }
  .test {
    position: absolute;
    width: 130px;
    height: 130px;
    background-color:beige;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    margin-top: 2%;
    top:  6.5%;
    left: 75%;
    margin-top: 2%;
    border-top:2px solid #ffffff;
  }
  .accessGroup .accessInfo .businessAccess {
    font-size: 30px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: left;
    font-weight: bolder;
  }

  .accessGroup .businessBtn {
    border: 2px solid #FFFFFF;
    border-radius: 100px;
    width: 154px;
    color: #FFFFFF;
    text-align: center;
    font-size: 26px;
    line-height: 56px;
  }

  .phone {
    font-size: 26px;
    color: #999999;
    line-height: 42px;
    margin-right: 36px;
    text-align: right;
  }

  .auth {
    border: none;
    color: #017ad4;
  }

  .exitDiv{
    display: flex;
    padding-top: .35rem;
    padding-bottom: .35rem;
    align-items: center;
    flex-direction: column-reverse;
  }

  .exitBtn{
    background-color: white;
    line-height: 1rem;
    flex-grow: 1;
    width: 90%;
    font-size: .5rem;
    color: #999999;
    border-bottom: 1px solid #999999;
  }
</style>
