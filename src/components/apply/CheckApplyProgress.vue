<template>
  <div class="page">
    <ToolBar class="topCss">查看申请进度</ToolBar>
    <!--<iframe-->
      <!--:src="iframeSrc"-->
      <!--frameborder="0"-->
      <!--scrolling="auto"-->
      <!--class="iframe-css">-->
    <!--</iframe>-->
  </div>
</template>

<script>
  import ToolBar from '../ToolBar.vue'
  export default {
    components: { ToolBar },
    data () {
      return {
//        iframeSrc: this.$Constants.CHECK_APPLY_PROGRESS_URL
      }
    },
    mounted () {
     window.location.href=this.$Constants.CHECK_APPLY_PROGRESS_URL;
    },
  }
</script>

<style scoped>
  .topCss {
    z-index: 999;
    position: relative;
  }

  .page {
    height: 100%;
    background-color: #fff;
  }

  .iframe-css {
    width: 100%;
    height: 100%;
    top: 1.2rem;
    left: 0;
    bottom: 0;
    position: absolute;
  }
</style>
