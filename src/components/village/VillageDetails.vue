<!--村居缴费详情页面-->
<template>
  <div class="page">
      <ToolBar class="fixed" :bgColor="toolBarColor">缴费项目</ToolBar>
        <div class="content">
          <div class="top">￥642.00</div>
          <div class="content1">交易成功</div>
        </div>

    <div class='bookline'>
      <span class="bookcon">订单号</span>
      <span class="val">201901102343242355</span> 
    </div>
  
    <div class='bookline1'>
      <span class="bookcon">缴费类型</span>
      <span class="val">大良马路鱼塘002</span> 
    </div>
   
    <div class='bookline1'>
      <span class="bookcon">缴费单位</span>
      <span class="val">顺德金华村委会</span> 
    </div>

    <div class='bookline1'>
      <span class="bookcon">承包商姓名</span>
      <span class="val">孙芸</span> 
    </div>

    <div class='bookline1'>
      <span class="bookcon">联系电话</span>
      <span class="val">13988776654</span> 
    </div>

    <div class='bookline2'>
      <span class="bookcon_spa">缴费时间</span>
      <span class="val_spa">2019-03-10 12:00:00</span> 
    </div>

    <div class='bookline3'>
      <span class="bookcon_top">2019年4月卫生费</span>
      <span class="val_top">￥200.00</span> 
    </div>

    <div class='bookline1'>
      <span class="bookcon">2019年4月水费</span>
      <span class="val">￥64.00</span> 
    </div>

    <div class='bookline4'>
      <span class="bookcon_end">2019年4月电费</span>
      <span class="val_end">￥60.00</span> 
    </div>
   
  </div>
</template>

<script>
  import ToolBar from '../ToolBar.vue'

  export default {
    components: {ToolBar},
    data() {
      return {
          toolBarColor: '#f7f7f7'
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
    height: 17%;
    margin-top: 1.5rem;
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
    -webkit-box-pack: justify;
    justify-content: space-between;
    background-color: #fff;
    height: 7%;
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

 .bookline3 {
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
    margin-top: 0.07rem
  }

  .bookcon_top{
    text-align: left;
    margin-left: 0.4rem;
    margin-top: 0.4rem;
    color: #a7a7a7;
  }

  .val_top{
    text-align: right;
    margin-right: 0.3rem;
    margin-top: 0.4rem;
  }

   .bookline4 {
    font-size: 0.48rem;
    color: #333333;
    text-align: left;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fff;
    height: 9%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .bookcon_end{
    text-align: left;
    margin-left: 0.4rem;
    margin-top: 0.4rem;
    color: #a7a7a7;
  }

  .val_end{
    text-align: right;
    margin-right: 0.3rem;
    margin-top: 0.4rem;
  }
</style>
