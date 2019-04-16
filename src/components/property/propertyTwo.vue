<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">选择小区</ToolBar>

        <div class="propertySearchParent" ref="searchParent">
            <div class="propertySearch">
                <img class="searchImg" src="../../../static/images/search.png" />
                <input class="searchInput" placeholder="请输入城市名" />
            </div>
        </div>

        <div ref="address">
            <ul>
                <li v-for="group in addressList" ref="addressList">
                    <h2 class="addressLetter">{{group.groupName}}</h2>
                    <ul class="addressText" v-for="item in group.groupList" @click="chooceNext(item)">
                        <li class="addressName">{{item.addressName}}</li>
                        <li class="addressDetail">{{item.addressDetail}}</li>
                    </ul>
                </li>
            </ul>
            <div class="letterScroll">
                <ul>
                    <li v-for="(groups, index) in addressList" 
                        class="letterBox"
                        @touchstart="onLetterStart"
                        :data-index="index">{{groups.groupName}}</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>

import ToolBar from '../ToolBar.vue'

export default {
    components: {ToolBar},
    data(){
        return{
            toolBarColor: '#f7f7f7',
            scrollY: 0,
            currentIndex: 0,
            addressList: [
                {
                    groupName: 'A',
                    groupList: [
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街29号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街33号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街22号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街55号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街66号'
                        },
                    ]
                },
                {
                    groupName: 'B',
                    groupList: [
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街29号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街33号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街22号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街55号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街66号'
                        },
                    ]
                },
                {
                    groupName: 'C',
                    groupList: [
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街29号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街33号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街22号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街55号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街66号'
                        },
                    ]
                },
                {
                    groupName: 'D',
                    groupList: [
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街29号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街33号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街22号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街55号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街66号'
                        },
                    ]
                },
                {
                    groupName: 'E',
                    groupList: [
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街29号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街33号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街22号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街55号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街66号'
                        },
                    ]
                },
                {
                    groupName: 'F',
                    groupList: [
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街29号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街33号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街22号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街55号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街66号'
                        },
                    ]
                },
                {
                    groupName: 'G',
                    groupList: [
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街29号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街33号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街22号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街55号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街66号'
                        },
                    ]
                },
                {
                    groupName: 'H',
                    groupList: [
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街29号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街33号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街22号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街55号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街66号'
                        },
                    ]
                },
                {
                    groupName: 'I',
                    groupList: [
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街29号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街33号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街22号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街55号'
                        },
                        {
                            addressName: '顺德金华花园',
                            addressDetail: '顺德大良街道华南路花儿街66号'
                        },
                    ]
                }
            ]
        }
    },
    methods: {
        // 选择小区
        chooceNext: function(item){
            console.log(item)
            let that = this
            sessionStorage.setItem('addressName', item.addressName)
            that.$router.push({path: that.$RM.PropertyOne, query: {address: item.addressName + item.addressDetail}})
        },
        // 计算高度
        calculateHeight: function(){

            let searchParent = this.$refs.searchParent
            let searchHeight = searchParent.clientHeight

            this.listHight = []
            const list = this.$refs.addressList
            let height = searchHeight
            this.listHight.push(height)
            for(let i = 0; i < list.length; i++){
                let item = list[i]
                height += item.clientHeight
                this.listHight.push(height)
            }
        },
        // 指定滚动高度
        onLetterStart: function(e){
            let index = e.target.getAttribute('data-index');
            window.scrollTo(0, this.listHight[index])
        }
    },
    created(){
        setTimeout(() => {
            this.calculateHeight()
        }, 20);
    },
    watch: {

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

.propertySearchParent{
    margin-top: 1.17333rem;
    background: white;
    height: 1rem;
    padding: .2rem .3rem .1rem .3rem;
}

.propertySearch{
    display: flex;
    background: #f5f4fa;
}

.searchImg{
    width: 100%;
    height: .4rem;
    width: .4rem;
    padding: .25rem .3rem;
}

.searchInput{
    border: none;
    padding: .2rem .3rem 0 0;
    color: #cccccc;
    background: #f5f4fa;
}

.propertyAddress{

}

.addressLetter{
    color: #999999;
    background: #f5f4fa;
    height: .8rem;
    font-size: .5rem;
    padding: .2rem 0 0 .3rem;
}

.addressText{
    background: white;
    height: 1.1rem;
    padding: .3rem 0 .2rem .3rem;
    border-bottom: .001rem solid #eeeeee;
}

.addressName{
    color: #333333;
}

.addressDetail{
    color: #999999;
}

.letterScroll{
    position: fixed;
    right: 0;
    top: 20%;
}

.letterBox{
    padding: .05rem;
    color: #3da8f6;
}

</style>
