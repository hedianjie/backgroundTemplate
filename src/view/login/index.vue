<template>
    <div class="login-layout">
        <div class="login-layout-position">
            <div class="login-layout-header">
                <img src="/static/images/login/login-title.png" alt="">
            </div>
            <div class="login-layout-content">
                <div class="side-bg">
                    <img src="/static/images/login/login-left.jpg" alt="">
                </div>
                <div class="main">
                    <h4>用户信息</h4>
                    <form action="javascript:void(0)">
                        <div class="form-group">
                            <Input size="large" prefix="ios-contact-outline" v-model="LoginName" placeholder="用户名"/>
                        </div>
                        <div class="form-group">
                            <Input size="large" prefix="ios-lock-outline" v-model="PassWord" type="password" placeholder="密码"/>
                        </div>
                        <div class="form-group form-button">
                            <Button @click="submit" :loading="loading" shape="circle" type="success" size="large" long>登&nbsp;&nbsp;录</Button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="login-layout-footer">长春市大众物流装配有限责任公司 Application © 2018-2019</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                LoginName: '',
                PassWord: '',
                loading: false,
            }
        },
        methods: {
            submit() {
                
            }
        }
    }
</script>
<style scoped>
    .login-layout{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-height: 650px;
        min-width: 1120px;
        background: url('/static/images/login/login-bg.jpg') no-repeat 100% 100%;
    }
    .login-layout-position{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 1000px;
        height: 500px;
        
    }
    .login-layout-header{
       text-align: center;
       margin-bottom: 25px;
    }
     .login-layout-header img{
         width: auto;
         height: auto;
         display: inline-block;
     }
     .login-layout-footer{
         margin-top: 25px;
         text-align: center;
        color: #ccc;
        font-size: 15px;
     }
    .login-layout-content{
        height: 340px;
        width: 1000px;
        /* position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -500px;
        margin-top: -170px; */
        overflow: hidden;
    }
    .login-layout-content .side-bg,
    .login-layout-content .main{
        width: 50%;
        float: left;
        height: 100%;
    }
    .login-layout-content .side-bg img{
        width: 100%;
        height: 100%;
    }

    .main{
        padding: 40px 74px 0 74px;
        background: #ffffff;
    }
    .main h4{
        font-size: 24px;
        font-weight: 700;
        color: #484848;
        margin-bottom: 30px;
        margin-top: 10px;
    }
    .main .form-group{
        margin-bottom:  25px;
    }


    img{
        width: 100%;
        height: auto;
        display: block;
    }
</style>
