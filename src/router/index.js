import Vue from 'vue'
import RM from '../api/RouterManager'
import Router from 'vue-router'
import Main from '@/components/Main'
import HelpCenter from '@/components/owner/HelpCenter'
import DedicatedServe from '@/components/owner/DedicatedServe'
import AuthorizationActivat from '@/components/owner/AuthorizationActivat'
import RemindNote from '@/components/owner/RemindNote'
import QueryBusinessArea from '@/components/owner/QueryBusinessArea'
import PersonInfo from '@/components/owner/PersonInfo'
import FeedBack from '@/components/owner/FeedBack'
import FeedSuccess from '@/components/owner/FeedSuccess'
import BusinessAccess from '@/components/owner/BusinessAccess'
import HintMessage from '@/components/owner/HintMessage'
import Owner from '@/components/owner/Owner'
import BusinessService from '@/components/owner/BusinessService'
import AccessInfo from '@/components/owner/AccessInfo'
import MessageCenter from '@/components/owner/MessageCenter'
import MessageDetail from '@/components/owner/MessageDetail'
import AccessSuccess from '@/components/owner/AccessSuccess'
import InformationCenter from '@/components/owner/InformationCenter'
import InformationDetail from '@/components/owner/InformationDetail'
import Index from '@/components/Index'
import Register from '@/components/login/Register'
import Login from '@/components/login/Login'
import ForgetPwd from '@/components/login/ForgetPwd'
import WriteOne from '@/components/apply/WriteOne'
import WriteTwo from '@/components/apply/WriteTwo'
import WriteOther from '@/components/apply/WriteOther'
import ChooceBank from '@/components/apply/ChooceBank'
import Protocol from '@/components/apply/Protocol'

import Operation from '@/components/apply/Operation'
import Repay from '@/components/repay/Repay'
import RepaySkip from '@/components/repay/RepaySkip'
import RepayLoading from '@/components/repay/RepayLoading'
import securitySetting from '@/components/security/securitySetting'
import changePwd from '@/components/security/changePwd'

import securityCheck from '@/components/security/securityCheck'
import fingerLockView from '@/components/security/fingerLockView'
import changerFingerView from '@/components/security/changerFingerView'
import SetPwd from '@/components/login/SetPwd'
import Netbroken from '@/components/error/NetBroken'
import successFul from '@/components/apply/ApplySuccess'

import quickwriteone from '@/components/apply/QuickWriteOne'
import quickwritetwo from '@/components/apply/QuickWriteTwo'
import quickwritethree from '@/components/apply/QuickWriteThree'

import ReGisterProtocol from '@/components/apply/RegisterProtocol'
import PersonProtocol from '@/components/apply/PersonProtocol'
import PersonPayProtocol from '@/components/apply/PersonPayProtocol'

import ChartAnalyse from '@/components/owner/ChartAnalyse'
import ApplyResult from '@/components/apply/ApplyResult'
import CheckApplyProgress from '@/components/apply/CheckApplyProgress'




//-------------------------顺德缴费app-----------------------
import PropertyOne from '@/components/property/propertyOne'
import PropertyTwo from '@/components/property/propertyTwo'
import PropertyThree from '@/components/property/propertyThree'


import PaymentProtocol from '@/components/property/paymentProtocol'
import PaymentSuccess from '@/components/property/paymentSuccess'
import PaymentDetail from '@/components/property/paymentDetail'




Vue.use(Router);

