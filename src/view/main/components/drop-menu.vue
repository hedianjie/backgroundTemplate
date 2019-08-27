<template>
    <div
        class="drop-menu-warpper"
        :style="{top: top + 'px', left: left + 'px', display: show ? 'block' : 'none'}"
        @mouseenter="selfEnter"
        @mouseleave="selfLeave"
    >
        <template v-for="item in menuList">
            <menu-item :itemOption="item" :key="item.key" theme="white" :isFlexible="false"></menu-item>
        </template>
    </div>
</template>
<script>
    import globalBus from './globalBus.js'
    import MenuItem from './menu-item.vue'
    export default {
        data() {
            return {
                top: 0,
                left: 0,
                selfMouseEvent: false,
                show: false,
                menuList: [],
            }
        },
        created() {
            // 监听dropMenu鼠标滑过
            globalBus.$on('on-dropMenu-mouseenter', opt => {
                window.setTimeout(() => {
                    this.enter(opt);
                },100)
            });
            // 监听dropMenu鼠标滑出
            globalBus.$on('on-dropMenu-mouseleave', opt => {
                window.setTimeout(() => {
                    this.leave();
                },100)
            });
        },
        methods: {
            enter(opt) {
                this.menuList = opt.item;
                this.top = opt.top;
                this.left = opt.left;
                this.show = true;
            },
            leave() {
                this.selfMouseEvent ? null : this.show = false;
            },
            selfEnter() {
                this.selfMouseEvent = true;
            },
            selfLeave() {
                this.selfMouseEvent = false;
                globalBus.$emit('on-dropMenu-mouseleave');
            }
        },

        components: { MenuItem }
    }
</script>
<style scoped>
    .drop-menu-warpper{
        position: absolute;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 0 4px 4px 0;
        width: 200px;
    }
</style>