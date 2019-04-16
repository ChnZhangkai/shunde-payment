<!--我的界面的功能跳转的item 自用-->
<template>
  <div>
    <div class="intentItem">
      <button class="intentText" :class="{bold:isBold}">
        <slot></slot>
      </button>
      <slot name="extra_text"></slot>
    </div>
  </div>
</template>
<script>
  import AuthorizationSegment from '../components/AuthorizationSegment.vue'
  export default{
    components: {AuthorizationSegment},
    props: {
      index: Number,
      isBold: {
        type: Boolean,
        default: false
      }
    },
  }
</script>
<style scoped>
  .intentItem {
    display: flex;
    flex-direction: row;
    padding-top: 29px;
    padding-bottom: 29px;
    align-items: center;
    background-color: #ffffff;
    margin-top: 5%;
  }

  .intentText {
    font-size: 35px;
    color: #999999;
    line-height: 80px;
    text-align: center;
    flex-grow: 1;
    background-color: #ffffff;
    border: 1px solid #999999;
  }

  .bold {
    font-weight: bold;
  }

</style>
