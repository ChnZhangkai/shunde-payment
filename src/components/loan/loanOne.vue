<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">收款</ToolBar>
        <div class="propertyType" style="margin-top: 1.17333rem;">
            <img class="typeImg" src="../../../static/images/loan.png" />
            <div class="typeText">贷款缴费</div>
        </div>

        <div class="propertyMain">
            <div class="propertySelect">
                <span class="selectUnit">收款单位</span>
                <div class="selectPlaceHolder">{{address}}</div>
            </div>
            <div class="propertySelect">
                <span class="selectPayment">缴费金额</span>
                <input class="selectMoney" placeholder="请输入缴费金额" v-model="money" />
                <span class="moneyUnit">元</span>
            </div>
        </div>

        <div class="addRemark" @click="openRemark">添加备注</div>

        <div class="propertyNext">
            <button class="nextBtn" @click="toNext">立即缴费</button>
        </div>
        
        <div class="paymentPrompt" v-show="shadeShow">
            <div class="promptTitle">备注说明</div>
            <div class="promptInput">
                <input class="promptText" placeholder="请输入备注说明" v-model="remark" />
            </div>
            <div class="promptBtn">
                <div class="btnCancel" @click="cloeseRemark">取消</div>
                <div class="btnConfirm" @click="confirm">确定</div>
            </div>
        </div>

        <div class="shade" v-show="shadeShow" @click="cloeseRemark"></div>
    </div>
</template>

<script>

import ToolBar from '../ToolBar.vue'

export default {
    components: {ToolBar},
    data(){
        return{
            toolBarColor: '#f7f7f7',
            shadeShow: false,
            address: '钱多多金融管理有限公司',
            money: null,
            remark: ''
        }
    },
    methods: {
        // 打开备注弹窗
        openRemark: function(){
            let that = this
            that.shadeShow = true
        },
        // 关闭弹窗
        cloeseRemark: function(){
            let that = this
            that.shadeShow = false
        },
        // 确认
        confirm: function(){
            let that = this
            that.cloeseRemark()
        },
        // 下一步
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
                that.$router.push({path: that.$RM.PaymentSuccess, query: {type: 'loan'}})
            }, 2000);
        }
    },
    created() {

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

.propertyMain{
    background: white;
    padding-left: .3rem;
}

.propertySelect{
    height: 1.335rem;
    margin-top: .27rem;
    display: flex;
    font-size: .4rem;
    border-bottom: .01rem solid #eeeeee;
}

.selectUnit{
    padding: .35rem 0;
}

.selectPlaceHolder{
    padding: .35rem 0;
    padding-left: .5rem;
    width: 75%;
    text-align: right;
    border: none;
    height: 1.1rem;
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

.addRemark{
    font-size: .35rem;
    padding: .3rem;
    color: #3da8f6;
}

.selectImg{
    height: .45rem;
    padding: .35rem .3rem;
}

.propertyProtocol{
    display: flex;
    padding: .3rem;
}

.protocolImg{
    height: .4rem;
    padding-right: .3rem;
    padding-top: .025rem;
}

.protocolText{
    color: #999999;
}

.protocolName{
    color: #3da8f6;
}

.propertyNext{
    text-align: center;
}

.nextBtn{
    width: 94%;
    height: 1.07rem;
    background: #3da8f6;
    border: none;
    border-radius: .1rem;
    color: white;
}

.paymentPrompt{
    position: absolute;
    z-index: 2005;
    background: white;
    height: 4.2rem;
    width: 80%;
    top: 35%;
    left: 10%;
    border-radius: .2rem;
    text-align: center;
    font-size: .4rem;
}

.shade{
    position: fixed;
    z-index: 2004;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
}

.promptTitle{
    padding: .5rem;
}

.promptInput{
    height: 1rem;
    padding-bottom: .3rem;
    border-bottom: .01rem solid #eeeeee;
}

.promptText{
    border: none;
    background: #f5f4fa;
    height: .8rem;
    width: 80%;
    margin-bottom: .6rem;
}

.promptBtn{
    display: flex;
    height: 1.3rem;
    color: #3da8f6;
}

.btnCancel{
    flex: 1;
    border-right: .01rem solid #eeeeee;
    padding-top: .4rem;
}

.btnConfirm{
    flex: 1;
    padding-top: .4rem;
}

</style>
