<!--头部标题栏-->
<template>
  <div :style="{background : bgColor}" class="header-block">
    <header class="text border-bottom">
      <!--使用slot插槽-->
      <slot></slot>
      <slot name="right" class="right"></slot>
    </header>
  </div>
</template>

<script>
  export default{
    data() {
      return {

      };
    },
    props: {
      page_title: String,
      bgColor: {
        type: [Number, String],
        default: "#ffffff"
      }
    },
    methods: {
      back() {
        if(window.appId === 'IOS'){
            window.interfacePhone.toResultCallBack()
        }
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
    font-size: 36px;
    color: #111111;
    font-weight: bolder;
    text-align: center;
    line-height: 88px;
    position: relative;
  }
  
  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .border-bottom { border-bottom: 1px solid #eeeeee }
  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border-bottom { border-bottom: 0.5px solid #eeeeee }
  }
  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border-bottom { border-bottom: 0.333333px solid #eeeeee }
  }
</style>
