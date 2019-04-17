<!--教育缴费详情页面一-->
<template>
  <div style="width: 100%; height: 100%; position: absolute; top: 0px; font-size: 12px; background:#f7f7f7;">
    <header class="text border-bottom">
      <img src="../../../static/images/back.png" class="left" @click="back"/>
      <span class="login">缴费详情</span>
    </header>
    <div class="content">
      <div class="top">￥642.00</div>
      <div class="content1">交易成功</div>
    </div>

    <div class='bookline'>
      <span class="bookcon">订单号</span>
      <span class="val">201901102343242355</span> 
    </div>
  
    <div class='bookline1'>
      <span class="bookcon">党委机构</span>
      <span class="val">华南师范大学党委</span> 
    </div>
   
    <div class='bookline1'>
      <span class="bookcon">党支部</span>
      <span class="val">第一党支部</span> 
    </div>

    <div class='bookline1'>
      <span class="bookcon">姓名</span>
      <span class="val">李楠</span> 
    </div>

    <div class='bookline1'>
      <span class="bookcon">身份证号</span>
      <span class="val">430525177701055678</span> 
    </div>

    <div class='bookline2'>
      <span class="bookcon_spa">缴费时间</span>
      <span class="val_spa">2019-03-10 12:00:00</span> 
    </div>
   
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
    padding-top: 0.6rem;
    font-size: 0.6rem;
    font-weight: bolder;
    text-align: center;
  }
  .content {
    color: #4f4f55;
    padding: 0 0.4rem;
    margin-bottom: 0.5rem;
    background-color: #fff;
    height: 16%;
  }

  .content1 {
    margin-top: 0.12rem;
    color: #a7a7a7;
    background-color: #fff;
    font-size: 0.4rem;
    text-align: center;
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
    color: #a7a7a7;
  }

  .val{
    text-align: right;
    margin-right: 0.3rem;
    margin-top: 0.39rem;
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
  }

  .bookcon_spa{
    text-align: left;
    margin-left: 0.4rem;
    margin-top: 0.3rem;
    color: #a7a7a7;
  }

  .val_spa{
    text-align: right;
    margin-right: 0.3rem;
    margin-top: 0.4rem;
  }
  .bookline2 {
    font-size: 0.48rem;
    color: #333333;
    text-align: left;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fff;
    height: 7%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

</style>
