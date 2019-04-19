<!--党员缴费详情页面一-->
<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">缴费详情</ToolBar>
        <div class="propertyRecord" style="margin-top: 1.17333rem;">
            <div class="recordTitle">
                <div class="titleMoney">￥{{record.money}}</div>
                <div class="titleText">交易成功</div>
            </div>

            <div class="recordDetails">
                <div class="recordDetail">
                    <span class="recordDetailLeft">订单号</span>
                    <div class="recordDetailRight">{{record.orderId}}</div>
                </div>
                <div class="recordDetail">
                    <span class="recordDetailLeft">党委机构</span>
                    <div class="recordDetailRight">{{record.department}}</div>
                </div>
                <div class="recordDetail">
                    <span class="recordDetailLeft">党支部</span>
                    <div class="recordDetailRight">{{record.addressName}}</div>
                </div>
                <div class="recordDetail">
                    <span class="recordDetailLeft">姓名</span>
                    <div class="recordDetailRight">{{record.userName}}</div>
                </div>
                <div class="recordDetail">
                    <span class="recordDetailLeft">身份证号</span>
                    <div class="recordDetailRight">{{record.idCard}}</div>
                </div>

                <div class="recordDetail detailDate">
                    <span class="recordDetailLeft">缴费时间</span>
                    <div class="recordDetailRight">{{record.date}}</div>
                </div>
            </div>
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
            record: null
        }
    },
    created() {
        var paymentRecord = sessionStorage.getItem('paymentRecord')
        if(paymentRecord != null && paymentRecord != undefined){
            this.record = JSON.parse(paymentRecord)
        }
    },
    methods: {

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

.propertyRecord{
    font-size: .4rem;
}

.recordTitle{
    background: #ffffff;
    height: 2.5rem;
    text-align: center;
}

.titleMoney{
    font-size: .6rem;
    font-weight: 600;
    padding-top: .5rem;
}

.titleText{
    color: #a7a7a7;
    font-size: .3rem;
    padding-top: .1rem;
}

.recordDetails{
    margin-top: .3rem;
    background: #ffffff;
    padding: .1rem 0 .1rem .3rem;
}

.recordDetail{
    display: flex;
    padding: .3rem .3rem .3rem 0;
}

.recordDetailLeft{
    flex: 1;
    color: #a7a7a7;
}

.recordDetailRight{

}

.detailDate{
   
}

</style>
