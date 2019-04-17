<!--党员缴费用户登录页面-->
<template>
  <div style="width: 100%; height: 100%; position: absolute; top: 0px; font-size: 12px; background:#f7f7f7;">
    <header class="text border-bottom">
      <img src="../../static/assets/back.png" class="left" @click="back"/>
      <span class="login">缴费用户登录</span>
    </header>

    <div class="content">
      <div class="numline">
        <div class="stu_num">党员姓名<input class="stu_numval" placeholder="请输入党员姓名"></div>
      </div>
    </div>

    <div class='nameline'>
       <div class="name">身份证号<input class="stu_name" placeholder="请输入身份证号"/></div>
    </div>

    <button class="nextButton">下一步</button>
  </div>
</template>

<script>
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
  
  .content {
    color: #4f4f55;
    margin-bottom: 0.09rem;
    background-color: #fff;
    height: 9%;
  }
  .numline {
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
    width: 73%;
  }
  .stu_num {
    font-size: 0.5rem;
    padding-top: 0.4rem;
    margin-left: 0.4rem;
    color: #4f4f55;
    width: 100%;
  }

  .nameline {
    font-size: 0.48rem;
    color: #111111;
    text-align: left;
    margin-bottom: 0.13333rem;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fff;
    height: 9%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .stu_name {
    font-size: 0.5rem;
    border: 0;
    text-align: right;
    width: 73%;
  }
  .name {
    font-size: 0.5rem;
    padding-top: 0.42rem;
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
