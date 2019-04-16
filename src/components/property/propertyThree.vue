<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">选择房号</ToolBar>

        <div style="margin-top: 1.17333rem;background: white;">
            <div class="propertySelect">
                <div class="selectUnit">楼栋</div>
                <div class="selectPlaceHolder">请选择</div>
                <img class="selectImg" src="../../../static/images/right.png" />
            </div>
            <div class="propertySelect">
                <div class="selectUnit">单元</div>
                <div class="selectPlaceHolder">请选择</div>
                <img class="selectImg" src="../../../static/images/right.png" />
            </div>
            <div class="propertySelect">
                <div class="selectUnit">户号</div>
                <div class="selectPlaceHolder">请选择</div>
                <img class="selectImg" src="../../../static/images/right.png" />
            </div>
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
            unChooceImg: '../../../static/images/unchooce.png'
        }
    },
    methods: {
        // 跳转缴费项目页面
        toNext: function(){
            let that = this
            that.$router.push(that.$RM.PaymentDetail)
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
    display: flex;
    margin-left: .3rem;
    font-size: .4rem;
    border-bottom: .001rem solid #eeeeee;
}

.selectUnit{
    padding: .35rem 0;
}

.selectPlaceHolder{
    padding: .35rem 0;
    color: #cccccc;
    padding-left: .5rem;
    width: 75%;
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
    margin-top: .8rem;
}

</style>
