<template>
    <div class="page">
        <ToolBar class="fixed" :bgColor="toolBarColor">{{title}}</ToolBar>

        <div class="propertySearchParent" v-show="searchShow">
            <div class="propertySearch">
                <img class="searchImg" src="../../../static/images/search.png" />
                <input class="searchInput" :placeholder="placeHolder" />
            </div>
        </div>

        <div :class="searchShow ? 'propertyChooce' : 'propertyChooceTop'">
            <ul>
                <li class="chooceList" v-for="item in dataList" @click="toTwo(item)">{{item}}</li>
                <li class="chooceList" v-for="item in datasList" @click="toTwo(item)">{{item.charityName}}</li>
            </ul>
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
            title: '选择楼栋',
            chooceType: null,
            placeHolder: '',
            searchShow: true,
            buildList: [
                '1号楼','2号楼','3号楼','4号楼','5号楼','6号楼','7号楼','8号楼','9号楼'
            ],
            elementList: [
                '1单元','2单元','3单元'
            ],
            accountList: [
                '101室','102室','103室','201室','202室','203室','301室','302室','303室'
            ],
            chartyList: [
                {
                    'charityName': '爱心助成才共圆大学梦',
                    'charityUnit': '顺德慈善产业有限公司',
                    'contact': '李娜',
                    'mobile': '13856658998',
                    'description':'每年9月前,针对本市新录取大学生中,家境贫寒学费筹措确有困难的,由基层慈善会推报一些名额,进行一次性资助'
                },
                {
                    'charityName': '爱心助成才共圆大学梦',
                    'charityUnit': '顺德慈善产业有限公司',
                    'contact': '李娜',
                    'mobile': '13856658998',
                    'description':'每年9月前,针对本市新录取大学生中,家境贫寒学费筹措确有困难的,由基层慈善会推报一些名额,进行一次性资助'
                },
                {
                    'charityName': '爱心助成才共圆大学梦',
                    'charityUnit': '顺德慈善产业有限公司',
                    'contact': '李娜',
                    'mobile': '13856658998',
                    'description':'每年9月前,针对本市新录取大学生中,家境贫寒学费筹措确有困难的,由基层慈善会推报一些名额,进行一次性资助'
                },
                {
                    'charityName': '爱心助成才共圆大学梦',
                    'charityUnit': '顺德慈善产业有限公司',
                    'contact': '李娜',
                    'mobile': '13856658998',
                    'description':'每年9月前,针对本市新录取大学生中,家境贫寒学费筹措确有困难的,由基层慈善会推报一些名额,进行一次性资助'
                },
                {
                    'charityName': '爱心助成才共圆大学梦',
                    'charityUnit': '顺德慈善产业有限公司',
                    'contact': '李娜',
                    'mobile': '13856658998',
                    'description':'每年9月前,针对本市新录取大学生中,家境贫寒学费筹措确有困难的,由基层慈善会推报一些名额,进行一次性资助'
                },
            ]
        }
    },
    created(){
        let type = this.$route.query.type
        this.chooceType = type
        if (type == 1) {
            this.dataList = this.buildList
            this.placeHolder = '请输入楼栋'
        } 
        if (type == 2){
            this.title = '选择单元'
            this.dataList = this.elementList
            this.searchShow = false
        } 
        if (type == 3){
            this.title = '选择户号'
            this.dataList = this.accountList
            this.placeHolder = '请输入户号'
        }
        if(type == 4){
            this.title = '选择慈善项目'
            this.datasList = this.chartyList
            this.placeHolder = '请输入慈善项目名称'
        }
    },
    methods: {
        // 跳转缴费项目页面
        toTwo: function(item){
            let that = this
            if(that.chooceType == 4){
                sessionStorage.setItem('charity', JSON.stringify(item))
                that.$router.replace(that.$RM.CharityOne)
            }else{
                sessionStorage.setItem(that.chooceType, item)
                that.$router.replace(that.$RM.PropertyThree)
            }
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

.propertySearchParent{
    margin-top: 1.17333rem;
    background: white;
    height: 1rem;
    padding: .2rem .3rem .1rem .3rem;
    border-bottom: .01rem solid #eeeeee;
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

.propertyChooce{
    background: white;
    font-size: .4rem;
    padding-left: .3rem;
}

.propertyChooceTop{
    margin-top: 1.17333rem;
    background: white;
    font-size: .4rem;
    padding-left: .3rem;
}

.chooceList{
    padding: .35rem 0;
    border-bottom: .01rem solid #eeeeee;
}

</style>
