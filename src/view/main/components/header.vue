<template>
    <div class="header-warpper">
        <div 
            class="sidebar-toggle pull-left"
            @click="flexibleSlidebar"
            :class="flexible ? 'flexible' : ''"
        >
            <Tooltip 
                :content="flexible ? '展开菜单' : '收起菜单'"
                placement="bottom-start"
            >
                <Icon type="md-menu" size="26"/>
            </Tooltip>
        </div>

        <div class="navbar-right pull-right">
            <div class="pull-left dropdown-warpper">
                <Dropdown trigger="click">
                    <div class="dropdown-toggle">
                         <Badge :count="userMessageLength">
                            <Icon type="md-mail" size="24"/>
                        </Badge>
                    </div>
                    <DropdownMenu slot="list">
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="pull-left dropdown-warpper">
                <Dropdown trigger="click">
                    <div class="dropdown-toggle ">
                        <Icon type="ios-person" size="24"/> {{userName}} <Icon type="md-arrow-dropdown" size="18"/>
                    </div>
                    <DropdownMenu slot="list">
                        <DropdownItem>
                            <div class="dropdown-list"><Icon type="ios-contact-outline" size="15"/> 个人信息</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div class="dropdown-list"><Icon type="ios-log-out" size="15"/> 退出登录</div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div class="clear-both"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        computed:{
            // 左侧导航栏伸缩状态
            flexible() {
                return this.$store.state.menuFlexible;
            },
            userName() {
                return this.$store.state.userName;
            },
            userMessageLength() {
                return this.$store.state.userMessageLength;
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
        }
    }
</script>
<style scoped>
    .header-warpper{
        line-height: 50px;
    }
    .sidebar-toggle{
        margin-left: 10px;
        cursor: pointer;
    }
    .sidebar-toggle .ivu-icon{
        transition: all .15s linear;
    }
    .sidebar-toggle.flexible .ivu-icon{
        transform: rotate(90deg);
    }
   
    .dropdown-toggle{
        padding: 0 15px;
        line-height: 1;
        cursor: pointer;
    }
    .dropdown-warpper:hover{
        background: #283744;
        color: #f6f6f6 !important;
    }
</style>