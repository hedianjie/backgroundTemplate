import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const userJurisdictionList = {
    1: '管理员'
}

export default new Vuex.Store({
    state: {
        menuList: [],       // 导航栏列表
        menuStatusList: {}, // 控制左侧导航栏展开收起状态 false -> 收起 true -> 展开
        menuFlexible: false, // 左侧导航栏展开收起状态 false -> 展开 true -> 收起
        menuSelectList: [], // 左侧导航栏被选中的列表ID [3, 2, 1]

        userName: '何殿杰vip',                                // 用户名称
        userAvatar: '../../../asstes/images/avatar3.png',  // 用户头像连接
        userJurisdiction: 1,                               // 用户权限
        userStatus: 1,                                     // 用户状态 1-》在线 0-》不在线
        userMessageLength: 11,                             // 用户未读消息数量

        routerList: [{url: '/home/index', name: 'HomeIndex', realName: '首页', active: true}], // 被打开的路由 [{url, name, active}]

    },
    mutations: {
        // 更改菜单展开收起状态
        menuStateChange: (state, opt) => Vue.set(state.menuStatusList, opt.id, opt.status),
         // 更改所有菜单展开收起状态
        menuStateChangeAll: (state, status) =>{
            for(let k in state.menuStatusList) {
                Vue.set(state.menuStatusList, k, status);
            }
        },
        menuStatusListChange: (state, ary) => {
            state.menuSelectList = ary;
            ary.forEach(element => {
                Vue.set(state.menuStatusList, element, true)
            });
        },

        userStatusChange: (state, status)  => Vue.set(state, 'userStatus', status),

        /**
         * 添加路由 并且指定路由选中状态
         */
        routerAddRouters: (state, opt) => {
            const {url, name} = opt;
            let flag = false;
            for(var i = 0 ; i < state.routerList.length; i++) {
                // 如果同样的路由 选中当前路由
                if(state.routerList[i].name == name && state.routerList[i].url == url){
                    state.routerList[i].active = true;
                    flag = true;
                }
                // 不是同样路由 取消路由选中
                else {
                    state.routerList[i].active = false;
                }
            }

            // 如果是新路由 添加进来并且选中当前路由
            if(!flag) {
                state.routerList.push( Object.assign({active: true}, opt) );
            }
        },

        /**
         * 删除路由
         */
        routerDelRouters: (state, index) =>  state.routerList.splice(index, 1),

        /**
         * 删除所有路由
         */
        routerDelRoutersAll: state => Vue.set(state, 'routerList', [{url: '/home/index', name: 'HomeIndex', realName: '首页', active: true}]),

        /** 
         * 删除其他 
         */
        routerDelRouterOther: state => {
            for(var i = 0 ; i < state.routerList.length; i++) {
                if(!state.routerList[i].active && state.routerList[i].name != 'HomeIndex') {
                    state.routerList.splice(i, 1);
                    i--;
                }
            }
        }
    },

    getters: {
        getUserJurisdiction(state) {
            return userJurisdictionList[state.userJurisdiction];
        },
    }
})


