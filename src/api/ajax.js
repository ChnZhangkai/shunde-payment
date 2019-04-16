let ROOT = 'https://wechatapp.antiantech.com/iccs-pre';//根路径//测试环境
// let ROOT = 'http://127.0.0.1:18095/iccs-pre';//根路径//测试环境

// let ROOT = 'https://iccs-pre.antiantech.com/iccs-pre';//根路径//生产环境

let axios = require('axios');
import constants from './constants'
import {Toast} from 'mint-ui';
import _this from '../main.js';

// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// 设置超时时间为10秒
axios.defaults.timeout = 10000;
/*
 接口处理函数
 这个函数每个项目都是不一样的，我现在调整的是适用于
 https://cnodejs.org/api/v1 的接口，如果是其他接口
 需要根据接口的参数进行调整。参考说明文档地址：
 https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
 主要是，不同的接口的成功标识和失败提示是不一致的。
 另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
 */
axios.interceptors.response.use(data=> {
    console.log(JSON.stringify(data.data));
    if (data && data.config && (data.config.url.indexOf(constants.IS_ACCESS) != -1
      || data.config.url.indexOf(constants.GET_MESSAGE_LIST) != -1) || data.config.url.indexOf(constants.UPDATE_PASSWORD) != -1) {
      // 查询是否授权和消息列表不需要弹框
      return data;
    }
    // 每个接口只要返回ret等于000002，则直接拦截返回，并走登录失效的逻辑
    if (data.status && data.status == 200 && data.data.ret == '000002') {
      _this.$dialog.alert("    ",_this.$ERRCODE.STATIC_ERRORCDDE.ALREADY_LOGIN);
      _this.$StringUtils.loginOut();
      return;
    }

    if (data.status && data.status == 200 && data.data.ret != '0') {
      if (!dealErrorMsg(data)) {
        if(data.data.ret === '0001' ||data.data.ret === '0002' ||data.data.ret === '0003' ||data.data.ret === '0004' ||data.data.ret === '1001' ||data.data.ret === '2001' ||data.data.ret === '300032' ||data.data.ret === '300033' ||data.data.ret === '300036' ||data.data.ret === '300037'){
          return data;
        }
        // Toast(data.data.msg);//去掉多余弹框
      }
      return data;
    }
    return data;
  },
  err=> {
    if (err && err.request && err.request.readyState == 4 && err.request.status == 0) {
      // Toast('服务器连接超时');
      return Promise.resolve(err)
    }
    if (err && err.response) {
      if (err.response.status == 504 || err.response.status == 404) {
        Toast({message: '服务器异常!'});
      } else if (err.response.status == 403) {
        Toast({message: '权限不足,请联系管理员!'});
      } else {
        Toast({message: '未知错误!'});
      }
    }
    return Promise.resolve(err);
  }
)

/**
 * 处理后台返回的错误码，弹出正确的错误信息
 * @param data
 * @returns {boolean} true表示已经重新定义后台返回的错误信息，不需要再提示后台的错误信息;false表示需要返回后台的错误信息
 */
function dealErrorMsg(data) {
  if (data.config.url.indexOf(constants.IS_AREA_OPEN) != -1) {
    // 验证客户所在区域是否已开展业务需要自定义错误信息返回
    if (data.data.ret == '300001') {
      Toast('对不起，该烟草证所在区域暂未开展业务，敬请等待！');
      return true;
    }
  }
  return false;
}

//添加请求拦截拦截
axios.interceptors.request.use(config=> {
  //在发送请求之前
  console.log(JSON.stringify(config.data));
  return config;
}, error=> {
  //请求错误时做些些
  console.log(error);
  return error;
});

function apiAxios(method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: ROOT,
    withCredentials: false
  })
    .then(function (res) {
      if (res && res.status === 200) {
        if (success) {
          success(res.data)
        }
      } else {
        if (failure && res) {
          failure(res)
          console.log('error: ' + JSON.stringify(res));
        } else {
          console.log('error: ' + JSON.stringify(res));
        }
      }
    })
    .catch(function (err) {
      if (failure && err) {
        failure('error: ' + JSON.stringify(err))
        console.log(err);
      }
    })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  //暴露域名
  ROOT,

}
