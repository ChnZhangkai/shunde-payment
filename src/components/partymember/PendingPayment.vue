<!--党费待缴费页面一-->
<template>
  <div class="page">
    <ToolBar class="fixed" :bgColor="toolBarColor">缴费用户登录</ToolBar>
    <div class="paymentDetail">
        <div class="detailTop">
            <img class="detailImg" src="../../../static/images/person.png" />
            <div class="detailTitle">{{text1}}</div>
        </div>
        <div class="detailBottom">
            <span>{{text2}}</span>
        </div>
    </div>
    
    <div class="paymentTab">
        <div :class="typeShow ? 'tabLeft' : 'tabLeftN'" @click="doSwitch(1)">{{tabLeft}}</div>
        <div :class="typeShow ? 'tabRightN' : 'tabRight'" @click="doSwitch(2)">{{tabRight}}</div>
    </div>

    <div class="propertySelect" v-if="typeShow">
        <span class="selectPayment">党费金额</span>
        <input class="selectMoney" placeholder="请输入缴费金额" v-model="money" />
    </div>
    
    <div class="propertyNext" v-if="typeShow">
        <button class="nextBtn" @click="toNext">立即缴费</button>
    </div>

    <div v-else>
        <ul class="propertyHistory">
            <li v-for="item in historyList" class="historyList" @click="toRecord(item)">
                <div class="historyLeft">
                    <div class="historyLeftTop">{{item.department}}</div>
                    <div class="historyLeftBottom">{{item.date}}</div>
                </div>
                <div class="historyRight">￥{{item.money}}</div>
            </li>
        </ul>
    </div>

  </div>
</template>

<script>
  import ToolBar from '../ToolBar.vue'
  import {Loadmore} from 'mint-ui';
  export default {
    components: {ToolBar},
    data() {
      return {
        typeShow: true,
        text1: '华南师范大学党委',
        text2: '【计算机系党支部】李楠 430525177701055678',
        tabLeft: '待缴费',
        tabRight: '缴费记录',
        money: '',
        historyList: [
          {
              'orderId': '201904170940302030',
              'department': '顺德金华物业物业有限公司',
              'addressName': '顺德花园一',
              'roomId': '2栋1单元902',
              'userName': '李楠',
              'mobile': '13988776654',
              'date': '2019-03-10 11:00:00',
              'money': '800.00',
              'propertyMoney': '300.00',
              'waterMoney': '200.00',
              'electricMoney': '300.00'
          },
          {
              'orderId': '201904150845302234',
              'department': '顺德金华物业物业有限公司',
              'addressName': '顺德花园二',
              'roomId': '3栋1单元302',
              'userName': '李楠',
              'mobile': '13988776654',
              'date': '2019-03-10 11:00:00',
              'money': '300.00',
              'propertyMoney': '164.50',
              'waterMoney': '35.50',
              'electricMoney': '100.00'
          },
          {
              'orderId': '201902111123302030',
              'department': '顺德金华物业物业有限公司',
              'addressName': '顺德花园三',
              'roomId': '6栋1单元605',
              'userName': '李楠',
              'mobile': '13988776654',
              'date': '2019-03-10 11:00:00',
              'money': '750.00',
              'propertyMoney': '150.00',
              'waterMoney': '100.00',
              'electricMoney': '500.00'
          },
          {
              'orderId': '201904170940302030',
              'department': '顺德金华物业物业有限公司',
              'addressName': '顺德花园四',
              'roomId': '2栋2单元303',
              'userName': '李楠',
              'mobile': '13988776654',
              'date': '2019-03-10 11:00:00',
              'money': '500.00',
              'propertyMoney': '50.00',
              'waterMoney': '150.00',
              'electricMoney': '300.00'
          },
          {
              'orderId': '201903170920362030',
              'department': '顺德金华物业物业有限公司',
              'addressName': '顺德花园五',
              'roomId': '1栋3单元102',
              'userName': '李楠',
              'mobile': '13988776654',
              'date': '2019-03-10 11:00:00',
              'money': '600.00',
              'propertyMoney': '100.00',
              'waterMoney': '200.00',
              'electricMoney': '300.00'
          },
        ]
      };
    },
    methods: {
      // 切换
      doSwitch: function(e) {
        let that = this
        if(e == 1 && !that.typeShow){
            that.typeShow = true
        }
        if(e == 2 && that.typeShow){
            that.typeShow = false
        }
      },
      // 确认缴费
      toNext: function(){
        let that = this
        if(that.$StringUtils.isEmpty(that.money)){
            that.$toast("请输入缴费金额");
            return;
        }

        sessionStorage.setItem('successMoney', that.money)

        that.$indicator.open()
        setTimeout(() => {
            that.$indicator.close()
            that.$router.push({path: that.$RM.PaymentSuccess, query: {type: 'party'}})
        }, 2000);
      },
      // 跳转记录详情
      toRecord: function(){
        let that = this
        that.$router.push(that.$RM.PartyDetails)
      }
    }

  }
