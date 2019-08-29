<template>
    <div 
        class="slidebar-warpper"
        :class="{'slidebar-flexible': flexible, 'slidebar-phone': isPhone}"
    >
        <div class="slidebar-toolbar">
            <div class="toolbar-position">{{userJurisdiction}}</div>
            <div class="toolbar-panel">
                <div class="profile-avatar"><img :src="userAvatar" alt=""></div>
                <div class="profile-userInfo">
                    <p class="user-name">Hello,{{userName}}</p>
                    <p class="user-status">
                        <Dropdown trigger="click">
                            <template v-if="userStatus == 1">
                                <span class="status-circle success v-a-m"></span><span class="v-a-m">在线中</span>
                            </template>
                            <template v-if="userStatus == 0">
                                <span class="status-circle warning v-a-m"></span><span class="v-a-m">忙碌中</span>
                            </template>
                            <Icon type="md-arrow-dropdown" />
                            <DropdownMenu slot="list">
                                <DropdownItem :selected="userStatus == 1 ? true : false">
                                    <div @click="userStatusChange(1)"><span class="status-circle success"></span>在线中</div>
                                </DropdownItem>
                                <DropdownItem :selected="userStatus == 0 ? true : false">
                                    <div @click="userStatusChange(0)"><span class="status-circle warning"></span>忙碌中</div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </p>
                </div>
            </div>
        </div>
        <div class="slidebar" ref="slidebar" :style="{marginRight: -1 * slidebarScrollWidth + 'px'}">
            <template v-for="item in menuList">
                <div class="slidebar-hover-box" @mouseenter="showDropMenu($event, item)" @mouseleave="hideDropMenu" :key="item.id">
                    <menu-item :itemOption="item"></menu-item>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import MenuItem from './menu-item.vue'
    import globalBus from './globalBus.js'
    import utils from '../../../assets/js/utils.js'
    

    export default {
        data() {
            return {
                slidebarScrollWidth: 17,
            }
        },
        computed: {
             // 左侧导航栏伸缩状态
            flexible() {
                return this.$store.state.menuFlexible;
            },
            menuList() {
                return this.$store.state.menuList;
            },

            userName() {
                return this.$store.state.userName;
            },
            userAvatar() {
                return this.$store.state.userAvatar;
            },
            userJurisdiction() {
                return this.$store.getters.getUserJurisdiction;
            },
            userStatus() {
                return this.$store.state.userStatus;
            },
            isPhone() {
                return this.$store.state.isPhone;
            }
        },
        methods: {
            /**
             * 在收起导航栏的状态下 下拉列表
             */
            showDropMenu(event, item) {
                // 如果不是收起导航栏状态 不显示
                if(!this.flexible) {
                    return;
                }
                const oDiv = utils.getParentByClassName(event.target, 'slidebar-hover-box');
                const left = 59;
                const top = oDiv.offsetTop;
                globalBus.$emit('on-dropMenu-mouseenter', {
                    left,
                    top,
                    item: [item]
                })
            },

            /**
             * 在收起导航栏的状态下 下拉列表
             */
            hideDropMenu() {
                // 如果不是收起导航栏状态 不显示
                if(!this.flexible) {
                    return;
                }
                globalBus.$emit('on-dropMenu-mouseleave')
            },

            userStatusChange(status) {
                this.$store.commit('userStatusChange', status);
            }
        },
        created(){
            window.setTimeout(() => {
                const result = [
                    {
                        slidebarName: 'first Menu 1',
                        slidebarId: '1',
                        slidebarIcon: 'fa fa-edit',
                        slidebarUrl: '/home/index',
                        children: [
                           {
                                slidebarName: 'second Menu 1',
                                slidebarId: '11',
                                slidebarIcon: 'fa fa-edit',
                                slidebarUrl: '/html/index',
                           }
                        ],
                    },
                    {
                        slidebarName: 'first Menu 2',
                        slidebarId: '2',
                        slidebarIcon: 'fa fa-edit',
                        slidebarUrl: '/home/index',
                        children: [
                           {
                                slidebarName: 'second Menu 2',
                                slidebarId: '22',
                                slidebarIcon: 'fa fa-edit',
                                slidebarUrl: '/html/index',
                           },
                           {
                                slidebarName: 'second Menu 3',
                                slidebarId: '33',
                                slidebarIcon: 'fa fa-edit',
                                slidebarUrl: '/html/index',
                           },
                           {
                                slidebarName: 'second Menu 4',
                                slidebarId: '44',
                                slidebarIcon: 'fa fa-edit',
                                slidebarUrl: '/html/index',
                                children: [
                                    {
                                            slidebarName: 'second Menu 7',
                                            slidebarId: '777',
                                            slidebarIcon: 'fa fa-edit',
                                            slidebarUrl: '/html/index',
                                    }
                                ]
                           },
                           
                        ],
                    },
                    {
                        slidebarName: 'first Menu 3',
                        slidebarId: '3',
                        slidebarIcon: 'fa fa-edit',
                        slidebarUrl: '/home/index',
                    }
                ];

                const {ary, sid} = utils.recursive(result, '22', this.$store);
                this.$store.state.menuList = ary;
                this.$store.commit('menuStatusListChange', sid.reverse());
            }, 1000);
        },

        mounted() {
            
            const windowResize = () => {
                /**
                 * 获取导航栏滚动条的宽度
                 */
                this.slidebarScrollWidth = this.$refs.slidebar.offsetWidth - this.$refs.slidebar.clientWidth;
                /**
                 * 根据页面宽度调节导航栏的展开收起
                 */
                const winWidth = document.documentElement.clientWidth || document.body.clientWidth;

                if(winWidth <= 992) { // 如果小于等于992 收起
                    if(winWidth <= 600) { // 如果小于等于600 手机
                        this.$store.state.menuFlexible = true;
                        this.$store.state.isPhone = true;
                    }
                    else {
                        this.$store.state.menuFlexible = true;
                        this.$store.state.isPhone = false;
                    }
                }
                else { // 如果大于992 展开
                    this.$store.state.menuFlexible = false;
                    this.$store.state.isPhone = false;
                }
            }

            windowResize();
            window.addEventListener('resize', windowResize);
        },

        components: {MenuItem},
    }
