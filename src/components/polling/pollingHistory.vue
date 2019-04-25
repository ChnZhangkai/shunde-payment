<template>
    <div class="page">
        <header class="title">
            <div>
                <img class="titleImg" src="../../../static/images/back.png" @click="back"/>
            </div>
            <div class="titleName">历史报告</div>
        </header>

        <div class="reportOne">
            <div class="reportOneTitleBox">{{merchantName}}</div>
            <div class="reportOneText">{{pollingText}}</div>
            <div class="reportOneBottom">
                <div class="reportOneLabel">{{time}}</div>
                <div class="details" @click="toDetail">查看详情</div>
            </div>
        </div>

        <div class="reportOne">
            <div class="reportOneTitleBox">{{merchantName}}</div>
            <div class="reportOneText">{{pollingText}}</div>
            <div class="reportOneBottom">
                <div class="reportOneLabel">{{time}}</div>
                <div class="details" @click="toDetail">查看详情</div>
            </div>
        </div>

        <div class="reportOne">
            <div class="reportOneTitleBox">{{merchantName}}</div>
            <div class="reportOneText">{{pollingText}}</div>
            <div class="reportOneBottom">
                <div class="reportOneLabel">{{time}}</div>
                <div class="details" @click="toDetail">查看详情</div>
            </div>
        </div>
        
    </div>
</template>

<script>

import Vue from 'vue'
import { Switch , Field , Actionsheet } from 'mint-ui'
Vue.component(Switch.name, Switch, Field.name, Field, Actionsheet.name, Actionsheet)

export default {
    data(){
        return{
            merchantName: '喜洋洋便利店',
            pollingText: '店铺经营存在问题,扫码设备有问题,已经申报维修并及时处理,已上交做好登记...',
            time: '2019-03-31'
        }
    },
    created(){

    },
    methods:{
        // 返回
        back: function(){
            this.$router.go(-1)
        },
        // 查看详情
        toDetail: function(){
            let that = this
            that.$router.push(that.$RM.PollingHistoryDetail);
        }
    }
    
}
</script>

<style scoped>

.page{
    height: 100%;
    width: 100%;
    background: #f5f4fa;
    position: absolute;
    margin-top: 1.2rem;
}

.title{
    color: white;
    background: #3DB0FC;
    display: flex;
    height: 1rem;
    position: fixed;
    top: 0;
    width: 100%;
    padding-top: .2rem;
    z-index: 1001;
}

.titleImg{
    width: .5rem;
    height: .5rem;
    padding: .2rem;
}

.titleName{
    margin: .2rem 0 .2rem 3.6rem;
    font-size: .4rem;
}

.reportOne{
    background: white;
    margin: .3rem .3rem .3rem .3rem;
    padding: .3rem;
    border-radius: .1rem;
    font-size: .4rem;
}

.line{
    border: .03rem solid #3DB0FC;
    width: .01rem;
    height: .2rem;
    margin-top: .1rem;
}

.reportOneTitle{
    padding-left: .2rem;
}

.reportOneTitleBox{
    padding-bottom: .2rem;
    font-weight: bolder;
}

.reportOneLabel{
    color: #999999;
    flex: 1;
}

.reportOneText{
    color: #999999;
}

.reportOneBottom{
    display: flex;
    margin-top: .5rem;
}

.details{
    color: #3DB0FC;
}

</style>
