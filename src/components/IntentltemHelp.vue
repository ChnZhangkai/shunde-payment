<!--我的界面的功能跳转的item 自用-->
<template>
  <div>
    <div class="intentItem">
      <span class="intentText" :class="{bold:isBold}">
        <slot></slot>
      </span>
      <slot name="extra_text"></slot>
      <img src="../../static/assets/right_arrow.png"/>
    </div>
    <AuthorizationSegment></AuthorizationSegment>
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
  }

  .intentText {
    font-size: 30px;
    color: #666666;
    line-height: 42px;
    text-align: left;
    flex-grow: 1;
  }

  .intentItem > img {
    width: 17px;
    height: 31px;
    padding-right: 31px;
  }

  .bold {
    font-weight: bold;
  }

</style>
