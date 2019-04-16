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
            <div class="tabLeft">{{tabLeft}}</div>
            <div class="tabRight">{{tabRight}}</div>
        </div>

        <div class="paymentDetailTotal">
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

        <div class="paymentBtn">
            <button class="nextBtn" @click="toPayment">立即缴费</button>
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
            addressTitle: '顺德金华花园',
            addressDetail: '【2栋1单元902】',
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
                sd: '60',
                tc: '240'
            }
        }
    },
    methods: {
        // 调用微信支付,跳转结果页
        toPayment: function(){
            let that = this
            that.$router.push(that.$RM.PaymentSuccess)
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

.tabRight{
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
    color: #eeeeee;
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

</style>
