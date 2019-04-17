import Vue from 'vue'
import RM from '../api/RouterManager'
import Router from 'vue-router'

//-------------------------顺德缴费app-----------------------
import PropertyOne from '@/components/property/propertyOne'
import PropertyTwo from '@/components/property/propertyTwo'
import PropertyThree from '@/components/property/propertyThree'
import PropertyFour from '@/components/property/propertyFour'
import PropertyFive from '@/components/property/propertyFive'
import PropertySix from '@/components/property/propertySix'

import LoanOne from '@/components/property/loanOne'



import PaymentProtocol from '@/components/property/paymentProtocol'
import PaymentSuccess from '@/components/property/paymentSuccess'




Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
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
      path: RM.PaymentProtocol,
      component: PaymentProtocol
    },
    {
      path: RM.PaymentSuccess,
      component: PaymentSuccess
    }

  ]
})
