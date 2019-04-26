<template>
    <div class="page">
        <header class="title">
            <div>
                <img class="titleImg" src="../../../static/images/back.png" @click="back"/>
            </div>
            <div class="titleName">填写巡检报告</div>
            <div class="titleAssistantName" @click="toHistory">历史报告</div>
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
                <label class="reportOneLabel">巡检周期: </label>
                <span class="reprotOneDes">{{pollingCycle}}</span>
            </div>
            <div class="reportOneText">
                <label class="reportOneLabel">巡检状态: </label>
                <span class="reprotOneDes">待巡检</span>
            </div>
        </div>

        <div class="reportTwo">
            <div class="reportOneTitleBox">
                <div class="line"></div>
                <span class="reportOneTitle">巡检方式</span>
            </div>
            <div class="pollingTypeBox">
                <span class="pollingType">{{pollingSelectType}}</span>
                <img class="right" src="../../../static/images/right.png" @click="selectType"/>    
            </div>
        </div>

        <div class="reportThree">
            <div class="reportOneTitleBox">
                <div class="line"></div>
                <span class="reportOneTitle">巡检内容</span>
            </div>
            <div class="reportThreeText">
                <label class="reportThreeLabel">电子订单信息是否与商户信息一致</label>
                <mt-switch v-model="switchOneValue"></mt-switch>
            </div>
            <div class="reportThreeText">
                <label class="reportThreeLabel">商务收单业务是否正常</label>
                <mt-switch v-model="switchTwoValue"></mt-switch>
            </div>
            <div class="reportThreeText">
                <label class="reportThreeLabel">店铺经营状况是否正常</label>
                <mt-switch v-model="switchThreeValue"></mt-switch>
            </div>
            <div class="reportThreeText">
                <label class="reportThreeLabel">账户是否正常</label>
                <mt-switch v-model="switchFourValue" @change="swicthChange"></mt-switch>
            </div>
            <div v-show="!switchFourValue">
                <textarea class="reason" placeholder="请输入原因"></textarea>
                <!-- <mt-field class="reason" label="" placeholder="请输入原因" type="textarea" rows="4" v-model="reason"></mt-field> -->
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
                    <img class="delImg" src="../../../static/images/del.png" @click="delImg"/>
                </div>
                <div class="imagesAddBox" @click="selectPhoto">
                    <img class="addImages" src="../../../static/images/add.png" />
                </div>
            </div>
        </div>

        <div class="reportFive">
            <div class="reportOneTitleBox">
                <div class="line"></div>
                <span class="reportOneTitle">情况说明</span>
            </div>
            <textarea class="explain" placeholder="请输入情况说明"></textarea>
        </div>

        <div class="space"></div>
    
        <div class="reportSix">
            <button class="reportBtn" @click="toNext">提交</button>
        </div>

        <mt-actionsheet :actions="types" v-model="typesShow">
        </mt-actionsheet>

        <mt-actionsheet :actions="actions" v-model="actionsShow">
        </mt-actionsheet>
        
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
            pollingCycle: '2019-01-01至2019-03-31',
            switchOneValue: true,
            switchTwoValue: true,
            switchThreeValue: true,
            switchFourValue: false,
            pollingSelectType: '现场巡检',
            reason: '',
            typesShow: false,
            actionsShow: false,
            actions: [
                {
                    name: '拍照',
                    method: this.getCamera
                },
                {
                    name: '从相册中选择',
                    method: this.getPhoto
                }
            ],
            types: [
                {
                    name: '现场巡检',
                    method: this.scenePol
                },
                {
                    name: '电话巡检',
                    method: this.telPol
                }
            ]
        }
    },
    created(){

    },
    methods:{
        // 返回
        back: function(){
            this.$router.go(-1)
        },
        // 历史报告
        toHistory: function(){
            let that = this
            that.$router.push(that.$RM.PollingHistory)
        },
        // 切换
        swicthChange: function(){
            let that = this
            console.log(that.switchFourValue);
        },
        // 选择图片
        selectPhoto: function(){
            let that = this
            that.actionsShow = true
        },
        // 打开相机
        getCamera: function(){

        },
        // 打开相册
        getPhoto: function(){

        },
        // 删除图片
        delImg: function(){

        },
        // 选择巡检方式
        selectType: function(){
            let that = this
            that.typesShow = true
        },
        // 现场巡检
        scenePol:function(){
            let that = this
            that.pollingSelectType = '现场巡检'
        },
        // 电话巡检
        telPol: function(){
            let that = this
            that.pollingSelectType = '电话巡检'
        },
        // 提交
        toNext: function(){
            let that = this
            that.$indicator.open()
            setTimeout(() => {
                that.$indicator.close()
                that.$router.push(that.$RM.PollingMain)
            }, 2000);
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
    padding: .15rem 0;
    display: flex;
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
    padding: .2rem;
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
</style>
