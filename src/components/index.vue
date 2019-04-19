<template>
    <div class="page">
        <header class="title">缴费</header>
        
        <div class="box">
            <ul class="titleUl">
                <li class="titleLi" v-for="item in menuList">
                    <router-link :to="item.path">
                        <div class="link">
                            <img class="linkImg" :src="item.img">
                            <span class="linkSpan">{{item.name}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            menuList: [
                {
                    'name': '教育缴费',
                    'img': '../../../static/images/educationpayment.png',
                    'path': '/education/RepayMoney'
                },
                {
                    'name': '物业缴费',
                    'img': '../../../static/images/property-payment.png',
                    'path': '/property/propertyOne'
                },
                {
                    'name': '党费缴费',
                    'img': '../../../static/images/party.png',
                    'path': '/partymember/PartyMemberPay'
                },
                {
                    'name': '村居缴费',
                    'img': '../../../static/images/village.png',
                    'path': '/village/VillagePay'
                },
                {
                    'name': '贷款缴费',
                    'img': '../../../static/images/loan.png',
                    'path': '/loan/loanOne'
                },
                {
                    'name': '慈善缴费',
                    'img': '../../../static/images/charity.png',
                    'path': '/charity/charityOne'
                }
            ]
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.page{
    height: 100%;
    background: #f5f4fa;
}

.title{
    height: 1rem;
    background: white;
    text-align: center;
    font-size: .4rem;
    padding-top: .3rem;
}

.box{
    margin: 2rem 0 0 .8rem;
    font-size: .5rem;
}

.titleUl{
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
}

.titleLi{
    display: block;
    width: 50%;
    float: left;
}

.link{
    height: 2rem;
    display: flex;
}

.linkImg{
    height: 1rem;
    padding-top: .2rem;
}

.linkSpan{
    padding: .35rem;
}

</style>


