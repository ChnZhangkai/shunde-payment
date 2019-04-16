<!--透明橘色和深橘色状态切换的按钮-->
<template>
  <button type="button" :class="{btnEnable:isInputNonEmpty,btnDisable:!isInputNonEmpty}" class="loginButton"
          :disabled="!isInputNonEmpty">
    {{name}}
  </button>
</template>
<script>
  export default{
    props: {
      name: {
        type: String,
        default: ''
      },
      isInputNonEmpty: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style>
  .loginButton {
    border: none;
    border-radius: 100px;
    height: 88px;
    width: 100%;
    text-align: center;
    font-size: 30px;
    margin-top: 1.4rem;
    color: #fff1e8;
  }

  .btnDisable {
    background-image: linear-gradient(90deg, #ffc8a3 0%, #ffc8a3 100%);
    text-shadow: 0 1px 0 rgba(220, 86, 0, 0.50);
  }

  .btnEnable {
    background-image: linear-gradient(90deg, #ff6400 0%, #ff6400 100%);
    text-shadow: 0 1px 0 #ff6400;
  }
</style>
