<!--村居缴费详情页面-->
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
                    <span class="recordDetailLeft">缴费类型</span>
                    <div class="recordDetailRight">{{record.addressName}}</div>
                </div>
                <div class="recordDetail">
                    <span class="recordDetailLeft">缴费单位</span>
                    <div class="recordDetailRight">{{record.classId}}</div>
                </div>
                <div class="recordDetail">
                    <span class="recordDetailLeft">承包商姓名</span>
                    <div class="recordDetailRight">{{record.userName}}</div>
                </div>
                <div class="recordDetail">
                    <span class="recordDetailLeft">联系电话</span>
                    <div class="recordDetailRight">{{record.srudentId}}</div>
                </div>

                <div class="recordDetail detailDate">
                    <span class="recordDetailLeft">缴费时间</span>
                    <div class="recordDetailRight">{{record.date}}</div>
                </div>
                <div class="recordDetail">
                    <span class="recordDetailLeft">2019年4月卫生费</span>
                    <div class="recordDetailRight">￥{{record.healthMoney}}</div>
                </div>
                <div class="recordDetail">
                    <span class="recordDetailLeft">2019年4月水费</span>
                    <div class="recordDetailRight">￥{{record.waterMoney}}</div>
                </div>
                <div class="recordDetail">
                    <span class="recordDetailLeft">2019年4月电费</span>
                    <div class="recordDetailRight">￥{{record.electricMoney}}</div>
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
    border-bottom: 0.03rem solid #eeeeee;
}

</style>
