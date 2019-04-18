<!--党员缴费用户登录页面-->
<template>
  <div class="page">
    <ToolBar class="fixed" :bgColor="toolBarColor">缴费用户登录</ToolBar>

    <div class="propertyMain" style="margin-top: 1.17333rem;">
        <div class="propertySelect">
            <span class="selectPayment">党员姓名</span>
            <input class="selectMoney" placeholder="请输入党员姓名" v-model="username" />
        </div>
        <div class="propertySelect">
            <span class="selectPayment">身份证号</span>
            <input class="selectMoney" placeholder="请输入身份证号" v-model="idNo" />
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
    data() {
      return {
        username: '',
        idNo: ''
      };
    },
    methods: {
      // 下一步
      toNext: function(){
        let that = this
        if(that.$StringUtils.isEmpty(that.username)){
            that.$toast("请输入党员姓名");
            return;
        }
        if(that.$StringUtils.isEmpty(that.idNo)){
            that.$toast("请输入身份证号");
            return;
        }
        that.$router.push(that.$RM.PendingPayment)
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
    padding: 0 .3rem;
}

.selectPayment{
    padding: .35rem 0;
}

.selectMoney{
    border: none;
    text-align: right;
    flex: 1;
    padding-bottom: .1rem;
    font-size: .4rem;
}

.propertySelect{
    background: white;
    height: 1.335rem;
    margin-top: .27rem;
    display: flex;
    padding-left: .3rem;
    font-size: .4rem;
    border-bottom: .01rem solid #eeeeee;
}

.selectUnit{
    padding: .35rem 0;
}

.selectPlaceHolder{
    padding: .05rem 0;
    padding-left: .5rem;
    width: 69%;
    text-align: right;
    border: none;
    height: 1.1rem;
}

.selectPlaceHolder2{
    padding: .05rem 0;
    padding-left: .5rem;
    width: 73%;
    text-align: right;
    border: none;
    height: 1.1rem;
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
    margin-top: 1rem;
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
