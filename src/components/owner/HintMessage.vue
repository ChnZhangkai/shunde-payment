<!--反馈成功界面-->
<template>
  <div>
    <ToolBar>我的信息</ToolBar>
    <Divider></Divider>
    <div class="feedSuccess">
      <div class="imgText">
        <img src="/static/assets/notInformatio2x.png">
      </div>
      <span class="message">暂无消息</span>
    </div>
  </div>

</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  export default{
    components: {ToolBar, Divider}
  }
</script>
<style scoped>
  .feedSuccess {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .message {
    font-size: 28px;
    color: #666666;
    margin-left: 9%;
    margin-top: 8%;
  }
  .feedSuccess  .imgText{
    width: 250px;
    height: 250px;
    margin-top: 40%;
    margin-left: 3%;

  }
  img {
    width: 100%;
    height: 100%;
  }

</style>