</script>
<style scoped>
    .slidebar-warpper{
        position: relative;
        padding-top: 120px;
        overflow: hidden;
        height: 100%;
    }
    .slidebar{
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-right: -17px;
    }
    .slidebar-warpper .slidebar-toolbar{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        color: #f6f6f6;
    }
    
    .slidebar-warpper .slidebar-toolbar .toolbar-panel .profile-avatar,
    .slidebar-warpper .slidebar-toolbar .toolbar-panel .profile-userInfo{
        float: left;
    }
    .slidebar-warpper .slidebar-toolbar .toolbar-panel .profile-avatar{
        height: 45px;
        width: 45px;
        border-radius: 50%;
        overflow: hidden;
    }
    .slidebar-warpper .slidebar-toolbar .toolbar-panel .profile-avatar img{
        width: 100%;
        height: 100%;
        display: inline-block;
    }
    .slidebar-warpper .slidebar-toolbar .toolbar-panel .profile-userInfo{
        font-weight: 600;
        padding: 5px 5px 5px 15px;
        color: #eee;
        font-size: 14px;

    }
    .slidebar-warpper .slidebar-toolbar .toolbar-panel .profile-userInfo .user-name{
        line-height: 1;
        margin-bottom: 9px;
    }
    .slidebar-warpper .slidebar-toolbar .toolbar-panel .profile-userInfo .user-status{
        line-height: 1;
        color: #eee;
        font-weight: 400;
        cursor: pointer;
    }
    .slidebar-warpper .slidebar-toolbar .toolbar-panel .profile-userInfo .user-status .status-circle{
        width: 12px;
        height: 12px;
        display: inline-block;
        margin-right: 6px;
        border-radius: 50%;
    }
    .status-circle.success{
        background: #19be6b;
    }
    .status-circle.warning{
        background: #f90;
    }
    .status-circle.danger{
        background: #ed4014;
    }
    .slidebar-warpper .slidebar-toolbar .toolbar-panel{
        overflow: hidden;
        padding: 10px;
        border-bottom: 1px solid #555;

    }
    .slidebar-warpper .slidebar-toolbar .toolbar-position{
        height: 50px;
        text-align: center;
        font-family: 'Kaushan Script', cursive;
        font-size: 20px;
        line-height: 50px;
        color: #f9f9f9;
        background: #283744;
    }

    /*
     * 左侧导航栏伸缩样式
     */
    .slidebar-warpper.slidebar-flexible .slidebar-toolbar{
        display: none;
    }
    .slidebar-warpper.slidebar-flexible{
        padding-top: 50px;
    }
</style>
