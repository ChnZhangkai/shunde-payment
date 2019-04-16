<!--资讯详情界面-->
<template>
  <div>
    <div class="text modify-text"><ToolBar>我的资讯</ToolBar></div>
    <Divider></Divider>
    <div class="informationItem">
      <div class="title">{{item.title}}</div>
      <div class="time">{{item.relDate}}</div>
      <img class='img' :src="item.imgPath">
      <span class="content" v-html="item.content"></span>
    </div>
    <div class="bottomArea">
      <div class="likeButton" @click="updateLike()">
        <img class='img' :src="getLikeImg()">
        <span>赞</span>
      </div>
      <div class="split"></div>
      <div class="share" @click="share()">
        <img class='img' :src="'../../static/assets/share.png'">
        <span>分享</span>
      </div>
    </div>
  </div>
</template>
<script>
  import ToolBar from '../ToolBar.vue'
  import Divider from '../Divider.vue'
  export default{
    components: {ToolBar, Divider},
    data(){
      return {
        item: {},
        isLike:0,
        phoneNo:sessionStorage.getItem("cachePhone"),
      }
    },
    mounted(){
      if (this.$route.query && this.$route.query.detail) {
        this.item = this.$route.query.detail;
        this.$api.post(this.$Constants.IS_LIKE, {
          phoneNo:this.phoneNo,
          informationId:this.item.id
        }, function (result) {
          this.$indicator.close();
          this.isLike = result;
        }.bind(this))
      }
      this.$api.post(this.$Constants.ADD_INFORMATION_VIEW_COUNT, {
        id:this.item.id
      }, function (result) {
      }.bind(this))
    },
    methods:{
      getLikeImg(){
        return '../../static/assets/'.concat(this.isLike == 0? 'no_like.png' : 'is_like.png')
      },
      updateLike(){
        let isLike = this.isLike==0?1:0
        this.$api.post(this.$Constants.ADD_UPDATE_LIKE, {
          phoneNo:this.phoneNo,
          informationId:this.item.id,
          isLike:isLike
        }, function (result) {
          this.$indicator.close();
          this.isLike = isLike;
        }.bind(this))
      },
      share(){
        let shareUrl = window.location.href;
        shareUrl = shareUrl.substr(0,shareUrl.indexOf("Owner")) + "static/html/InformationDetail.html?informationId="+this.item.id;
        //todo 分享
        this.$api.post(this.$Constants.ADD_INFORMATION_SHARE_COUNT, {
          id:this.item.id,
          type:"1"
        }, function (result) {
        }.bind(this))
      },
    }
  }
</script>
<style scoped>
  .informationItem {
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }

  .informationItem .title {
    font-size: 32px;
    color: #333333;
    font-weight: bold;
    margin-left: 30px;
    margin-top: 1.25rem;
  }

  .informationItem .time {
    font-size: 24px;
    color: #999999;
    flex-grow: 1;
    margin-left: 30px;
    margin-top: 25px;
  }

  .informationItem .img {
    width: 90%;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
    margin-top: 0.4rem;
    margin-left: 0.3rem;
  }

  .informationItem  .content {
    margin: 0.3rem;
    padding-bottom: 1.25rem;
  }

  .bottomArea{
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    background: #F5F5F5;
    height: 1.2rem;
    text-align: center;
    font-size: 12pt;
    color: #999999;
    display: flex;
  }

  .bottomArea .likeButton{
    width: 50%;
    height: 100%;
  }

  .bottomArea .img{
    width: 0.75rem;
    vertical-align: baseline;
    margin-top: 0.2rem;
   }

  .bottomArea span{
    vertical-align: super;
  }

  .bottomArea .split{
    margin-top: 0.25rem;
    float: left;
    width: 0.02rem;
    height: 0.8rem;
    background: #E1E1E1;
  }

  .bottomArea .share{
    width: 50%;
    height: 100%;
  }

  .modify-text {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: 9;
  }
</style>
