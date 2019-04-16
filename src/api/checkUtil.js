/**
 * 仿照proveUtil.js的自定义的新的表单验证
 */

import proveUtil from './proveUtil.js'
import that from '../main.js' //导入main.js的全局使用参数

//规则
const rules = {

  //校验银行卡号
  vBankCard: {
    required: true,
    bank: true,
  },
  //校验交易金额
  money: {
    required: true,
  },
  //校验证件号码
  idcard: {
    required: true,
    idcard: true,
  },
  //校验交易密码
  tradepwd: {
    required: true,
    rangelength: [0, 6]
  },
  //校验数字验证码
  verifycode: {
    required: true,
    rangelength: [4, 4],
    digits: true,
  },

  //校验单位名称
  deptname: {
    required: true,
    deptname: true
  },

  //校验注册 阅读协议
  registerAgree: {
    agree:true
  },
  //校验资料填写的第二步的银行卡代扣 阅读协议
  bankProto: {
    agree:true
  },
  //校验资料填写的第二步的个人授权 阅读协议
  personAgree: {
    agree:true
  },
  //校验我的估值的，阅读协议
  myWorthValAgree: {
    agree:true
  },
  //校验信用卡号
  creCard: {
    required: true,
    digits: true,
    minlength: [16],
  },
  //校验图形验证码
  imgCode: {
    required: true,
    numOrEng: true,
    rangelength: [4, 4],
  },
  //校验账户名
  account: {
    required: true,
    china: true,
  },
  //校验证件号码
  licen: {
    required: true,
  },
  //校验信用卡3位安全码
  cvv2: {
    required: true,
    digits: true,
  },
  //校验手机号码
  phoneRule: {
    required: true,//这个代表规则不能为空，代表说明的信息是下面设置的message
    tel: true,//代表要用到proveUtil里面的tel属性的判断
  },
  //校验订烟系统账号
  newAccount: {
    required: true,
  },
  //校验订烟系统密码
  newAccountPwd: {
    required:  true,
  },
  //校验借款人姓名
  vLawName: {
    required:  true,
    china:true,
  },
  //校验借款人身份证
  vIdcard: {
    required:  true,
    idcard:  true,
  },
  //校验选择银行
  vBank: {
    required:  true,
  },

  //校验营业执照
  vLicen: {
    required:  true,
    licen:true,
  },
  //校验婚姻状况
  vMarrage: {
    required:  true,
  },
  //校验紧急联系人关系
  vRelation: {
    required:  true,
  },
//校验紧急联系人姓名
  vUrgentName: {
    required:  true,
    china:true,
  },
  //校验紧急联系人联系方式
  vUrgentPhone: {
    required:  true,
    tel:true,
  },
  //校验配偶姓名不能为空
  vMateName: {
    required:  true,
    china: true,
  },
  //校验配偶身份证号码
  vMateIdcard: {
    required:  true,
    idcard:  true,
  },
  //校验配偶手机号码
  vMatePhone: {
    required:  true,
    tel:true,
  },
  //校验订制时间
  clockVal: {
    required:  true,
  },

};

//错误提示语
const messages = {
  //校验资料填写的第二步的银行卡代扣 阅读协议
  bankProto: {
    agree:"请勾选阅读并同意签署《银行卡代扣代付协议》后确认绑定"
  },
  //校验银行卡号
  vBankCard: {
    bank:  "银行卡号格式有误，请重新输入",
  },
  //校验选择银行
  vBank: {
    required:  "请选择开户银行",
  },
  money: {
    required:'请输入申请金额',
  },
  idcard: {
    required: '请输入证件号码',
  },
  account:{},
  verifycode: {
    required: '短信验证码不能为空',
    rangelength: '验证码错误',
    digits: "",
  },
  tradepwd:{
    required:'请输入交易密码',
    rangelength:'请输入有效的6位交易密码'
  },
  deptname: {
    required: '请输入单位名称',
    deptname: '请输入正确的单位名称'
  },
  personAgree:{
    agree:'请勾选阅读并同意签署《个人授权协议》后点击下一步',
  },
  myWorthValAgree:{
    agree:'请勾选阅读并同意签署《商户经营性数据授信查询》后点击验证',
  },
  registerAgree:{
    agree:'请勾选阅读并同意签署《使用协议》后点击立即注册',
  },
  creCard: {
    required: "请输入信用卡号",
    digits: "",
    minlength: "请输入正确的16位信用卡号",
  },
  imgCode: {
    required: "请输入图形验证码",
    numOrEng: "",
    rangelength: "请输入正确的4位图形验证码",
  },
  //校验信用卡3位安全码
  cvv2: {
    required: '请输入安全码',
  },
  phoneRule: {
    required: '手机号不能为空',
  },
  newAccount: {
    required: '订烟系统账号不能为空',
  },
  newAccountPwd: {
    required: '订烟系统密码不能为空',
  },
  vLawName: {
    required: '借款人姓名不能为空',
    china:'借款人姓名由2-6位汉字组成',
  },
  vIdcard: {
    required: '借款人身份证不能为空',
    idcard:"身份证号码格式错误，请重新输入"
  },
  vLicen: {
    required: '营业执照不能为空',
    licen:'营业执照注册号由13-18位数字或字母组成'
  },
  vMarrage: {
    required: '婚姻状况不能为空',
  },
  vRelation: {
    required: '紧急联系人关系不能为空',
  },
  vUrgentName: {
    required: '紧急联系人姓名不能为空',
    china:'紧急联系人姓名由2-6位汉字组成',
  },
  vUrgentPhone: {
    required: '紧急联系人联系号码不能为空',
  },
  vMateName: {
    required: '配偶姓名不能为空',
    china:'配偶姓名由2-6位汉字组成',
  },
  vMateIdcard: {
    required: '配偶身份证号码不能为空',
    idcard:"身份证号码格式错误，请重新输入"
  },
  vMatePhone: {
    required: '配偶手机号码不能为空',

  },
  //校验订制时间
  clockVal: {
    required:  '订烟提醒时间不能为空',
  },
};

function dialog(err) {
  that.$utils.toast(err.msg);
}
export default{
  rules: rules,
  messages: messages,
  dialog: dialog,
  proveUtil: proveUtil
}
