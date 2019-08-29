<template>
    <div 
        class="layout"
        :class="{'layout-flexible': flexible, 'layout-phone': isPhone}"    
    >
        <div class="layout-header"><componentHeader name="componentHeader"></componentHeader></div>
        <div class="layout-slidebar"><componentSlidebar name="componentSlidebar"></componentSlidebar></div>
        <div class="layout-containter">
            <div class="tag-nav-warpper"><componentTagNav name="componentTagNav"></componentTagNav></div>
            <div class="layout-content-main">
                <router-view></router-view>
            </div>
            <div class="containter-footer">长春市大众物流装配有限责任公司 Application © 2018-2019</div>
        </div>
        <drop-menu></drop-menu>

        <div 
            v-if="isPhone"
            class="phone-opacity"
            :class="{'show-phone-opacity': flexible}"
            @click="flexibleSlidebar"
        ></div>
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
            },
            // 是否是手机
            isPhone() {
                return this.$store.state.isPhone;
            }
        },
        methods: {
            /**
             * 改变导航栏展开收起
             */
            flexibleSlidebar() {
                // 在store中记录当前展开收起状态
                this.$store.state.menuFlexible = !this.flexible;
            },
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
