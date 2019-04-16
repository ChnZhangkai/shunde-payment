<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">缴费详情</ToolBar>

        <div class="propertyRecord" style="margin-top: 1.17333rem;">

        </div>

    </div>
</template>

<script>

import ToolBar from '../ToolBar.vue'

export default {
    components: {ToolBar},
    data(){
        return{
            toolBarColor: '#f7f7f7'
        }
    },
    created() {

    },
    methods: {
        // 选择楼栋信息
        toFour: function(item){
            let that = this
            that.$router.replace({path: that.$RM.PropertyFour, query: {type: item}})
        }
    }
}
</script>

<style scoped>

.page{
    height: 100%;
    background: #f5f4fa;
}

.fixed {
    position: fixed;
    width: 100%;
    margin-top: 0;
    top:0;
    z-index: 2;
}

.propertyRecord{
    background: white;
}

</style>
