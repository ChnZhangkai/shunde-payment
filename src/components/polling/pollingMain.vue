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

        <div v-if="tabShow">
            <div>
                <ul>
                    <li v-for="(item, index) in pollingList" class="pollingBox">
                        <div class="pollingName">{{item.name}}</div>
                        <div class="pollingAdd">{{item.address}}</div>
                        <div class="pollingBtm">
                            <div class="pollingBtmDate">巡检日期: {{now}}</div>
                            <div class="pollingBtmBtnBox">
                                <button class="pollingBtn" @click="toPolling">去巡检</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div v-else>
            <div>
                <ul>
                    <li v-for="(item, index) in pollingHistroryList" class="pollingBox">
                        <div class="pollingHistoryTop">
                            <div class="pollingHistoryName">{{item.name}}</div>
                            <div class="pollingHistoryType">{{item.type}}</div>
                        </div>
                        <div class="pollingAdd">{{item.address}}</div>
                        <div class="pollingBtm">
                            <div class="pollingBtmDate">巡检日期: {{item.time}}</div>
                            <div class="pollingBtmBtnBox">
                                <button class="pollingBtn" @click="toHistory">查看报告</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            tabShow: true,
            now: '',
            pollingList: [
                {
                    name: '喜洋洋便利店',
                    address: '佛山市顺德区大良镇拥翠十巷171号'
                },
                {
                    name: '加拿大花园',
                    address: '佛山市顺德区大良镇拥翠路十巷171号高桥建材大市场左侧边 正对面'
                }
            ],
            pollingHistroryList: [
                {
                    name: '喜洋洋便利店',
                    address: '佛山市顺德区大良镇拥翠十巷171号',
                    type: '现场巡检',
                    time: '2019-04-10'
                },
                {
                    name: '加拿大花园',
                    address: '佛山市顺德区大良镇拥翠路十巷171号高桥建材大市场左侧边 正对面',
                    type: '电话巡检',
                    time: '2019-04-11'
                }
            ]
        }
    },
    created(){
        let that = this
        var date = new Date()
        that.now = date.getFullYear() + '-' + (parseInt(date.getMonth()) < 10 ? '0'+date.getMonth() : date.getMonth()) + '-' + (parseInt(date.getDay()) < 10 ? '0'+date.getDay() : date.getDay())
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
        toPolling: function(){
            let that = this
            that.$router.push(that.$RM.PollingReport)
        },
        // 查看历史报告
        toHistory: function(){
            let that = this
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

.pollingBox{
    background: white;
    margin: .3rem;
    padding: .3rem;
    border-radius: .1rem;
}

.pollingName{
    font-size: .4rem;
    font-weight: bolder;
    padding-bottom: .2rem;
    border-bottom: .01rem solid #EEEEEE;
}

.pollingAdd{
    height: 1rem;
    padding-top: .2rem;
    color: #999999;
    margin-bottom: .2rem;
}

.pollingBtm{
    display: flex;
}

.pollingBtmDate{
    flex: 1;
    font-weight: bold;
}


.pollingBtmBtnBox{

}

.pollingBtn{
    border: none;
    background: #3DB0FC;
    color: white;
    height: .6rem;
    width: 2rem;
    border-radius: .6rem;
    font-size: .3rem;
}

.pollingHistoryTop{
    padding-bottom: .2rem;
    border-bottom: .01rem solid #EEEEEE;
    display: flex;
}

.pollingHistoryName{
    font-size: .4rem;
    font-weight: bolder;
    flex: 1;
}

.pollingHistoryType{
    color: #3DB0FC;
}

</style>
