<!--初始化组件-->
<template>
  <div id="app" style="height:100%;" >
    <router-view/>
  </div>
</template>

<script>
  import location from './api/location.js'
  import Store from './store';
  export default {
    name: 'App',
    data(){
      return {
        cachePage: 'BusinessAccess'
      }
    },
    mounted(){
      window['openApp'] = (params) => {
        this.goToApp(params)
      },
        window['setToH5lock'] = (params) => {
          this.setToH5lockData(params)
        },
        window['setToH5Session'] = (params) => {
          this.setToH5SessionData(params)
        },
        window.appId = '';
      let u = navigator.userAgent;
//      console.log("userAgent:" + u);
      if (u.indexOf('Android') > -1) {

        window.appId = 'ANDROID'
      } else if (u.indexOf('IOS') > -1) {
        window.appId = 'IOS'
      } else if (u.indexOf('WECHAT') > -1) {
        window.appId = 'WECHAT'
      } else if (u.indexOf('WCPA') > -1) {
        window.appId = 'WCPA';
      } else {
//        window.appId = 'WCPA'//除了安卓和ios，默认其他都是浏览器
        window.appId = 'ANDROID'
      }

       this.setCityData(); //永久缓存省市区的json数据
    },
    methods: {
        setCityData(){
          //永久缓存省市区的json数据
          let that=this;
          that.$http.get('/static/map/city.json').then(res => {
            let cityJson=JSON.stringify(res.body);
            if(!that.$StringUtils.isEmpty(cityJson)){
              localStorage.setItem("cacheCityJson",cityJson);
            }

          });
        },
      //app一打开就调用该方法，判断是否登录失效
      goToApp: function (params) {
        if (params == '0') {
          //从后台复活要判断是否超过15分钟
          let session = this.$CACHE.getCache("loginSession")
          if (session == '') {
            Store.resetTimeSession();
            //过期则弹手势或者登录
            this.getOpenApp()
          } else {
            //没有过期，不需要弹手势或者登录
          }
        } else {
          //第一次打开app，或者杀掉应用在打开
          this.getOpenApp()
        }
      },
      setToH5lockData: function (params) {
        let dataObj = JSON.parse(params);
        this.$StringUtils.setFingerLockPwd(dataObj.pwd);
        this.$StringUtils.setFingerLockType(dataObj.isLock)
      },
      setToH5SessionData: function (params) {
        let dataObj = JSON.parse(params);
        Store.setSession(dataObj.token)
        sessionStorage.setItem('cachePhone', dataObj.phone);
//        sessionStorage.setItem("loginSession", dataObj.token)
        this.$CACHE.putCache("loginSession", dataObj.token)//缓存存个15分钟

      },
      getOpenApp: function () {
        // console.log('getFingerLockPwd: ' + this.$StringUtils.getFingerLockPwd());
        // if (!this.$StringUtils.isEmpty(this.$StringUtils.getFingerLockPwd()) && this.$StringUtils.getFingerLockType() == "2") {
        //   this.$router.replace({path: '/security/fingerLockView'})
        // } else {
        this.$router.replace(this.$RM.Login)
        // }
      }

    }
  }
</script>

<style>
  @import "./css/mint.css";

  * {
    margin: 0;
    padding: 0;
  }

  input,
  textarea,
  button {
    -webkit-appearance: none; /*去除苹果safari的固有css样式*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*去除苹果safari的input内阴影*/
  }

  #app {

    /*解决IOS上滑动流畅度*/
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: auto;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000000;
  }

  ul {
    /*去掉无序列表前的黑点*/
    list-style-type: none;
  }
</style>
