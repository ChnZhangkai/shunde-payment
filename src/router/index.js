import Vue from 'vue'
import RM from '../api/RouterManager'
import Router from 'vue-router'

//-------------------------顺德缴费app-----------------------
import PaymentProtocol from '@/components/paymentProtocol'
import PaymentSuccess from '@/components/paymentSuccess'

import PropertyOne from '@/components/property/propertyOne'
import PropertyTwo from '@/components/property/propertyTwo'
import PropertyThree from '@/components/property/propertyThree'
import PropertyFour from '@/components/property/propertyFour'
import PropertyFive from '@/components/property/propertyFive'
import PropertySix from '@/components/property/propertySix'
import LoanOne from '@/components/loan/loanOne'
import CharityOne from '@/components/charity/charityOne'
import RepayMoney from '@/components/education/RepayMoney'
import RepayMoneyItem from '@/components/education/RepayMoneyItem'
import RepayMoneyItemSen from '@/components/education/RepayMoneyItemSen'
import BillDetails from '@/components/education/BillDetails'
import PartyMemberPay from '@/components/partymember/PartyMemberPay'
import PartyMemberLog from '@/components/partymember/PartyMemberLog'
import PendingPayment from '@/components/partymember/PendingPayment'
import PendingPaymentSen from '@/components/partymember/PendingPaymentSen'
import PartyDetails from '@/components/partymember/PartyDetails'
import VillagePay from '@/components/village/VillagePay'
import VillagePaySen from '@/components/village/VillagePaySen'
import VillagePayThr from '@/components/village/VillagePayThr'
import VillageDetails from '@/components/village/VillageDetails'

// 开发测试阶段使用
import Index from '@/components/index'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: RM.Index,
      component: Index
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
      path: RM.PropertyFour,
      component: PropertyFour
    },
    {
      path: RM.PropertyFive,
      component: PropertyFive
    },
    {
      path: RM.PropertySix,
      component: PropertySix
    },
    {
      path: RM.LoanOne,
      component: LoanOne
    },
    {
      path: RM.CharityOne,
      component: CharityOne
    },

    {
      path: RM.RepayMoney,
      component: RepayMoney
    },
    {
      path: RM.RepayMoneyItem,
      component: RepayMoneyItem
    },
    {
      path: RM.RepayMoneyItemSen,
      component: RepayMoneyItemSen
    },
    {
      path: RM.BillDetails,
      component: BillDetails
    },

    {
      path: RM.PartyMemberPay,
      component: PartyMemberPay
    },
    {
      path: RM.PartyMemberLog,
      component: PartyMemberLog
    },
    {
      path: RM.PendingPayment,
      component: PendingPayment
    },
    {
      path: RM.PendingPaymentSen,
      component: PendingPaymentSen
    },
    {
      path: RM.PartyDetails,
      component: PartyDetails
    },

    {
      path: RM.VillagePay,
      component: VillagePay
    },
    {
      path: RM.VillagePaySen,
      component: VillagePaySen
    },
    {
      path: RM.VillagePayThr,
      component: VillagePayThr
    },
    {
      path: RM.VillageDetails,
      component: VillageDetails
    }

  ]
})
