<!--右侧有箭头符号并可通过选择器或者输入来选择的信息编写Item-->
<template>
  <div class="backGround">
    <div class="infoItem">
      <span class="leftText">
        <slot></slot>
      </span>
      <input v-if="isInput" class="rightText" v-model="editContent" :placeholder="placeHolder"
             :maxlength="maxLength">
      <span class="rightText" v-else>{{editContent}}</span>
      <!--<img v-if="isEdit == true" src="../../static/assets/right_arrow.png" class="img">-->
      <img v-if="isEdit == true" class='contact-name-css' @click="chooseUrgentName" src="/static/assets/contact.png"/>
      <img class=' clearUserPhoneCss' v-if="vLawName" @click="clearData(1)" src="/static/assets/clear.png"/>
    </div>
    <Divider></Divider>
  </div>
</template>
<script>
  import Divider from '../components/Divider.vue'
  export default{
    components: {Divider},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      isInput: {
        type: Boolean,
        default: false
      },
      placeHolder: {
        type: String,
        default: ''
      },
      maxLength: {
        type: Number,
        default: 10000
      },
    },
    data(){
      return {
        editContent: '',
        vUrgentPhone: ''
      }
    },
    methods: {
      /**
       * 从通讯录选择紧急联系人信息
       */
      chooseUrgentName () {
        //模拟数据
        //  let data = {
        //     name: '张二',
        //     number: '13665555666'
        //   }
        // this.editContent = data.name
        // this.vUrgentPhone = data.number
        // this.$emit('callBack', data);
        let _this = this
        // 获取联系人列表
        window.onContactSelectSuccess = function (result) {
          if (window.appId === 'ANDROID') {
            let selectedContact = JSON.parse(result)
            _this.editContent = selectedContact.name
            _this.vUrgentPhone = selectedContact.number
            this.$emit('callBack', selectedContact);
          }

          if (window.appId === 'IOS') {
            let contactsArr = JSON.parse(result)
            _this.editContent = contactsArr[0].name || ''
            _this.vUrgentPhone = contactsArr[0].number || ''
            this.$emit('callBack', selectedContact);
          }
        }
         window.interfacePhone.selectContact()
      },clearData (num) {
        switch (num) {
          case 1:
            this.vLawName = ''
          default:
            break
        }
      },
    }
  }
</script>
<style scoped>
  .backGround {
    background: #FFFFFF;
    padding-left: 30px;
  }
  .contact-name-css {
    width: 0.373333rem;
    height: 0.373333rem;
    margin-right: 0.3rem;
  }
  .infoItem {
    display: flex;
    flex-direction: row;
    padding: 30px 0;
    align-items: center;
  }

  .leftText {
    font-weight: bold;
    font-size: 30px;
    color: #666666;
    line-height: 42px;
    text-align: left;
    flex-basis: auto;
  }

  .rightText {
    font-size: 30px;
    text-align: right;
    padding-right: 30px;
    border: none;
    outline: none;
    line-height: 42px;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .clearUserPhoneCss {
    width: 0.373333rem;
    height: 0.373333rem;
  }
  .img {
    width: 17px;
    height: 31px;
    padding-right: 30px;
    margin: auto;
  }

</style>
