<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">支付结果</ToolBar>

        <div class="paymentSuccess">
            <img class="successImg" src="../../static/images/choose.png" />
            <div class="successText">支付成功</div>
            <div class="successMoney">￥{{paymentMoney}}</div>
        </div>
        
        <div class="successBtn">
            <button class="nextBtn" @click="toPayment">完成</button>
        </div>

    </div>
</template>

<script>

import ToolBar from './ToolBar.vue'

export default {
    components: {ToolBar},
    data(){
        return{
            toolBarColor: '#f7f7f7',
            paymentMoney: '',
            businessType: ''
        }
    },
    created(){
        let that = this
        that.paymentMoney = sessionStorage.getItem('successMoney')
        that.businessType = that.$route.query.type
    },
    methods: {
        // 支付完成,返回首页
        toPayment: function(){
            let that = this
            if(that.businessType == 'property'){
                that.$router.push(that.$RM.PropertyOne)
            }
            if(that.businessType == 'loan'){
                that.$router.push(that.$RM.LoanOne)
            }
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

.paymentSuccess{
    margin-top: 1.17333rem;
    background: white;
    height: 5rem;
    text-align: center;
    font-size: .4rem;
}

.successImg{
    padding: 1rem 0 .2rem;
}

.successText{
    padding-bottom: .3rem;
}

.successMoney{
    font-size: .6rem;
    font-weight: 600;
}

.successBtn{
    text-align: center;
}

.nextBtn{
    width: 94%;
    height: 1.07rem;
    background: #3da8f6;
    border: none;
    border-radius: .1rem;
    color: white;
    margin-top: .8rem;
    font-size: .4rem;
}

</style>
