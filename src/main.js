import Vue from 'vue'
import App from '@/App.vue'
import axios from 'axios'
import 'iview/dist/styles/iview.css'

import {
  Input,
  Button,
  Table,
  Radio,
  Checkbox,
  Switch,
  Select,
  DatePicker,
  Modal,
  Message,
  Tooltip,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Badge
} from 'iview'

import router from '@/router/index.js'
import store from '@/store/index.js'

import main from '@/view/main/index.vue'

Vue.component('Input', Input);
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Radio', Radio);
Vue.component('Checkbox', Checkbox);
Vue.component('Switch', Switch);
Vue.component('Select', Select);
Vue.component('DatePicker', DatePicker);
Vue.component('Modal', Modal);
Vue.component('Tooltip', Tooltip);
Vue.component('Icon', Icon);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Badge', Badge);


Message.config({
  top: 50,
  duration: 2
})
Vue.prototype.$Message = Message;
// Vue.component('Footer', Footer);

// Vue.component('Content', Content);
// Vue.component('Layout', Layout);


/**
 * 请求拦截
 */
axios.interceptors.request.use(

  // 发送请求成功
  config => {
    console.log(config);
    return config;
  },

  // 发送请求失败
  err => Promise.reject(err)

)

/**
 * 响应拦截
 */
axios.interceptors.response.use(

  // 接收响应成功
  result => {
    console.log(result);
    return result;
  },

  // 接收响应失败
  err => Promise.reject(err)

)


/**
 * 路由拦截
 */

router.beforeEach((to, from, next) => {
  if(
    to.name &&
    // to.name != 'HomeIndex' && // 不是首页
    to.name != 'Login' &&     // 不是登录页
    to.name != '404' &&       // 不是404页
    to.name != 'About'        // 不是关于我们页
  ) {
    store.commit('routerAddRouters', {
      url: to.path,
      name: to.name,
      realName: to.meta.realName
    });
  }
  next();
   // to and from are both route objects. must call `next`.
 });

 // 在slidebar中 模拟请求 根据用户的id 请求可用的菜单
 window.setTimeout(() => {
  router.addRoutes([
    {
      path: '/home',
      redirect: '/home/index', // 如果是 /home 重定向到 /home/index
      name: 'Home',
      component: main,
      children: [
          {
              path: '/home/index',
              name: 'HomeIndex',
              component: () => import('@/view/home/index.vue'),
              meta: {
                  requireAuth: true, // 是否需要权限验证
                  realName: '首页'
              }
          }
      ]
    },
    {
      path: '/persional',
      redirect: '/persional/index', // 如果是 /home 重定向到 /home/index
      name: 'Persional',
      component: main,
      children: [
          {
              path: '/persional/index',
              name: 'PersionalIndex',
              component: () => import('@/view/persional/index.vue'),
              meta: {
                  requireAuth: true, // 是否需要权限验证
                  realName: '个人信息'
              }
          }
      ]
    },
    { path: '/', redirect: '/home/index'}, // 路由'/'跳回到首页
    { path: '*', redirect: '/404/index'}
  ])
 },1000)




Vue.prototype.request = axios;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
