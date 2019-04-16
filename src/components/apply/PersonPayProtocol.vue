<!--进件中,商户协议的内容页面-->
<template>
  <div class="page">
    <ToolBar class="fixed">银行卡支付代扣协议</ToolBar>
    <div class="content">
      <span class="first">协议内容待补充</span>  
    </div>
  </div>
</template>
<script>

  import ToolBar from '../ToolBar.vue'
  export default {

    components: {ToolBar},
    data(){
      return {}
    },

  }
</script>
<style scoped>
  .page .fixed {
    position: fixed;
    width: 100%;
  }

  .commonCss {
    font-weight: normal;

  }
  section >span{
    margin-left: 0.4rem;
  }

  section {
    font-weight: bold;
  }

  .company {
    font-weight: bold;
  }

  .page {
    background-color: #f2f2f2;
  }

  .content {
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    font-size: 30px;
    color: #666666;
    text-align: justify;
    line-height: 0.7rem;
    padding-top: 100px;
  }


  .first{
    margin-left: 0.6rem;
  }
  .margin4{
    margin-left: 0.4rem;
  }
  .textLine{
    text-decoration: underline;
  }

</style>
