<template>
    <div class="page">
        <header class="title">
            <div>
                <img class="titleImg" src="../../../static/images/back.png" @click="back"/>
            </div>
            <div class="titleName">巡检报告详情</div>
        </header>

        <div class="reportOne">
            <div class="reportOneTitleBox">
                <div class="line"></div>
                <span class="reportOneTitle">商户信息</span>
            </div>
            <div class="reportOneText">
                <label class="reportOneLabel">商户名称: </label>
                <span class="reprotOneDes">{{merchantName}}</span>
            </div>
            <div class="reportOneText">
                <label class="reportOneLabel">商户地址: </label>
                <span class="reprotOneDes">{{merchantAdd}}</span>
            </div>
            <div class="reportOneText">
                <label class="reportOneLabel">巡检类型: </label>
                <span class="reprotOneDes">{{pollingType}}</span>
            </div>
            <div class="reportOneText">
                <label class="reportOneLabel">巡检时间: </label>
                <span class="reprotOneDes">{{pollingTime}}</span>
            </div>
        </div>

        <div class="reportTwo">
            <div class="reportOneTitleBox">
                <div class="line"></div>
                <span class="reportOneTitle">巡检方式</span>
            </div>
            <div class="pollingTypeBox">
                <span class="pollingType">{{pollingSelectType}}</span>  
            </div>
        </div>

        <div class="reportThree">
            <div class="reportOneTitleBox">
                <div class="line"></div>
                <span class="reportOneTitle">巡检内容</span>
            </div>
            <div class="reportThreeText">
                <label class="reportThreeLabel">电子订单信息是否与商户信息一致</label>
                <img class="hisImg" src="../../../static/images/pass.png" />
            </div>
            <div class="reportThreeText">
                <label class="reportThreeLabel">商务收单业务是否正常</label>
                <img class="hisImg" src="../../../static/images/pass.png" />
            </div>
            <div class="reportThreeText">
                <label class="reportThreeLabel">店铺经营状况是否正常</label>
                <img class="hisImg" src="../../../static/images/pass.png" />
            </div>
            <div class="reportThreeText none">
                <label class="reportThreeLabel">账户是否正常</label>
                <img  class="hisImg" src="../../../static/images/warning.png" />
            </div>
            <div v-show="!switchFourValue">
                <div class="reason">{{reasonText}}</div>
            </div>
        </div>

        <div class="reportFour">
            <div class="reportOneTitleBox">
                <div class="line"></div>
                <span class="reportOneTitle">图形资料</span>
            </div>
            <div class="imageData">
                <div class="imagesBox">
                    <img class="reportFourImg" src="../../../static/images/loan.png" />
                    <img class="reportFourImg" src="../../../static/images/party.png" />
                    <img class="reportFourImg" src="../../../static/images/village.png" />
                    <img class="reportFourImg" src="../../../static/images/charity.png" />
                </div>
            </div>
        </div>

        <div class="reportFive">
            <div class="reportOneTitleBox">
                <div class="line"></div>
                <span class="reportOneTitle">情况说明</span>
            </div>
            <div class="explain">{{explainText}}</div>
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
            merchantAdd: '佛山市顺德区大良镇拥翠十巷171号',
            pollingType: '季检',
            pollingTime: '2019-03-31',
            pollingSelectType: '现场巡检',
            reasonText: '账户不能进行月底清算,具体原因已提交检查,建议商户换一个账户',
            explainText:'店铺经营有问题,扫码设备存在问题,已经申报维修,并及时处理,已上交做好登记,客户想要更换新设备...'
        }
    },
    created(){

    },
    methods:{
        // 返回
        back: function(){
            this.$router.go(-1)
        }
    }
    
}
</script>

<style scoped>

.page{
    width: 100%;
    background: #f5f4fa;
    position: absolute;
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
    margin: .2rem 2rem .2rem 3rem;
    font-size: .4rem;
}

.titleAssistantName{
    margin-top: .25rem;
}

.reportOne{
    background: white;
    margin: 1.5rem .3rem .3rem .3rem;
    padding: .3rem;
    border-radius: .1rem;
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
    display: flex;
    padding-bottom: .2rem;
    border-bottom: .01rem solid #EEEEEE;
}

.reportOneText{
    padding: .15rem 0;
}

.reportOneLabel{
    color: #999999;
}

.reprotOneDes{
    color: #5A5A5A;
}

.reportTwo{
    background: white;
    margin: .3rem;
    padding: .3rem;
    border-radius: .1rem;
}


.reportThree{
    background: white;
    margin: .3rem;
    padding: .3rem;
    border-radius: .1rem;
}

.reportThreeText{
    padding: .25rem 0;
    display: flex;
    border-bottom: .01rem solid #EEEEEE;
}

.reportThreeLabel{
    flex: 1;
}

.reason{
    background: #F6F6F6;
    border: none;
    padding: .2rem;
    width: 96%;
    height: 2rem;
    border-radius: .1rem;
    color: #666666;
}

.reportFour{
    background: white;
    margin: .3rem;
    padding: .3rem;
    border-radius: .1rem;
}

.reportFourImg{
    height: 2.5rem;
    border-radius: .5rem;
    padding: .15rem;
    position: relative;
}

.delImg{
    position: absolute;
    height: .5rem;
    left: 85%;
    top: 1%;
}

.reportFive{
    background: white;
    margin: .3rem;
    padding: .3rem;
    border-radius: .1rem;
}

.explain{
    background: #F6F6F6;
    border: none;
    padding: .2rem;
    width: 96%;
    height: 3rem;
    border-radius: .1rem;
    margin-top: .3rem;
    color: #666666;
}

.pollingTypeBox{
    display: flex;
}

.pollingType{
    padding-top: .25rem;
    flex: 1;
}

.right{
    padding-top: .15rem;
    width: .3rem;
    height: .5rem;
}

.space{
    height: 1.8rem;
}

.imageData{
    display: flex;
    margin-top: .2rem;
}

.imagesBox{
    position: relative;
}

.imagesAddBox{
    height: 2.5rem;
    width: 2.5rem;
    margin: .2rem;
    border: .01rem solid #DCDCDC;
    border-radius: .5rem;
}

.addImages{
    height: .8rem;
    margin: .8rem;
}

.reportSix{
    text-align: center;
    position: fixed;
    width: 100%;
    background: white;
    bottom: 0;
    padding: .3rem 0;
}

.reportBtn{
    width: 94%;
    height: 1.07rem;
    background: #3DB0FC;
    border: none;
    border-radius: .1rem;
    color: white;
}

.hisImg{
    height: .5rem;
}

.none{
    border: none;
}

</style>
