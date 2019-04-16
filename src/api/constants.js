
//我的界面  激活状态更改
const IS_UPDATE_ACTIVATION = '/credit/updateActivation.htm';

//我的界面 激活状态查询
const IS_QUERY_ACTIVATE = '/credit/queryActivate.htm';
//意见反馈
const FEED_BACK = '/credit/feedBack.htm';
//获取我的信息
const GET_USER_INFO = '/common/queryMerchantInfo.htm';
//更新联系人
const UPDATE_CONTACT = '/credit/modifyHomeRe.htm';
//授权状态查询  
const IS_ACCESS = '/customer/verifyAccount.htm';
//消息中心列表
const GET_MESSAGE_LIST = '/credit/queryMessageDetail.htm';
//修改密码
const UPDATE_PASSWORD = '/app/operate.htm';
//验证客户所在区域是否已开展业务
const IS_AREA_OPEN = '/customer/checkBusinessIsOpen.htm';
//新商盟授权短信验证码
const BUSINESS_SEND_SMS = '/common/sendAuthCode.htm';
//新商盟激活授权
const BUSINESS_ACCESS = '/credit/creditAlive.htm';
//获取帮助列表
const GET_HELP_LIST = '/credit/helpListQuery.htm';
//消息修改已读状态
const MODIFY_MESSAGE_STATUS = '/credit/modifyMessageStatus.htm';

//校验验证码
const CHECK_VERIFICATION = '/credit/verification.htm';

//获取验证码
const GET_VERIFICATION = '/common/sendCode.htm';

//上传图片接口
const UPLOAD_IMG = '/common/uploadPhoto64.htm';

// 保存通讯录信息接口
const SAVE_ADDRESS_BOOK = '/credit/saveAddressBook.htm'
// 保存通话记录接口
const SAVE_CALL_RECORDS = '/credit/saveCallRecords.htm'

//常规进件接口
const APPLYLOANDATA = '/credit/applyLoanData.htm';

//查询新商盟账号信息
const QUERYNEWBUSINESSACCOUNT = '/customer/queryCustInfoByNewBusinessAccount.htm';

//登陆注册接口
const OPERATE ="/app/operate.htm";

//查询状态接口

const QUERYCREDITSTATUS = '/credit/queryCreditStatus.htm';

//查询资讯接口
const GET_INFORMATION = '/information/get.htm';

//修改或新增资讯接口
const ADD_UPDATE_INFORMATION = '/information/addOrUpdate.htm';

//资讯访问量计数
const ADD_INFORMATION_VIEW_COUNT = '/information/addCount.htm';

//资讯分享量计数
const ADD_INFORMATION_SHARE_COUNT = '/information/addShare.htm';

//资讯查询点赞
const IS_LIKE = '/information/isLike.htm';

//资讯点赞或取消
const ADD_UPDATE_LIKE = '/information/addOrUpdateLike.htm';

// 校验订烟系统账号与密码
const CHECK_NEWBUSINESS_ALLIANCE = '/credit/checkNewBusinessAlliance.htm'

// 查询图表报表数据
const GENERATE_CHART_REOPRT = '/credit/generateChartReoprt.htm'

// 校验授权是否激活与所在区域是否展开业务
const CHECK_AREA_AUTH = '/credit/checkAreaAndAuth.htm'

// 校验当前用户是否预授信以及授信是否失效
const CHECK_ISAUTHED = '/credit/isAuthed.htm'
// 订烟短信时间查询
const queryTime = '/order/queryTime.htm';
// 订烟短信时间新增
const updateTime = '/order/updateTime.htm';
// 进件第二步,查询代扣方支持的银行种类
const QUERY_BANK_LIST = '/credit/queryBankList.htm'

// 进件第二步,预绑卡并发送短信
const PREDICT_BIND_BANK_CARD = '/credit/predictBindBankCard.htm'

// 进件第二步,绑卡
const BIND_BANK_CARD = '/credit/bindBankCard.htm'

// 查询进度跳转URL
// const CHECK_APPLY_PROGRESS_URL = 'https://dpnscf.orangebank.com.cn/nscf/H5/index.html#/A04_query1'
const CHECK_APPLY_PROGRESS_URL = 'https://f-fat2.orangebank.com.cn/nscf/H5/index.html#/A04_query1'

//微信获取签名串
const WX_SIGN = '/wechatmp/jssdk.htm'

