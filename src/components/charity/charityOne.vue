<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">{{paymentTitle}}</ToolBar>
        <div class="propertyType" style="margin-top: 1.17333rem;">
            <img class="typeImg" src="../../../static/images/charity.png" />
            <div class="typeText">慈善缴费</div>
        </div>

        <div class="propertySelect" @click="toSelect">
            <div class="selectUnit">慈善项目</div>
            <input class="selectPlaceHolder" v-model="charity.charityName" placeholder="请选择" />
            <img class="selectImg" src="../../../static/images/right.png"/>
        </div>

        <div class="paymentTab">
            <div :class="typeShow ? 'tabLeft' : 'tabLeftN'" @click="doSwitch(1)">{{tabLeft}}</div>
            <div :class="typeShow ? 'tabRightN' : 'tabRight'" @click="doSwitch(2)">{{tabRight}}</div>
        </div>

        <div class="paymentDetailTotal" v-if="typeShow">
            <div class="propertySelect">
                <span class="selectPayment">捐款金额</span>
                <input class="selectMoney" placeholder="请输入捐款金额" v-model="money" />
                <span class="moneyUnit">元</span>
            </div>
        </div>

        <div class="paymentBtn" v-if="typeShow">
            <button class="nextBtn" @click="toPayment">立即捐款</button>
        </div>

        <div v-else>
            <!-- <ul class="propertyHistory">
                <li v-for="item in historyList" class="historyList" @click="toRecord(item)">
                    <div class="historyLeft">
                        <div class="historyLeftTop">{{item.addressName}}</div>
                        <div class="historyLeftBottom">{{item.date}}</div>
                    </div>
                    <div class="historyRight">￥{{item.money}}</div>
                </li>
            </ul> -->
        </div>

    </div>
</template>

<script>

import ToolBar from '../ToolBar.vue'

export default {
    components: {ToolBar},
    data(){
        return{
            paymentTitle: '慈善缴费',
            toolBarColor: '#f7f7f7',
            typeShow: true,
            tabLeft: '待捐款',
            tabRight: '项目详情',
            charity: {
                charityName: ''
            }
        }
    },
    created() {
        let charityText = sessionStorage.getItem('charity')
        if(charityText != null && charityText != undefined){
            this.charity = JSON.parse(charityText)
        }
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

            sessionStorage.setItem('successMoney', that.money)

            that.$indicator.open()
            setTimeout(() => {
                that.$indicator.close()
                that.$router.push({path: that.$RM.PaymentSuccess, query: {type: 'property'}})
            }, 2000);
        },
        // 选择项目
        toSelect: function(){
            let that = this
            that.$router.push({path: that.$RM.PropertyFour, query: {type: 4}})
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

.propertyType{
    background: white;
    height: 1.335rem;
    display: flex;
}

.typeImg{
    height: .8rem;
    padding: .3rem;
}

.typeText{
    padding: .45rem 0;
    font-size: .4rem;
}

.propertySelect{
    background: white;
    height: 1.335rem;
    margin-top: .4rem;
    display: flex;
    padding-left: .3rem;
    font-size: .4rem;
}

.selectUnit{
    padding: .35rem 0;
}

.selectPlaceHolder{
    padding: .05rem 0;
    padding-left: .5rem;
    width: 69%;
    text-align: right;
    border: none;
    height: 1.1rem;
}

.selectImg{
    height: .45rem;
    padding: .35rem .3rem;
}

.selectPayment{
    padding: .35rem 0;
}

.selectMoney{
    border: none;
    text-align: right;
    flex: 1;
    padding: 0 .2rem .1rem 0;
    font-size: .4rem;
}

.moneyUnit{
    padding: .35rem .3rem .35rem 0;
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
    margin: .4rem 1.6rem;
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
    text-align: center;
    margin-top: .7rem;
}

.nextBtn{
    width: 94%;
    height: 1.07rem;
    background: #3da8f6;
    border: none;
    border-radius: .1rem;
    color: white;
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
