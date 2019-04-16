<template>
  <div class="page">
    <!--先把断网的图片加载出来,等到下面进入v-else条件的时候就可以直接用上-->
    <NetBroken v-show="false"></NetBroken>
    <div v-if="netErrShow">
      <!--<ToolBar :isShowNav="false" class="topCss">银行鉴权</ToolBar>-->
      <div class="backIndex">返回首页，请稍后....</div>
    </div>
    <div v-else>
      <NetBroken></NetBroken>
    </div>
  </div>
</template>

<script>
  import ToolBar from '../ToolBar.vue'
  import NetBroken from '../error/NetBroken.vue'//引入网络中断提示图片
  export default {
    components: {ToolBar, NetBroken},
    data () {
      return {
        netErrShow: true,//断网页面显示与否
      }
    },
    created(){
      setTimeout(function () {
        window.location.href = 'http://web-front.antiantech.com/main';
      }, 3000);
    },
  }
</script>

<style scoped>
  .backIndex {
    text-align: center;
    font-size: 0.4rem;
    margin-top: 2rem;
  }

  .topCss {
    z-index: 999;
    position: relative;
  }

  .page {
    height: 100%;
    background-color: #fff;
  }
</style>
