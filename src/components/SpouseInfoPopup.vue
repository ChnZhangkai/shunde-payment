<!-- 配偶信息类型选择popup -->
<template>
  <mt-popup class="mint-popup-4" v-model="popupVisible" position="bottom">
    <mt-picker
      :slots="spouseInfoSlot"
      @change="onSpouseTypeChange"
      :visible-item-count="5"
      :itemHeight="40"
      showToolbar>
        <div class="title">
          <span class="chooseFinish" @click="cancel">取消</span>
          <span class="chooseFinish flexGrow1" @click="finish">完成</span>
        </div>
    </mt-picker>
  </mt-popup>
</template>

<script>
  export default{
    props: {
      popupVisible: {
        type: [Boolean],
        default: false
      }
    },
    data(){
      return {
        spouseType: '',
        spouseInfoSlot: [{
          flex: 1,
          values: ['未婚', '已婚', '离异', '丧偶'],
          className: 'slot1'
        }],
      }
    },
    methods: {
      onSpouseTypeChange: function (picker, values) {
        this.spouseType = values[0]
      },
      finish () {
        this.$emit('onValueChange', this.spouseType)
        this.popupVisible = false
      },
      cancel () {
        this.$emit('onValueChange', 'cancle')
        this.popupVisible = false
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    flex-direction: row;
    width: 100%;
    background: #f0f0f0;
  }

  .chooseFinish {
    font-size: 0.45rem;
    color: #0076ff;
    padding: 20px 36px;
    text-align: right;
  }

  .chooseCancle {
    font-size: 0.45rem;
    color: #666666;
    padding: 20px 36px;
    text-align: right;
  }

  .flexGrow1 {
    flex-grow: 1;
  }
</style>
