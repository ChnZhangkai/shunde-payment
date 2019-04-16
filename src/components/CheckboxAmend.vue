<!--公用的复选框样式页面-->
<template>
  <!--<div>-->
  <label class="show-boxttt">
    <input type="checkbox" v-model="checked" />
    <div class="show-box" ></div>
  </label>
  <!--</div>-->

</template>
<script>
  export default{
    data(){
      return {
        checked: false
      }
    },
    watch: {
      checked: function (val) {
        this.$emit('onCheckChange', val);
        sessionStorage.setItem(this.$parent.$options.name + 'checked', val)
      }
    },
    mounted(){
      this.checked = sessionStorage.getItem(this.$parent.$options.name + 'checked') === 'true'
    }
  }
</script>
<style scoped>

  label {
    cursor: pointer;

  }
  input {
    display: none;
    cursor: pointer;
  }
  .show-box {
    display: none;
  }

  .show-box {
    top: 0;
    left: 0;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 2px;
    border: 1px solid #d8d8d8;
    background: white;
  }


  .show-boxttt {
    display: block;
    top: 0;
    left: 0;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 2px;
    border: 1px solid #d8d8d8;
    background: white;

  }

  input:checked + .show-box {
    display: block;
    content: '';
    top: 2px;
    left: 6px;
    margin-left: 0.1rem;
    width: 0.15rem;
    height: 0.3rem;
    border: solid #ff6400;

    border-radius: 2px;
    border-width: 0 2px 2px 0;

    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
  }



</style>
