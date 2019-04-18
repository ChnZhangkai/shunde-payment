<!--党费机构选择页面-->
<template>
  <div class="page">
    <ToolBar class="fixed" :bgColor="toolBarColor">选择机构</ToolBar>

    <div class="propertyType" style="margin-top: 1.17333rem;">
        <img class="typeImg" src="../../../static/images/party.png" />
        <div class="typeText">党费缴费</div>
    </div>

    <div class="propertySelect" @click="toSD">
        <div class="selectUnit">党委机构</div>
        <input class="selectPlaceHolder" v-model="department" placeholder="请选择" />
        <img class="selectImg" src="../../../static/images/right.png"/>
    </div>

    <div class="propertySelect" @click="toSB">
        <div class="selectUnit">党支部</div>
        <input class="selectPlaceHolder2" v-model="branch" placeholder="请选择" />
        <img class="selectImg" src="../../../static/images/right.png"/>
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
  data() {
    return {
      toolBarColor: '#f7f7f7',
      unChooceImg: '../../../static/images/unchoose.png',
      chooceImg: '../../../static/images/choose.png',
      isChooce: false,
      department: '',
      branch: ''
    }
  },
  methods: {
    // 选择机构
    toSD: function(){
      this.department = '华南师范大学党委'
    },
    // 选择支部
    toSB: function(){
      this.branch = '计算机系党支部'
    },
    // 选中协议
    chooceProtocol: function(){
        let that = this;
        if(that.unChooceImg === '../../../static/images/unchoose.png'){
            that.unChooceImg = that.chooceImg
            that.isChooce = true
        } else {
            that.unChooceImg = '../../../static/images/unchoose.png'
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
        if(that.$StringUtils.isEmpty(that.department)){
            that.$toast("请选择党委机构");
            return;
        }
        if(that.$StringUtils.isEmpty(that.branch)){
            that.$toast("请选择党支部");
            return;
        }
        if(!that.isChooce){
            that.$toast("请阅读并勾选《自助缴费协议》");
            return;
        }
        that.$router.push(that.$RM.PartyMemberLog)
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
