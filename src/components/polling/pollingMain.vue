<template>
    <div class="page">
        <header class="title">
            <div class="switch">
                <div :class="tabShow ? 'tabSelect' : 'tabNotSelect'" @click="doSwitch(1)">待巡检商户</div>
                <div :class="tabShow ? 'tabNotSelect' : 'tabSelect'" @click="doSwitch(2)">已巡检商户</div>
            </div>
        </header>

        <div class="propertySearchParent">
            <div class="propertySearch">
                <img class="searchImg" src="../../../static/images/search.png" />
                <input class="searchInput" placeholder="搜索商户名称" />
            </div>
        </div>






    </div>
</template>

<script>
export default {
    data(){
        return{
            tabShow: true
        }
    },
    created(){

    },
    methods:{
        // 切换
        doSwitch: function(e){
            let that = this
            if(e == 1 && !that.tabShow){
                that.tabShow = true
            }
            if(e == 2 && that.tabShow){
                that.tabShow = false
            }
        },
        // 填写巡查报告
        doReport: function(){
            let that = that
            that.$router.push(that.$RM.PollingReport)
        },
        // 查看历史报告
        toHistory: function(){
            let that = that
            that.$router.push(that.$RM.PollingHistory)
        }
    }    
}
</script>

<style scoped>

.page{
    height: 100%;
    background: #f5f4fa;
}

.title{
    height: .8rem;
    background: #3DB0FC;
    color: white;
    text-align: center;
    font-size: .3rem;
    padding-top: .2rem;
    height: 1rem;
}

.switch{
    display: inline-flex;
    padding: .2rem;
    width: 5rem;
}

.tabSelect{
    flex: 1;
    background: white;
    color: #3DB0FC;
    padding: .1rem;
}

.tabNotSelect{
    flex: 1;
    border: .01rem solid white;
    padding: .1rem;
}

.propertySearchParent{
    background: white;
    height: 1rem;
    padding: .2rem .3rem .1rem .3rem;
    border-bottom: .01rem solid #eeeeee;
}

.propertySearch{
    display: flex;
    background: #f5f4fa;
    border-radius: .1rem;
}

.searchImg{
    width: 100%;
    height: .4rem;
    width: .4rem;
    padding: .3rem .3rem .2rem .3rem;
}

.searchInput{
    border: none;
    padding: .1rem .3rem 0 0;
    color: #cccccc;
    background: #f5f4fa;
    width: 100%;
}


</style>
