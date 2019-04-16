<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">{{paymentTitle}}</ToolBar>
        <div class="paymentDetail">
            <div class="detailTop">
                <img class="detailImg" src="../../../static/images/person.png" />
                <div class="detailTitle">{{addressTitle}}</div>
            </div>
            <div class="detailBottom">
                <font>{{addressDetail}}</font>
                <font>{{username}}</font>
                <font>{{phone}}</font>
            </div>
        </div>

        <div class="paymentTab">
            <div :class="typeShow ? 'tabLeft' : 'tabLeftN'" @click="doSwitch(1)">{{tabLeft}}</div>
            <div :class="typeShow ? 'tabRightN' : 'tabRight'" @click="doSwitch(2)">{{tabRight}}</div>
        </div>

        <div class="paymentDetailTotal" v-if="typeShow">
            <div class="totalTop">
                <div class="paymentTotal">
                    <div class="totalDate">{{detail.detailDate}}</div>
                    <div class="totalMoney">合计: ￥{{detail.detailTotal}}</div>
                </div>
                <div class="totalArea">
                    {{detail.detailUnit}}, 面积: {{detail.detailArea}}
                </div>
            </div>
            <div class="totalBottom">
                <div class="detailClassify">
                    <span class="classifyType">{{detail.detailWY}}</span>
                    <div class="classifyMoney">￥{{detail.wy}}</div>
                </div>
                <div class="detailClassify">
                    <span class="classifyType">{{detail.detailSD}}</span>
                    <div class="classifyMoney">￥{{detail.sd}}</div>
                </div>
                <div class="detailClassify">
                    <span class="classifyType">{{detail.detailTC}}</span>
                    <div class="classifyMoney">￥{{detail.tc}}</div>
                </div>
            </div>
        </div>

        <div class="paymentBtn" v-if="typeShow">
            <button class="nextBtn" @click="toPayment">立即缴费</button>
        </div>

        <div v-else>
            <ul class="propertyHistory">
                <li v-for="item in historyList" class="historyList" @click="toRecord(item)">
                    <div class="historyLeft">
                        <div class="historyLeftTop">{{item.addressName}}</div>
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

export default {
    components: {ToolBar},
    data(){
        return{
            paymentTitle: '缴费项目',
            toolBarColor: '#f7f7f7',
            typeShow: true,
            addressTitle: '',
            addressDetail: '',
            username: '*楠',
            phone: '130****5678',
            tabLeft: '待缴费',
            tabRight: '缴费记录',
            detail: {
                detailDate: '2019年4月物业管理费',
                detailTotal: '500.00',
                detailUnit: '2元/平',
                detailArea: '100平',
                detailWY: '4月物业费',
                detailSD: '4月水电费',
                detailTC: '4月停车费',
                wy: '200.00',
                sd: '60.00',
                tc: '240.00'
            },
            historyList: [
                {
                    'addressName': '顺德花园一',
                    'date': '2019-03-10 11:00:00',
                    'money': '123.00'
                },
                {
                    'addressName': '顺德花园二',
                    'date': '2019-03-10 11:00:00',
                    'money': '2344.00'
                },
                {
                    'addressName': '顺德花园三',
                    'date': '2019-03-10 11:00:00',
                    'money': '3467.00'
                },
                {
                    'addressName': '顺德花园四',
                    'date': '2019-03-10 11:00:00',
                    'money': '294.00'
                },
                {
                    'addressName': '顺德花园五',
                    'date': '2019-03-10 11:00:00',
                    'money': '804.00'
                },
            ]
        }
    },
    created() {
        this.addressTitle = sessionStorage.getItem('addressName')
        this.addressDetail = '【' + sessionStorage.getItem(1) + sessionStorage.getItem(2)+ sessionStorage.getItem(3) +'】'
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
        // 调用微信支付,跳转结果页
        toPayment: function(){
            let that = this
            that.$indicator.open()
            setTimeout(() => {
                that.$indicator.close()
                that.$router.push(that.$RM.PaymentSuccess)
            }, 2000);
        },
        // 跳转缴费详情
        toRecord: function(item){
            let that = this
            that.$router.push(that.$RM.PropertySix)
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

.paymentDetailTotal{
    background: white;
    font-size: .4rem;
    padding: .3rem 0 .3rem .3rem;
}

.totalTop{
    padding-bottom: .3rem;
    border-bottom: 1px solid #eeeeee;
}

.paymentTotal{
    display: flex;
}

.totalDate{
    flex: 1;
}

.totalMoney{
    margin-right: .3rem;
}

.totalArea{
    color: #a7a7a7;
    margin-top: .1rem;
}

.totalBottom{
    padding-top: .3rem;
}

.detailClassify{
    display: flex;
    padding-bottom: .2rem;
}

.classifyType{
    flex: 1;
}

.classifyMoney{
    margin-right: .3rem;
}



.paymentBtn{
    background: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 1.3rem;
}

.nextBtn{
    width: 94%;
    height: 1.07rem;
    background: #3da8f6;
    border: none;
    border-radius: .1rem;
    color: white;
    margin-top: .1rem;
    font-size: .4rem;
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
