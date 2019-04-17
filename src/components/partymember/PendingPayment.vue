<!--党费待缴费页面一-->
<template>
  <div style="width: 100%; height: 100%; position: absolute; top: 0px; font-size: 12px; background:#f7f7f7;">
    <header class="text border-bottom">
      <img src="../../static/assets/back.png" class="left" @click="back"/>
      <span class="login">待缴费</span>
    </header>
    <div class="content">
      <div class="top">
        <img class="img_flag" src="../../static/assets/educationpayment.png">
        <span class="school">华南师范大学党委</span>
      </div>
      <div class="partycon">【计算机系党支部】李楠 430525177701055678</div>
    </div>

    <div class="numline">
      <div class="wait_pay">待缴费</div>
      <div class="al_pay">缴费记录</div>
    </div>

    <div class="pay_amt">
      <div class="stu_num">党费金额 <input class="stu_numval" placeholder="请输入缴费金额">&nbsp元</div>
    </div>

    <button class="nextButton">立即缴费</button>

  </div>
</template>

<script>
  import {Loadmore} from 'mint-ui';
  export default{
    data() {
      return {

      };
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    }

  }
</script>

<style scoped>
  header {
    height: 88px;
    flex-direction: row;
    position: fixed;
    margin: auto 0;
  }
  .header-block {
    height: 1.17333rem;
  }
  .text {
    font-size: 28PX;
    color: #222222;
    font-weight: bolder;
    text-align: center;
    line-height: 1.5rem;
    position: relative;
    background-color: #f7f7f7;
    font-family: serif;
    height: 8%;
  }
  .left {  
    height: 0.7rem;
    float: left;
    margin-left: 0.4rem;
    margin-top: 0.4rem;
  }
  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .border-bottom { border-bottom: 1px solid #f7f7f7 }
  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border-bottom { border-bottom: 0.5px solid #f7f7f7 }
  }
  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border-bottom { border-bottom: 0.333333px solid #f7f7f7 }
  }
  .top {
    display: flex;
  }
  .content {
    color: #4f4f55;
    padding: 0 0.4rem;
    margin-bottom: 0.5rem;
    background-color: #fff;
    height: 12%;
  }
  .img_flag {
    width: 0.55rem;
    height: 0.55rem;
    margin-top: 0.4rem;
    margin-left: -0.1rem;
  }
  .school {
    padding-top: 0.3rem;
    font-size: 0.5rem;
    margin-left: 0.1rem;
    color: #4f4f55;
  }

  .partycon {
    margin-top: 0.2rem;
    color: #4f4f55;
    padding: 0 0.3rem;
    margin-bottom: 0.5rem;
    background-color: #fff;
    font-size: 0.4rem;
  }
  .numline {
    font-size: 0.48rem;
    color: #111111;
    text-align: left;
    margin-bottom: 0.04rem;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 9%;
    display: flex;
  }

  .wait_pay {
    border-radius: 1px;
    height: 1.15rem;
    width: 100%;
    text-align: center;
    font-size: 0.5rem;
    /* margin-top: 0.6rem; */
    color: #ffffff;
    background-color: #3da8f6;
    margin-left: 1.7rem;
    /* height: 72%; */
    line-height: 1.1rem;
  }

  .al_pay {
    border-radius: 1px;
    height: 1.1rem;
    width: 100%;
    text-align: center;
    font-size: 0.5rem;
    /* margin-top: 0.6rem; */
    color: #3da8f6;
    background-color: #ffffff;
    /* margin-left: 0.4rem; */
    margin-right: 1.7rem;
    line-height: 1.1rem;
    border: 1px solid #3da8f6;
  }

  .pay_amt {
    font-size: 0.48rem;
    color: #111111;
    text-align: left;
    margin-bottom: 0.06rem;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fff;
    height: 9%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: 0.1rem;
  }
  .stu_numval {
    padding-top: -3rem;
    font-size: 0.5rem;
    border: 0;
    padding-bottom: -4.8rem;
    text-align: right;
    width: 67%;
  }
  .stu_num {
    font-size: 0.5rem;
    padding-top: 0.4rem;
    margin-left: 0.4rem;
    color: #4f4f55;
    width: 100%;
  }

  .nextButton {
    border: none;
    border-radius: 6px;
    height: 88px;
    width: 92%;
    text-align: center;
    font-size: 30px;
    margin-top: 0.6rem;
    color: #ffffff;
    background-color: #3da8f6;
    margin-left: 0.4rem;
  }

</style>