</script>

<style scoped>

.page{
    height: 100%;
    background: #f5f4fa;
}

.fixed {
    position: fixed;
    width: 100%;
    margin-top: 0;
    top:0;
    z-index: 2;
}

.paymentDetail{
    margin-top: 1.17333rem;
    background: white;
    height: 2rem;
    font-size: .4rem;
}

.detailTop{
    display: flex;
    padding: .4rem 0 .1rem .3rem;
}

.detailImg{
    height: .4rem;
    padding-top: .05rem;
}

.detailTitle{
    margin-left: .27rem;
}

.detailBottom{
    padding-left: .8rem;
}

.paymentTab{
    display: flex;
    margin: .3rem 1.6rem;
    width: 6.5rem;
    background: white;
    height: .8rem;
    text-align: center;
    border-radius: .02rem;
}

.tabLeft{
    flex: 1;
    background: #3da8f6;
    color: white;
    padding-top: .15rem;
    border: .01rem solid #3da8f6;
    border-bottom-left-radius: .1rem;
    border-top-left-radius: .1rem;
}

.tabLeftN{
    flex: 1;
    color: #3da8f6;
    padding-top: .15rem;
    border: .02rem solid #3da8f6;
    border-right: none;
    border-bottom-left-radius: .1rem;
    border-top-left-radius: .1rem;
}

.tabRight{
    flex: 1;
    background: #3da8f6;
    color: white;
    padding-top: .15rem;
    border: .01rem solid #3da8f6;
    border-bottom-right-radius: .1rem;
    border-top-right-radius: .1rem;
}

.tabRightN{
    flex: 1;
    color: #3da8f6;
    padding-top: .15rem;
    border: .02rem solid #3da8f6;
    border-left: none;
    border-bottom-right-radius: .1rem;
    border-top-right-radius: .1rem;
}

.selectPayment{
    padding: .35rem 0;
}

.selectMoney{
    border: none;
    text-align: right;
    flex: 1;
    padding-bottom: .1rem;
    font-size: .4rem;
}

.propertySelect{
    background: white;
    height: 1.335rem;
    margin-top: .27rem;
    display: flex;
    padding: 0 .3rem;
    font-size: .4rem;
    border-bottom: .01rem solid #eeeeee;
}

.propertyNext{
    text-align: center;
    margin-top: 1rem;
}

.nextBtn{
    width: 94%;
    height: 1.07rem;
    background: #3da8f6;
    border: none;
    border-radius: .1rem;
    color: white;
}

.propertyHistory{
    background: white;
    padding: 0 .3rem;
    font-size: .4rem;
}

.historyList{
    display: flex;
    padding: .3rem 0;
    border-bottom: .01rem solid #eeeeee;
}

.historyLeft{
    flex: 1;
}

.historyLeftTop{

}

.historyLeftBottom{
    color: #a7a7a7;
    margin-top: .2rem;
}

.historyRight{

}

</style>