export default new Router({
  //不加这个mode：history，二级路由的页面根本访问不了！！！
  mode: 'history',
  routes: [
    /* {
      path: '*',
      component: PinganBack
    }, */
    {
      path: RM.Main,
      name: RM.Main,
      component: Main
    }
    ,
    {
      path: RM.Register,
      component: Register
    }
    , {
      path: RM.SetPwd,
      component: SetPwd
    },
    {
      path: RM.Login,
      component: Login
    }
    ,
    {
      path: RM.ForgetPwd,
      name: RM.ForgetPwd,
      component: ForgetPwd
    },
    {
      path: RM.HelpCenter,
      component: HelpCenter
    }, {
      path: RM.DedicatedServe,
      component: DedicatedServe
    },
    {
      path: RM.AuthorizationActivat,
      name: RM.AuthorizationActivat,
      component: AuthorizationActivat
    },
    {
      path: RM.RemindNote,
      component: RemindNote
    },
    {
      path: RM.QueryBusinessArea,
      component: QueryBusinessArea
    }, {
      path: RM.PersonInfo,
      component: PersonInfo
    },
    {
      path: RM.FeedBack,
      component: FeedBack
    },
    {
      path: RM.FeedSuccess,
      component: FeedSuccess
    },
    {
      path: RM.BusinessAccess,
      name: RM.BusinessAccess,
      component: BusinessAccess
    },
    {
      path: RM.HintMessage,
      component: HintMessage
    },

    {
      path: RM.BusinessService,
      component: BusinessService
    },
    {
      path: RM.Owner,
      component: Owner
    },

    {
      path: RM.AccessInfo,
      name: RM.AccessInfo,
      component: AccessInfo
    },
    {
      path: RM.MessageCenter,
      component: MessageCenter
    },
    {
      path: RM.MessageDetail,
      component: MessageDetail
    },
    {
      path: RM.AccessSuccess,
      component: AccessSuccess
    }
    , {
      path: RM.WriteOne,
      component: WriteOne
    }
    , {
      path: RM.WriteTwo,
      component: WriteTwo
    }
    , {
      path: RM.WriteOther,
      name: RM.WriteOther,
      component: WriteOther
    }
    , {
      path: RM.ChooceBank,
      component: ChooceBank
    }
    , {
      path: RM.Protocol,
      component: Protocol
    }
    , {
      path: RM.Operation,
      component: Operation
    }
    , {
      path: RM.Repay,
      component: Repay
    }
    , {
      path: RM.RepaySkip,
      component: RepaySkip
    }
    , {
      path: RM.RepayLoading,
      component: RepayLoading
    },
    {
      path: RM.Netbroken,
      component: Netbroken
    }
    , {
      path: RM.SecuritySetting,
      component: securitySetting
    },
    {
      path: RM.ChangePwd,
      component: changePwd
    },
    {
      path: RM.SecurityCheck,
      component: securityCheck
    },
    {
      path: RM.FingerLockView,
      component: fingerLockView
    },
    {
      path: RM.ChangerFingerView,
      component: changerFingerView
    },
    {
      path: RM.Netbroken,
      component: Netbroken
    },
    {
      path: RM.Index,
      component: Index
    },
    {
      path: RM.successFul,
      component: successFul
    }
    ,
    {
      path: RM.quickwriteone,
      component: quickwriteone
    }
    ,
    {
      path: RM.quickwritetwo,
      component: quickwritetwo
    }
    ,
    {
      path: RM.quickwritethree,
      component: quickwritethree
    }
    ,
    {
      path: RM.ReGisterProtocol,
      component: ReGisterProtocol
    }
    ,
    {
      path: RM.PersonProtocol,
      component: PersonProtocol
    },
    {
      path: RM.chartAnalyse,
      component: ChartAnalyse
    }
    ,
    {
      path: RM.applyResult,
      component: ApplyResult
    }

    ,
    {
      path: RM.checkApplyProgress,
      component: CheckApplyProgress
    }
    ,
    {
      path: RM.InformationCenter,
      component: InformationCenter
    }
    ,
    {
      path: RM.InformationDetail,
      component: InformationDetail
    }
    ,
    {
      path: RM.PersonPayProtocol,
      component: PersonPayProtocol
    },



    {
      path: RM.PropertyOne,
      component: PropertyOne
    },
    {
      path: RM.PropertyTwo,
      component: PropertyTwo
    },
    {
      path: RM.PropertyThree,
      component: PropertyThree
    },
    {
      path: RM.PaymentProtocol,
      component: PaymentProtocol
    },
    {
      path: RM.PaymentSuccess,
      component: PaymentSuccess
    },
    {
      path: RM.PaymentDetail,
      component: PaymentDetail
    }

  ]
})
