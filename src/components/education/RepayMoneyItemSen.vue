<!--教育缴费项目页面一-->
<template>
  <div style="width: 100%; height: 100%; position: absolute; top: 0px; font-size: 12px; background:#f7f7f7;">
    <header class="text border-bottom">
      <img src="../../static/assets/back.png" class="left" @click="back"/>
      <span class="login">缴费项目</span>
    </header>
    <div class="content">
      <div class="top">
        <img class="img_flag" src="../../static/assets/educationpayment.png">
        <span class="school">顺德实验中学</span>
      </div>
      <div class="content1">【三年级004班】杨露露 2019000018102</div>
    </div>

    <div class="numline">
      <div class="wait_pay">待缴账单</div>
      <div class="al_pay">缴费记录</div>
    </div>

    <div class='bookline'>
      <span class="bookcon">顺德实验中学</span>
      <span class="amt_flag">￥568.00</span> 
    </div>
    <div class="book_num">2019-03-10 12:00:00</div> 
  
    <div class='bookline1'>
      <span class="bookcon">顺德实验中学</span>
      <span class="amt_flag">￥268.00</span> 
    </div>
    <div class="book_num">2019-03-10 12:00:00</div> 
   
    <div class='bookline1'>
      <span class="bookcon">顺德实验中学</span>
      <span class="amt_flag">￥500.00</span> 
    </div>
    <div class="book_num">2018-03-10 12:00:00</div> 

    <div class='bookline1'>
      <span class="bookcon">顺德实验中学</span>
      <span class="amt_flag">￥300.00</span> 
    </div>
    <div class="book_num">2018-03-10 12:00:00</div>

    <div class='bookline1'>
      <span class="bookcon">顺德实验中学</span>
      <span class="amt_flag">￥268.00</span> 
    </div>
    <div class="book_num">2018-03-10 12:00:00</div>
   
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

  .content1 {
    margin-top: 0.2rem;
    color: #4f4f55;
    padding: 0 0.4rem;
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

  .al_pay {
    border-radius: 1px;
    height: 1.15rem;
    width: 100%;
    text-align: center;
    font-size: 0.5rem;
    /* margin-top: 0.6rem; */
    color: #ffffff;
    background-color: #3da8f6;
    margin-right: 1.7rem;
    /* height: 72%; */
    line-height: 1.1rem;
  }

  .wait_pay {
    border-radius: 1px;
    height: 1.1rem;
    width: 100%;
    text-align: center;
    font-size: 0.5rem;
    /* margin-top: 0.6rem; */
    color: #3da8f6;
    background-color: #ffffff;
    /* margin-left: 0.4rem; */
    margin-left: 1.7rem;
    line-height: 1.1rem;
    border: 1px solid #3da8f6;
  }

  .bookline {
    font-size: 0.48rem;
    color: #333333;
    text-align: left;
    /* margin-bottom: 0.13333rem; */
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fff;
    height: 7%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .bookcon{
    text-align: left;
    margin-left: 0.4rem;
    margin-top: 0.3rem;
  }

  .amt_flag{
    text-align: right;
    margin-right: 0.3rem;
    margin-top: 0.6rem;
  }

  .book_num{
    font-size: 0.4rem;
    /* margin-left: 1rem; */
    background-color: #ffffff;
    /* inline-size: -webkit-fill-available; */
    /* margin-left: 1rem; */
    padding-left: 0.4rem;
    padding-bottom: 0.3rem;
    color: #a7a7a7;
  }

  .bookline1 {
    font-size: 0.48rem;
    color: #333333;
    text-align: left;
    /* margin-bottom: 0.13333rem; */
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fff;
    height: 7%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 0.1rem;
  }

</style>
