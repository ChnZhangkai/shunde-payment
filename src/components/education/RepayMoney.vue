<!--教育缴费首页-->
<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">用户登录</ToolBar>
        <div class="type_top">
            <img class="type_img" src="../../../static/images/educationpayment.png" />
            <div class="type_text">学校缴费</div>
        </div>

        <div class="type_pay">
            <div class="type_title">学生编号</div>
            <input class="select_type" v-model="addType" placeholder="请输入学生编号" />
        </div>

        <div class="unit_pay">
            <div class="type_title">学生姓名</div>
            <input class="select_type" v-model="addUnit" placeholder="请输入学生姓名" />
        </div>

        <div class="agree_content">
            <img class="content_img" :src="unChooceImg" @click="chooceProtocol"/>
            <div class='content_text'>我已阅读并同意<span class="content_unit" @click="toProtocol">《自助缴费协议》</span></div>
        </div>

        <div class="next_content">
            <button class="nextButton" @click="toNext">下一步</button>
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
            unChooceImg: '../../../static/images/unchoose.png',
            chooceImg: '../../../static/images/choose.png',
            isChooce: false,
            addType: '',
            addUnit: ''
        }
    },
    methods: {
        // 选中协议
        chooceProtocol() {
            if(this.unChooceImg === '../../../static/images/unchoose.png'){
                this.unChooceImg = this.chooceImg
                this.isChooce = true
            } else {
                this.unChooceImg = '../../../static/images/unchoose.png'
                this.isChooce = false
            }
        },
        // 打开协议
        toProtocol() {
            this.$router.push(this.$RM.PaymentProtocol)
        },
        // 下一步
        toNext() {
            if(this.$StringUtils.isEmpty(this.addType)){
                this.$toast("请输入学生编号");
                return;
            }
            if(this.$StringUtils.isEmpty(this.addUnit)){
                this.$toast("请输入学生姓名");
                return;
            }
            if(!this.isChooce){
                this.$toast("请阅读并勾选《自助缴费协议》");
                return;
            }
            this.$router.push(this.$RM.RepayMoneyItem)
        }
    },
    created() {
        
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

.type_top{
  margin-top: 1.17333rem;
  background: #ffffff;
  height: 1.335rem;
  display: flex;
}

.type_img{
  height: .8rem;
  padding: .3rem;
}

.type_text{
  padding: .45rem 0;
  font-size: .4rem;
}

.type_pay{
  background: #ffffff;
  height: 1.335rem;
  margin-top: .27rem;
  display: flex;
  padding-left: .3rem;
  font-size: .4rem;
  margin-bottom: 0.03rem;
}

.type_title{
  padding: .35rem 0;
}

.select_type{
  padding: .05rem 0;
  padding-left: .5rem;
  width: 75%;
  text-align: right;
  border: none;
  height: 1.1rem;
}

.unit_pay {
  background: white;
  height: 1.335rem;
  margin-top: 0.02rem;
  display: flex;
  padding-left: .3rem;
  font-size: .4rem;
}

.agree_content{
  display: flex;
  padding: .3rem;
}

.content_img{
  height: .4rem;
  padding-right: .3rem;
  padding-top: .025rem;
}

.content_text{
  color: #999999;
}

.content_unit{
  color: #3da8f6;
}

.next_content{
  text-align: center;
}

.nextButton{
  width: 94%;
  height: 1.07rem;
  background: #3da8f6;
  border: none;
  border-radius: .1rem;
  color: white;
}

</style>
