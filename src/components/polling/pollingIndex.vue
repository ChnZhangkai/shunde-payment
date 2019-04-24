<template>
    <div class="page">
        <header class="title">用户登录</header>

        <div class="login">
            <mt-field class="text btm" label="账号" placeholder="请输入账号" v-model="username"></mt-field>
            <p class="btm"></p>
            <mt-field class="text" label="密码" type="password" placeholder="请输入密码" v-model="password"></mt-field>
        </div>

        <div class="next">
            <button class="nextBtn" @click="doLogin">登录</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            username: '',
            password: ''
        }
    },
    created(){

    },
    methods:{
        doLogin: function(){
            let that = this
            that.$router.push(that.$RM.PollingMain)
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
    font-size: .4rem;
    padding-top: .35rem;
}

.login{
    margin-top: .3rem;
    padding: 0 .3rem;
    background: white;
}

.text{
    background: white;
    height: 1.35rem;
}

.btm{
    border-bottom: .01rem solid #EEEEEE;
}

.next{
    text-align: center;
    margin-top: .8rem;
}

.nextBtn{
    width: 94%;
    height: 1.07rem;
    background: #3DB0FC;
    border: none;
    border-radius: .1rem;
    color: white;
}

</style>
