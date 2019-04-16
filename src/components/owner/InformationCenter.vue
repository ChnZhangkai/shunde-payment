<!--资讯中心界面-->
<template>
  <div class="page">
    <div class="text modify-text"><ToolBar>我的资讯</ToolBar></div>
    <input type="text" v-model="searchText" :placeholder='icon' class="search iconfont modify-input" @keyup.enter="searchList()"/>
    <ul>
      <li class="informationItem" v-for="item in list" @click="toDetail(item)">
        <div class="item">
          <div class="imgLeft">
          <img class='img' :src="item.imgPath" style="width: 3rem;height: 2rem;"></div>
          <div class="itemRight">
            <div class="title">{{item.title}}</div>
            <div class="time">{{item.relDate}}</div>
          </div>
        </div>
        <Divider></Divider>
      </li>
    </ul>
    <div class="nullItem" v-if="isEmptyShow">
      <img src="/static/assets/null_message.png">
      <span>暂无资讯</span>
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
        list: [],
        isEmptyShow: false,
        searchText: "",
        icon:'\ue6a4文章搜索'
      }
    },
    methods: {
      toDetail(item){
        this.$router.push({path: this.$RM.InformationDetail, query: {detail: item}})
      },
      searchList(){

        //15分钟之后登陆态失效，强制重新登陆
        if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
          this.$CACHE.showErr();
          return
        }else{
          this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
        }
        this.$api.post(this.$Constants.GET_INFORMATION, {
          title:this.searchText,
          "pageSize": 10,
          "orderBy":"REL_DATE DESC",
          "status":"1"
        }, function (result) {
          this.$indicator.close();
          this.list=[];
          let list = result.records;
          for (let i = 0; i < list.length; i++) {
            list[i].relDate = this.$utils.getDate(list[i].relDate,"yyyy-MM-dd");
            /*if(list[i].content && list[i].content.length>200){
              list[i].content=list[i].content.substr(0,200)+"......."
            }*/
            this.list.push(list[i])
          }
          if (this.list == null || this.list.length <= 0) {
            this.isEmptyShow = true
          }
          else{
            this.isEmptyShow = false
          }
        }.bind(this), function (err) {
          this.$indicator.close();
          this.isEmptyShow = true
        }.bind(this))
      }
    },
    mounted(){
      //进入新界面重置session失效时间
      //15分钟之后登陆态失效，强制重新登陆
      if(this.$StringUtils.isEmpty(this.$CACHE.getCache("loginSession"))){
        this.$CACHE.showErr();
        return
      }else{
        this.$CACHE.putCache("loginSession", this.$CACHE.getCache("loginSession"),15*60)//缓存存个15分钟
      }
      this.$indicator.open();
      this.$api.post(this.$Constants.GET_INFORMATION, {
        "pageSize": 10,
        "orderBy":"REL_DATE DESC",
        "status":"1"
      }, function (result) {
        this.$indicator.close();
        let list = result.records;
        for (let i = 0; i < list.length; i++) {
          list[i].relDate = this.$utils.getDate(list[i].relDate,"yyyy-MM-dd");
          /*if(list[i].content && list[i].content.length>200){
            list[i].content=list[i].content.substr(0,200)+"......."
          }*/
          this.list.push(list[i])
        }
        if (this.list == null || this.list.length <= 0) {
          this.isEmptyShow = true
        }
        else{
          this.isEmptyShow = false
        }
      }.bind(this), function (err) {
        this.$indicator.close();
        this.isEmptyShow = true
      }.bind(this))
    }
  }
</script>
<style scoped>
  @import '../../assets/iconfont/iconfont.css';

  .informationItem {
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }

  .informationItem .item {
    display: flex;
    flex-direction: row;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }

  .informationItem .item .imgLeft {
    width: 3rem;
    height: 2rem;
    padding: 0.2rem;
  }

  .informationItem .item .img {
    width: 100%;
    height: 100%;
  }

  .informationItem .item .itemRight {
    padding: 0.2rem;
    position: relative;
    z-index: 0;
    width: 6rem;
  }

  .informationItem .title {
    font-size: 12pt;
    line-height: 42px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .informationItem .time {
    color: #999999;
    position: absolute;
    bottom: 0.25rem;
  }

  .nullItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 321px;
  }

  .nullItem > img {
    width: 181px;
    height: 223px;
  }

  .nullItem > span {
    font-size: 30px;
    color: #666666;
    line-height: 42px;
    text-align: left;
  }

  .search{
    width: 90%;
    border-radius: 3pt;
    border: #000000;
    text-align: center;
    line-height: normal;
    padding: 0.15rem;
    font-size: 0.5rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    margin-left: 0.35rem;
  }
  .search::placeholder{
    font-size: 0.42rem;
  }
  .page {
    height: 100%;
    background-color: #f2f2f2;
  }
  .modify-text {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
    z-index: 9;
  }
  .modify-input {
    margin-top: 1.37333rem;
    height: 30px;
  }
</style>
