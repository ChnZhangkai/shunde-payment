<!--村居缴费页面二-->
<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">缴费项目</ToolBar>
        <div class="village_top">
            <div class="detail_top">
                <img class="detail_img" src="../../../static/images/person.png" />
                <div class="detail_title">{{addressTitle}}</div>
            </div>
            <div class="detail_con">
                <span>{{addressDetail}}</span>
                <span>{{username}}</span>
                <span>{{phone}}</span>
            </div>
        </div>

        <div class="payment_tab">
            <div :class="typeShow ? 'tabLeft' : 'tabLeftN'" @click="doSwitch(1)">{{tabLeft}}</div>
            <div :class="typeShow ? 'tabRightN' : 'tabRight'" @click="doSwitch(2)">{{tabRight}}</div>
        </div>
        
        <div class="con_details" v-if="typeShow">
            <ul class="con_top">
                <li v-for="items in detailList" class="con_lists">
                    <div class="payment_total">
                        <div class="total_date">{{items.detailDate}}</div>
                        <div class="total_money">{{items.detailArea}}</div>
                    </div>
                    <div class="total_area">￥{{items.detailTotal}}</div>
                </li>
            </ul>

            <div class="payment_btn">合计:￥{{money}}
                <button class="nextButton" @click="toNext">立即缴费</button>
            </div>
        </div>

        <div v-else>
            <ul class="con_history">
                <li v-for="item in historyList" class="con_list" @click="toPayment">
                    <div class="history_left">
                        <div class="history_top">{{item.addressName}}</div>
                        <div class="history_bottom">{{item.date}}</div>
                    </div>
                    <div class="history_right">￥{{item.money}}</div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

import ToolBar from '../ToolBar.vue'

export default {
    components: {ToolBar},
    data(){
        return{
            toolBarColor: '#f7f7f7',
            typeShow: true,
            addressTitle: '大良马路鱼塘002',
            addressDetail: '【顺德金华村委会】',
            username: '*楠',
            phone: '130****5678',
            tabLeft: '待缴费',
            tabRight: '缴费记录',
            money: '624',
            detailList: [
              {
                detailDate: '2019年4月卫生费',
                detailTotal: '50.00',
                detailArea: '1元/平,面积：50平',
              },
              {
                detailDate: '2019年4月水费',
                detailTotal: '64.00',
                detailArea: '8元/方,用量：8方'
              },
              {
                detailDate: '2019年4月电费',
                detailTotal: '60.00',
                detailArea: '0.6元/度,用量：100度'
              }
            ],
            historyList: [
              {
                'addressName': '大良马路鱼塘002',
                'money': '568.00',
                'date': '2019-03-10 12:00:00'
              },
              {
                'addressName': '大良马路鱼塘002',
                'money': '268.00',
                'date': '2019-03-10 12:00:00'
              },
              {
                'addressName': '大良马路鱼塘002',
                'money': '500.00',
                'date': '2018-03-10 12:00:00'
              },
              {
                'addressName': '大良马路鱼塘002',
                'money': '300.00',
                'date': '2018-03-10 12:00:00'
              },
              {
                'addressName': '大良马路鱼塘002',
                'money': '268.00',
                'date': '2018-03-10 12:00:00'
              }
            ]
        }
    },
    created() {

    },
    methods: {
        // 切换
        doSwitch(e) {
            if(e == 1 && !this.typeShow){
                this.typeShow = true
            }
            if(e == 2 && this.typeShow){
                this.typeShow = false
            }
        },
        // 跳转缴费详情
        toPayment() {
          this.$router.push(this.$RM.VillageDetails)
        },
        // 确认缴费
        toNext: function(){
            let that = this

            sessionStorage.setItem('successMoney', that.money)

            that.$indicator.open()
            setTimeout(() => {
                that.$indicator.close()
                that.$router.push({path: that.$RM.PaymentSuccess, query: {type: 'village'}})
            }, 2000);
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

.village_top{
    margin-top: 1.17333rem;
    background: #ffffff;
    height: 2rem;
    font-size: .4rem;
}

.detail_top{
    display: flex;
    padding: .4rem 0 .1rem .3rem;
}

.detail_img{
    height: .4rem;
    padding-top: .05rem;
}

.detail_title{
    margin-left: .27rem;
}

.detail_con{
    padding-left: .8rem;
}

.payment_tab{
    display: flex;
    margin: .3rem 1.6rem;
    width: 6.5rem;
    background: #ffffff;
    height: .8rem;
    text-align: center;
    border-radius: .02rem;
}

.tabLeft{
    flex: 1;
    background: #3da8f6;
    color: #ffffff;
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
    color: #ffffff;
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

.con_details{
    background: #ffffff;
    font-size: .4rem;
}

.con_top{
    background: #ffffff;
    font-size: .4rem;
}

.con_lists{
    display: flex;
    padding: .3rem;
    border-bottom: .4rem solid #eeeeee;
}

.payment_total{
    flex: 1;
}

.total_date{
   
}

.total_money{
    color: #a7a7a7;
    margin-top: .2rem;
}

.total_area{
   
}

.payment_btn{
    background: #ffffff;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 1.3rem;
}

.nextButton{
    width: 94%;
    height: 1.07rem;
    background: #3da8f6;
    border: none;
    border-radius: .1rem;
    color: #ffffff;
    margin-top: .1rem;
    font-size: .4rem;
}

.con_history{
    background: #ffffff;
    padding: 0 .3rem;
    font-size: .4rem;
}

.con_list{
    display: flex;
    padding: .3rem 0;
    border-bottom: .01rem solid #eeeeee;
}

.history_left{
    flex: 1;
}

.history_top{

}

.history_bottom{
    color: #a7a7a7;
    margin-top: .2rem;
}

.history_right{

}

.payment_btn {
    font-size: 0.48rem;
    color: #333333;
    text-align: left;
    background-color: #ffffff;
    padding-left: 0.4rem;
    margin-top: 3.1rem;
    padding-bottom: .7rem;
  }

  .nextButton {
    border: none;
    border-radius: 6px;
    height: 1.17333rem;
    width: 41%;
    text-align: center;
    font-size: 0.4rem;
    margin-top: 0.4rem;
    color: #ffffff;
    background-color: #3da8f6;
    margin-left: 2.0rem;
  }

</style>
