<!--教育缴费首页-->
<template>
  <div style="width: 100%; height: 100%; position: absolute; top: 0px; font-size: 12px; background:#f7f7f7;">
    <header class="text border-bottom">
      <img src="../../static/assets/back.png" class="left" @click="back"/>
      <span class="login">用户登录</span>
    </header>
    <div class="content">
      <div class="top">
        <img class="img_flag" src="../../static/assets/educationpayment.png">
        <span class="stu_pay">学校缴费</span>
      </div>
    </div>

    <div class="numline">
      <div class="stu_num">学生编号 <input class="stu_numval" placeholder="请输入学生编号"></div>
    </div>

    <div class='nameline'>
       <div class="name">学生姓名 <input class="stu_name" placeholder="请输入学生姓名"/></div>
    </div>

    <div class='protocol'>
      <!--复选框-->
      <label class="show-boxttt">
        <input type="checkbox" v-model="checked" />
        <div class="show-box" ></div>
      </label>
      <div class='tips'>我已阅读并同意<span @click="toProcol" style="color:#3da8f6">《自助缴费协议》</span></div>
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
  .top {
    display: flex;
  }
  .content {
  /*margin-top: 0.2rem; */
    color: #4f4f55;
    padding: 0 0.4rem;
    margin-bottom: 0.5rem;
    background-color: #fff;
    height: 9%;
  }
  .img_flag {
    width: 0.9rem;
    height: 0.9rem;
    margin-top: 0.3rem;
  }
  .stu_pay {
    padding-top: 0.4rem;
    font-size: 0.5rem;
    margin-left: 0.3rem;
    color: #4f4f55;
  }

  .content1 {
    margin-top: 0.2rem;
    color: #4f4f55;
    padding: 0 0.4rem;
    margin-bottom: 0.5rem;
    background-color: #fff;
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
    padding-bottom: -4.8rem;
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

  .protocol {
    display: flex;
    margin-top: 0.6rem;

  }

  .protocol .checkbox {
    width: 30px;
    height: 30px;
    margin-top: -0.05rem;
  }

  .protocol .tips {
    letter-spacing: 0.02667rem;
    color: #c9c9c9;
    font-size: 0.4rem;
    line-height: 0.6rem;
    margin-left: 0.26667rem;
  }

  label {
    cursor: pointer;

  }

  label .input {
    display: none;
    cursor: pointer;
  }
  .show-box {
    display: none;
  }

  .show-boxttt {
    display: block;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9px;
    border: 1px solid #d8d8d8;
    background: white;
    margin-left: 0.4rem;
  }

  input:checked + .show-box {
   display: block;
    content: '';
    top: 0.02667rem;
    left: 0.08rem;
    margin-left: 0.1rem;
    width: 0.2rem;
    height: 0.4rem;
    border: solid #ff6400;
    border-radius: 6px;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    margin-top: -0.4rem;
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
