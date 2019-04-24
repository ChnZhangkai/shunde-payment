<template>
    
</template>

<script>
export default {
    data(){
        return{

        }
    },
    created(){

    },
    methods:{
        // 查看历史详情
        toDetail: function(){
            let that = that
            that.$router.push(that.$RM.PollingHistoryDetail)
        }
    }    
}
</script>

<style scoped>

</style>
