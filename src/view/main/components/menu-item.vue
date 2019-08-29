<template>
    <div
        class="slidebar-list-warpper"
        :class="theme"
    > 
        <div class="slidebar-list">
            <!-- 如果是父级 -->
            <div 
                v-if="itemOption.children && itemOption.children.length" 
                class="slidebar-content"
                :style="{paddingLeft: zIndex * 20 + 10 + 'px'}"
                @click="dropDown"
            >
                <span class="inner-icon">
                    <Icon type="ios-arrow-forward" size="16"></Icon>
                </span>
                <span class="inner-text">【{{itemOption.id}}】这是标题</span>
                <div class="down-icon" 
                    :class="isDroup ? 'down' : ''"
                >
                    <Icon type="ios-arrow-forward" size="16"></Icon>
                </div>
            </div>
            <!-- 如果是单级 -->
            <div 
                v-else
                class="slidebar-content"
                :class="menuSelectList.indexOf(itemOption.id) !== -1 ? 'active' : ''"
                :style="{paddingLeft: zIndex * 20 + 10 + 'px'}"
            >
                <template v-if="isFlexible && flexible">
                    <span class="inner-icon">
                        <Icon type="ios-arrow-forward" size="16"></Icon>
                    </span>
                    <span class="inner-text">【{{itemOption.id}}】这是标题</span>
                </template>

                <router-link v-else :to="{path: itemOption.url}">
                    <span class="inner-icon">
                        <Icon type="ios-arrow-forward" size="16"></Icon>
                    </span>
                    <span class="inner-text">【{{itemOption.id}}】这是标题</span>
                </router-link>
            </div>
            <div 
                class="slidebar-children-warpper" 
                v-if="itemOption.children && itemOption.children.length"
                v-show="isDroup"
            >
                <template v-for="item in itemOption.children">
                    <menu-item :itemOption="item" :key="item.id" :theme="theme" :isFlexible="isFlexible" :zIndex="zIndex + 1"></menu-item>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'MenuItem',
        props: {
            itemOption: {
                type: Object,
                default() {
                    return {};
                }   
            },
            // 主题颜色（primary）
            theme: {
                type: String,
                default() {
                    return 'primary';
                }   
            },
            // 是否需要检测flexible（伸缩导航栏）
            isFlexible: {
                type: Boolean,
                default() {
                    return true;
                }   
            },
            zIndex: {
                type: Number,
                default() {
                    return 0;
                }
            }
        },
        computed: {
            menuSelectList() {
                return this.$store.state.menuSelectList;
            },
            // true 展开 false 收起
            isDroup() {
                // 如果是收起导航栏 -》 禁止打开选中的导航栏
                if(this.isFlexible && this.flexible) return false;
                return this.$store.state.menuStatusList[this.itemOption.id];
            },

            // 左侧导航栏伸缩状态
            flexible() {
                return this.$store.state.menuFlexible;
            },

            isPhone() {
                return this.$store.state.isPhone
            }
        },

        data() {
            return {}
        },
        methods: {
            dropDown() {

                console.log(this.flexible)
                if(this.isFlexible && this.flexible) { return; }

                

                const id = this.itemOption.id;
                this.$store.commit('menuStateChange', {id, status: !this.$store.state.menuStatusList[id]});
            },
        },
       
    }
</script>

<style scoped>
    .slidebar-content{
        position: relative;
        padding: 0 10px;
        font-size: 14px;
        line-height: 46px;
        user-select: none; 
        cursor: pointer;
        transition: all .15s linear;
    }

    .slidebar-content .inner-icon{
        margin-right: 5px;
        display: inline-block;
    }
    .slidebar-content .down-icon{
        float: right;
        cursor: pointer;
    }
    .slidebar-content .down-icon .ivu-icon{
        transition: all .15s linear;
    }
    .slidebar-content .down-icon.down .ivu-icon{
        transform: rotate(90deg);
    }
    
    /* .slidebar-children-warpper .slidebar-list-warpper .slidebar-content,
    .slidebar-children-warpper .slidebar-list-warpper .slidebar-children-warpper
    {
        padding-left: 25px;
    } */

    /*
     * 左侧导航栏伸缩样式
     */
    .slidebar-warpper.slidebar-flexible .slidebar-list .inner-text,
    .slidebar-warpper.slidebar-flexible .slidebar-list .down-icon{
        display: none;
    }
    .slidebar-warpper.slidebar-flexible .slidebar-list .inner-icon{
        width: 100%;
        text-align: center;
        margin-right: 0;
    }
    /** 手机 **/
    .slidebar-warpper.slidebar-phone .slidebar-list .inner-text,
    .slidebar-warpper.slidebar-phone .slidebar-list .down-icon{
        display: inline-block;
    }
    .slidebar-warpper.slidebar-phone .slidebar-list .inner-icon{
        width: auto;
        text-align: inherit;
        margin-right: 5px;
    }

    /**
     * 主题颜色
     */

     /** primary **/
    .slidebar-list-warpper.primary{
        background: #39435C;
    }
    .slidebar-list-warpper.primary .slidebar-content{
        color: #ccc;
        background: #39435C;
    }
    .slidebar-list-warpper.primary .slidebar-content a{
        color: #ccc;
    }
    .slidebar-list-warpper.primary .slidebar-children-warpper .slidebar-list-warpper,
    .slidebar-list-warpper.primary .slidebar-children-warpper .slidebar-content{
        background: #425164;
    }
    .slidebar-list-warpper.primary .slidebar-content:hover,
    .slidebar-list-warpper.primary .slidebar-content a:hover
    {
        color: #fff;
    }
    .slidebar-list-warpper.primary .slidebar-content.active,
    .slidebar-list-warpper.primary .slidebar-content.active a
    {
        color: #fff;
        background: #2d8cf0!important;
    }

    /** white **/
    .slidebar-list-warpper.white{
        background: #fff;
    }
    .slidebar-list-warpper.white .slidebar-content{
        background: #fff;
        color: #212121;
    }
    .slidebar-list-warpper.white .slidebar-content a{
        color: #212121;
    }
    .slidebar-list-warpper.white .slidebar-children-warpper .slidebar-list-warpper,
    .slidebar-list-warpper.white .slidebar-children-warpper .slidebar-content{
        background: #fff;
    }
    .slidebar-list-warpper.white .slidebar-content.active,
    .slidebar-list-warpper.white .slidebar-content:hover{
        background: #CFD8DC !important;
    }
</style>
