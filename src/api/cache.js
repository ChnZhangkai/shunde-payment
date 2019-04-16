/**
 * 二次封装缓存，增加时效性
 * 详情请看：https://blog.csdn.net/chjj0904/article/details/78665380
 */
import _this from '../main.js';
import _StringUtils from '../api/StringUtils.js';

export default {
//存缓存，如  this.$CACHE.putCache("test", "存入缓存的内容", 1 * 60);存1分钟
  putCache(key, val, time) {
    if (_this.$StringUtils.isEmpty(time) || time <= 0) {
      //如果没有传失效时间，默认是15分钟缓存失效
      time = 15* 60;
    }
    localStorage.setItem(key,val);
    var seconds = parseInt(time);
    if (seconds > 0) {
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000 + seconds;
      localStorage.setItem(key + 'dtime', timestamp + "");
    } else {
      localStorage.removeItem(key + 'dtime');
    }
  },
//取缓存，def是没有取到缓存时返回的内容，支持字符串、json、数组、boolean，如app.getCache("test","没有缓存时输出的内容")
  getCache(key, def) {
    var deadtime = parseInt(localStorage.getItem(key + 'dtime'));
    if (deadtime) {
      if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
        //缓存时效性失效之后
        if (def) {
          return def;
        } else {
          return;
        }
      }
    }
    var res =localStorage.getItem(key);
    if (res) {
      return res;
    } else {
      return def;
    }
  },

  showErr(){
    //超过15分钟了，需要强制登陆跳转,登陆的页面
    _this.$dialog.alert("    ","登陆超时，请重新登陆");
    //判断是密码登陆还是 手势登陆
    if( !_StringUtils.isEmpty(_StringUtils.getFingerLockPwd())  && _StringUtils.getFingerLockType()==="2"){
      _this.$router.replace({path: '/security/fingerLockView'});
    }else{
      _this.$router.replace(_this.$RM.Login);
    }
  },
}
