<template>
    <div 
        class="layout"
        :class="flexible ? 'layout-flexible' : ''"    
    >
        <div class="layout-header"><componentHeader name="componentHeader"></componentHeader></div>
        <div class="layout-slidebar"><componentSlidebar name="componentSlidebar"></componentSlidebar></div>
        <div class="layout-containter">
            <div class="tag-nav-warpper"><componentTagNav name="componentTagNav"></componentTagNav></div>
            <router-view></router-view>
            <div class="containter-footer">长春市大众物流装配有限责任公司 Application © 2018-2019</div>
        </div>
        <drop-menu></drop-menu>
    </div>
</template>
<script>
    import componentHeader from './components/header.vue'
    import componentSlidebar from './components/slidebar.vue'
    import componentTagNav from './components/tag-nav.vue'
    import DropMenu from './components/drop-menu.vue'
    export default {
        data() {
            return {
            }
        },
        computed: {
            // 左侧导航栏伸缩状态
            flexible() {
                return this.$store.state.menuFlexible;
            }
        },
        methods: {
        },
        components: {
            componentHeader,
            componentSlidebar,
            componentTagNav,
            DropMenu
            // componentFooter,
        }
    }
</script>
<style scoped>
    .layout{
        width: 100%;
        height: 100%;
        padding-left: 240px;
        padding-top: 50px;
        position: relative;
    }
    .layout-header, .layout-slidebar, .layout-footer{
        top: 0;
        left: 0;
        position: absolute;
        background: #ffffff;
        /* box-shadow: 0 0 6px #ddd; */
    }
    .layout-header{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #eee;
        z-index: 1;
        background: #fff;
        padding-left: 240px;
    }
    .layout-slidebar{
        width: 240px;
        height: 100%;
        z-index: 2;
        border-right: 1px solid #ddd;
        background: #39435C;
    }
    .layout-containter{
        position: relative;
        width: 100%;
        height: 100%;
        padding: 48px 10px 60px 10px;
    }
    .tag-nav-warpper{
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #eee;
        background: #fff;
    }
    .containter-footer{
        left: 0;
        bottom: 0;
        position: absolute;
        width: 100%;
        background: #ffffff;
        border-top: 1px solid #eee;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    /*
     * 左侧导航栏伸缩样式
     */
     .layout.layout-flexible{
         padding-left: 60px;
     }
     .layout.layout-flexible .layout-slidebar{
         width: 60px;
     }
     .layout.layout-flexible .layout-header{
         padding-left: 60px;
     }
     
</style>
