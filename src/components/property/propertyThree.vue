<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">选择房号</ToolBar>

        <div style="margin-top: 1.17333rem;background: white;">
            <div class="propertySelect" @click="toFour(1)">
                <div class="selectUnit">楼栋</div>
                <input class="selectPlaceHolder" placeholder="请选择" v-model="build"/>
                <img class="selectImg" src="../../../static/images/right.png" />
            </div>
            <div class="propertySelect" @click="toFour(2)">
                <div class="selectUnit">单元</div>
                <input class="selectPlaceHolder" placeholder="请选择" v-model="element"/>
                <img class="selectImg" src="../../../static/images/right.png" />
            </div>
            <div class="propertySelect" @click="toFour(3)">
                <div class="selectUnit">户号</div>
                <input class="selectPlaceHolder" placeholder="请选择" v-model="account"/>
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
            build: '',
            element: '',
            account: ''
        }
    },
    created() {
        this.build = sessionStorage.getItem('1')
        this.element = sessionStorage.getItem('2')
        this.account = sessionStorage.getItem('3')
    },
    methods: {
        // 跳转缴费项目页面
        toNext: function(){
            let that = this

            if(!that.doCheckParam()){
                return;
            }

            that.$router.push(that.$RM.PropertyFive)
        },
        // 选择楼栋信息
        toFour: function(item){
            let that = this
            that.$router.replace({path: that.$RM.PaymentSearch, query: {type: item}})
        },
        // 校验参数
        doCheckParam: function(){
            let that = this
            if(that.$StringUtils.isEmpty(that.build)){
                that.$toast('请选择楼栋')
                return false;
            }
            if(that.$StringUtils.isEmpty(that.element)){
                that.$toast('请选择单元')
                return false;
            }
            if(that.$StringUtils.isEmpty(that.account)){
                that.$toast('户号')
                return false;
            }
            return true;
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
    padding-left: .5rem;
    width: 75%;
    text-align: right;
    border: none;
    height: 1rem;
    padding-top: .1rem;
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
