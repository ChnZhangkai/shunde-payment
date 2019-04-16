//我的主界面
const Owner = '/Owner/Owner';
//我的信息为空 界面
const HintMessage = '/Owner/HintMessage';
//我的授权激活
const AuthorizationActivat = '/Owner/AuthorizationActivat';
//专属服务
const DedicatedServe = '/Owner/DedicatedServe';
//专属服务 订烟提醒短信界面
const RemindNote = '/Owner/RemindNote';
//帮助中心
const HelpCenter = '/Owner/HelpCenter';
//我的信息
const PersonInfo = '/Owner/PersonInfo';
//授权区域查询
const QueryBusinessArea = '/Owner/QueryBusinessArea';
//反馈成功
const FeedSuccess = '/Owner/FeedSuccess';
//意见反馈
const FeedBack = '/Owner/FeedBack';
//新商盟授权页面
const BusinessAccess = '/Owner/BusinessAccess';
//授权信息界面
const AccessInfo = '/Owner/AccessInfo';
//消息中心
const MessageCenter = '/Owner/MessageCenter';
//消息详情
const MessageDetail = '/Owner/MessageDetail';
//授权成功
const AccessSuccess = '/Owner/AccessSuccess';
//授权的协议
const BusinessService = '/Owner/BusinessService';
//资讯
const InformationCenter = '/Owner/InformationCenter';
//资讯详情
const InformationDetail = '/Owner/InformationDetail';
const Main = '/main';
const Register = '/login/register';//用户注册
const SetPwd = '/login/setpwd';//设置密码
// const Login = '/';//用户登陆
const Login = '/login';
const ForgetPwd = '/login/forgetpwd';//用户忘记密码
const WriteOne = '/apply/writeone';//进件申请第一步
const WriteOther = '/apply/writeother';//进件申请第二步
const WriteTwo = '/apply/writetwo';//进件申请第三步
const ChooceBank = '/apply/choocebank';//进件申请选择银行
const Protocol = '/apply/protocol';
const Operation = '/apply/operation';
const Repay = '/repay';
const RepaySkip = '/repay/repayskip';
const RepayLoading = '/repay/repayloading';

//安全设置
const SecuritySetting = '/security/securitySetting';
//修改原密码
const ChangePwd = '/security/changePwd';
//身份验证
const SecurityCheck = '/security/securityCheck';
//解锁手势
const FingerLockView = '/security/fingerLockView';
//重新绘制手势
const ChangerFingerView = '/security/changerFingerView';

//断网的路由
const Netbroken = '/netbroken';//断网页面

//借款首页
const Index = '/index';
//进件成功页面
const successFul = '/success';

//快捷进件页面1
const quickwriteone = '/apply/quickwriteone';
//快捷进件页面2
const quickwritetwo = '/apply/quickwritetwo';
//快捷进件页面3
const quickwritethree = '/apply/quickwritethree';

const check = '/check';

//安田注册协议文本
const ReGisterProtocol = '/apply/registerProtocol';
//安田个人信息须知协议文本
const PersonProtocol = '/apply/personProtocol';

//安田个人信息须知协议文本
const PersonPayProtocol = '/apply/personPayProtocol';

// 经营诊断报表
const chartAnalyse = '/Owner/chartAnalyse'

// 进件申请结果展示页面
const applyResult = '/apply/applyResult'


// 查询申请进度页面
const checkApplyProgress = '/apply/checkApplyProgress'


//---------------------------顺德缴费app--------------------
const PropertyOne = '/'
const PropertyTwo = '/property/propertyTwo'
const PropertyThree = '/property/propertyThree'


const PaymentProtocol = '/property/paymentProtocol'
const PaymentSuccess = '/property/paymentSuccess'
const PaymentDetail = '/property/paymentDetail'







export default{
  Owner,
  PersonProtocol,
  HintMessage,
  ReGisterProtocol,
  AuthorizationActivat,
  quickwriteone,
  quickwritetwo,
  quickwritethree,
  successFul,
    Index,
  Netbroken,
  DedicatedServe,
  HelpCenter,
  PersonInfo,
  FeedSuccess,
  FeedBack,
  BusinessAccess,
  AccessInfo,
  MessageCenter,
  MessageDetail,
  AccessSuccess,
  RemindNote,
  QueryBusinessArea,
  Main,
  Register,
  SetPwd,
  Login,
  ForgetPwd,
  WriteOne,
  WriteOther,
  WriteTwo,
  ChooceBank,
  Protocol,
  Operation,
  Repay,
  RepaySkip,
  RepayLoading,
  SecuritySetting,
  ChangePwd,
  SecurityCheck,
  FingerLockView,
  ChangerFingerView,
  BusinessService,
  InformationCenter,
  InformationDetail,
  chartAnalyse,
  applyResult,
  checkApplyProgress,
  PersonPayProtocol,



  PropertyOne,
  PropertyTwo,
  PropertyThree,
  PaymentProtocol,
  PaymentSuccess,
  PaymentDetail
}
