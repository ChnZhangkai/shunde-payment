<!--初始化组件-->
<template>
  <div id="app" style="height:100%;" >
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
      }
    },
    mounted(){

    },
    methods: {

    }
  }
</script>

<style>
  @import "./css/mint.css";

  * {
    margin: 0;
    padding: 0;
  }

  input,
  textarea,
  button {
    -webkit-appearance: none; /*去除苹果safari的固有css样式*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*去除苹果safari的input内阴影*/
  }

  #app {

    /*解决IOS上滑动流畅度*/
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: auto;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000000;
  }

  ul {
    /*去掉无序列表前的黑点*/
    list-style-type: none;
  }
</style>