//查询刷新缓存接口
const DELAY ='/app/delay.htm';
//埋点url
const ROOTMAI = 'https://countly.antiantech.com';
//埋点APPkey
const APPKEY = 'fac364a78f023a9e1d95e7a3d9be08a53144831b';
//埋点key
const toRegisterClick = 'toRegisterClick';
const LoginClick = 'LoginClick';
const queryAreaClick = 'queryAreaClick';
const queryAreaOpenClick = 'queryAreaOpenClick';
const confirmClick = 'confirmClick';
const signButton = 'signButton';
const drawingClick = 'drawingClick';
const confirmButton = 'confirmButton';
const AccessClick = 'AccessClick';
const QuickFirstNext = 'QuickFirstNext';
const QuickWrong = 'QuickWrong';
const QuickDevelop = 'QuickDevelop';
const QuickQualified  = 'QuickQualified ';
const QuickWriteTwo = 'QuickWriteTwo';
const QuickNoNetwork = 'QuickNoNetwork';
const QuickWriteThree = 'QuickWriteThree';
const QuickZuoji = 'QuickZuoji';
const QuickPushHouse = 'QuickPushHouse';
const QuickStream = 'QuickStream';
const QuickPushCar = 'QuickPushCar'
const QuickBankClick = 'QuickBankClick'
const WriteTwo = 'WriteTwo'
const PushHouse = 'PushHouse';
const PushCar = 'PushCar';
const PushStream = 'PushStream';
const WrongClick = 'WrongClick';
const Develop = 'Develop';
const Qualified  = 'Qualified ';
const NoNetwork = 'NoNetwork';
const BankClick = 'BankClick';
const RepayClick = 'RepayClick';
const confirmButton_two = 'confirmButton_two';
const SaveClick = 'SaveClick';
const inform = 'inform';
const Service = 'Service';
const SedPwdClick = 'SedPwdClick';
const SetPwdClick_two = 'SetPwdClick_two';
const ClosePwdClick = 'ClosePwdClick';
const ChangePwdClick = 'ChangePwdClick';
const ForgetClick = 'ForgetClick';
const inquiryClick = 'ClosePwdClick';
const FailClick = 'FailClick';
const OvertimeClick = 'OvertimeClick';
const expireClick = 'expireClick';
const QuickhandleClick = 'QuickhandleClick';
const agreementClick = 'agreementClick';
const handleClick = 'handleClick';
const dataClick = 'dataClick';
const HelpClick = 'HelpClick';
const FeedClick = 'FeedClick';
const telephoneClick= 'telephoneClick';
const MessageClick = 'MessageClick';
const RepayClick_two = 'RepayClick_two';
const ZuoJiHao = 'ZuoJiHao';
const bindSms = "bindSms";
const bindNextBtn = "bindNextBtn";

const TIP_AFTER_CREDIT_ACTIVE = '您在安田惠通上申请的银行授信无需向第三方机构、个人以及安田服务人员支付任何中介服务费，如有收取请及时与我司联系！'

export default {
  RepayClick_two,
  MessageClick,
  updateTime,
  queryTime,
  telephoneClick,
  FeedClick,
  IS_UPDATE_ACTIVATION,
  HelpClick,
  handleClick,
  dataClick,
  agreementClick,
  expireClick,
  IS_QUERY_ACTIVATE,
  OvertimeClick,
  ForgetClick,
  FailClick,
  inquiryClick,
  ChangePwdClick,
  ClosePwdClick,
  SetPwdClick_two,
  SedPwdClick,
  inform,
  Service,
  SaveClick,
  confirmButton_two,
  RepayClick,
  BankClick,
  bindSms,
  bindNextBtn,
  NoNetwork,
  Develop,
  Qualified,
  WrongClick,
  PushStream,
  PushCar,
  PushHouse,
  ZuoJiHao,
  WriteTwo,
  QuickBankClick,
  QuickPushCar,
  QuickStream,
  QuickWriteThree,
  QuickPushHouse,
  QuickZuoji,
  QuickNoNetwork,
  QuickWriteTwo,
  QuickQualified,
  QuickDevelop,
  QuickWrong,
  QuickFirstNext,
  AccessClick,
  confirmButton,
  drawingClick,
  signButton,
  confirmClick,
  queryAreaOpenClick,
  queryAreaClick,
  LoginClick,
  toRegisterClick,
  APPKEY,
  ROOTMAI,
  QUERYNEWBUSINESSACCOUNT,
  APPLYLOANDATA,
  UPLOAD_IMG,
  GET_VERIFICATION,
  CHECK_VERIFICATION,
  FEED_BACK,
  GET_USER_INFO,
  UPDATE_CONTACT,
  IS_ACCESS,
  GET_MESSAGE_LIST,
  IS_AREA_OPEN,
  BUSINESS_SEND_SMS,
  BUSINESS_ACCESS,
  GET_HELP_LIST,
  UPDATE_PASSWORD,
  OPERATE,
  QUERYCREDITSTATUS,
  DELAY,
  MODIFY_MESSAGE_STATUS,
  GET_INFORMATION,
  ADD_UPDATE_INFORMATION,
  ADD_INFORMATION_VIEW_COUNT,
  ADD_INFORMATION_SHARE_COUNT,
  IS_LIKE,
  ADD_UPDATE_LIKE,
  SAVE_ADDRESS_BOOK,
  SAVE_CALL_RECORDS,
  CHECK_NEWBUSINESS_ALLIANCE,
  GENERATE_CHART_REOPRT,
  CHECK_AREA_AUTH,
  CHECK_APPLY_PROGRESS_URL,
  QUERY_BANK_LIST,
  PREDICT_BIND_BANK_CARD,
  BIND_BANK_CARD,
  CHECK_ISAUTHED,
  WX_SIGN,
  TIP_AFTER_CREDIT_ACTIVE
}
