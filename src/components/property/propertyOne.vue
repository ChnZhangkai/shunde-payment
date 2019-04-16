<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">缴费用户登录</ToolBar>
        <div class="propertyType">
            <img class="typeImg" src="../../../static/images/property-payment.png" />
            <div class="typeText">物业缴费</div>
        </div>

        <div class="propertySelect">
            <div class="selectUnit">缴费单位</div>
            <div class="selectPlaceHolder" @click="toSelect">{{address}}</div>
            <img class="selectImg" src="../../../static/images/right.png"  @click="toSelect"/>
        </div>

        <div class="propertyProtocol">
            <img class="protocolImg" :src="unChooceImg" @click="chooceProtocol"/>
            <div class="protocolText">我已阅读并同意<font class="protocolName" @click="toProtocol">《自助缴费协议》</font></div>
        </div>

        <div class="propertyNext">
            <button class="nextBtn" @click="toNext">下一步</button>
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
            unChooceImg: '../../../static/images/unchooce.png',
            chooceImg: '../../../static/images/chooce.png',
            isChooce: false,
            address: '请选择'
        }
    },
    methods: {
        // 选择小区单位
        toSelect: function(){
            let that = this
            that.$router.push(that.$RM.PropertyTwo)
        },
        // 选中协议
        chooceProtocol: function(){
            let that = this;
            if(that.unChooceImg === '../../../static/images/unchooce.png'){
                that.unChooceImg = that.chooceImg
                that.isChooce = true
            } else {
                that.unChooceImg = '../../../static/images/unchooce.png'
                that.isChooce = false
            }
        },
        // 打开协议
        toProtocol: function(){
            let that = this
            that.$router.push(that.$RM.PaymentProtocol)
        },
        // 下一步
        toNext: function(){
            let that = this
            if(!that.isChooce){
                that.$toast("请阅读并勾选《自助缴费协议》");
                return;
            }
            that.$router.push(that.$RM.PropertyThree)
        }
    },
    created() {
        let ads = this.$route.query.address == null ? this.address : this.$route.query.address
        if (ads.length > 12) {
            ads = ads.substring(0,13) + '...'
        }
        this.address = ads
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
    margin-top: 1.17333rem;
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
    margin-top: .27rem;
    display: flex;
    padding-left: .3rem;
    font-size: .4rem;
}

.selectUnit{
    padding: .35rem 0;
}

.selectPlaceHolder{
    padding: .35rem 0;
    color: #cccccc;
    padding-left: .5rem;
    width: 69%;
    text-align: right;
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

</style>
