<!--跳转平安h5的缓冲页面-->
<template>
  <div>
    <ToolBar isShowNav="false">{{title}}</ToolBar>
    <div class='middle'>
      <div>
        <img binderror='imageError' class='imgcss' src='/static/assets/wait.png'/>
      </div>

      <div class='record'>即将跳转到平安银行操作页面，<br/>
        <span>请耐心等待(3s)…</span>

      </div>
      <!--底部按钮-->
      <div align="center">
        <input type="button" id="btn666Id" class="btn666" v-show='btnShow' value="返回首页" @click="toIndex()"/>
      </div>
    </div>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  export default{
    components: {ToolBar},
    data(){
      return {
        btnShow: false,//点击还款菜单，默认是缓存页面
        title: '还款',//标题栏文字初始化
      }
    },
    mounted(){

      var that = this;

      let temp = that.$route.query.success;//由进件成功跳转传过来的参数
      if (temp === '1') {
        that.show = false;//隐藏标题的后退按钮
        that.btnShow = true;
        that.title = '申请成功';
        that.netErrorHidden = false;//断网占位图片，true是显示
        that.bgcHidden = true;//背景图片，true是隐藏
        that.$dialog.confirm("申请完成，请返回首页关注进度。", '恭喜您！',
          {
            showCancelButton: false,
            confirmButtonText: '好的',
          })
          .then(() => {
            console.info("停留在当前页面")
          })
          .catch(() => {
            console.info("停留在当前页面")
          });
      }

      let status = that.$route.query.status;//由还款页面传过来的授信状态

      console.info("还款页面传过来的授信状态：" + status);

      that.isCreditStatus(status)
    },
    methods: {
      isCreditStatus(statusTemp) {
        console.info("进入，根据授信状态渲染页面的方法，状态是:" + statusTemp);
        var that = this;
        if ('03' === statusTemp) {
          that.title = '申请进度查询';
          that.netErrorHidden = false;//断网占位图片，true是显示
          that.bgcHidden = true;//背景图片，true是隐藏
          that.btnShow = true;
        }
        if ('13' === statusTemp) {
          //面签成功，跳转去签署合同
          that.title = '签署授信合同';
          that.netErrorHidden = false;//断网占位图片，true是显示
          that.bgcHidden = true;//背景图片，true是隐藏
          that.btnShow = true;
        }

        if ('15' === statusTemp) {
          that.title = '提现';
          that.netErrorHidden = false;//断网占位图片，true是显示
          that.bgcHidden = true;//背景图片，true是隐藏
          that.btnShow = true;
        }
        if ('16' === statusTemp) {
          that.title = '签署授信合同';
          that.netErrorHidden = false;//断网占位图片，true是显示
          that.bgcHidden = true;//背景图片，true是隐藏
          that.btnShow = true;
        }
        if ('6666' === statusTemp) {
          console.info("进入无网络状态>>>>>>");
          that.netErrorHidden = true;//断网占位图片，true是显示
          that.bgcHidden = false;//背景图片，true是隐藏
        }

      },
      toIndex(){
        //返回到首页借款页面
        this.$router.push({name: this.$RM.Main, params: {selected: '借款'}})
      },
    }
  }

</script>

<style scoped>
  page {
    background: #f5f5f5;
  }

  .middle {
    height: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .record {
    font-size: 30px;
    color: #9b9b9b;
    line-height: 45px;
    margin-top: 1rem;
  }

  .imgcss {
    width: 80px;
    height: 80px;
    margin: auto;
  }

  .btn666 {
    margin-top: 50px;
    margin-bottom: 50px;
    background-image: linear-gradient(-90deg, #ff6400 0%, #ff6400 100%);
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    width: 8.7rem;
    height: 1.3rem;
    border: none;
    font-size: 30px;
    color: #ffffff;
  }
</style>
