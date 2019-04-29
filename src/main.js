// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/global.css'
import '../static/css/my_style.css'
import 'element-ui/lib/theme-chalk/display.css';

// 富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import adminApi from './util/common.js';
//定义全局变量
Vue.prototype.adminApi = adminApi;



import axios from 'axios';
// 请求基准路径
axios.defaults.baseURL = 'https://hqrw.xiaocx.org/Admin';

// 请求拦截（配置发送请求的信息）-------------------
axios.interceptors.request.use(function (config) {
  // 处理请求之前的配置
  const token = sessionStorage.getItem('access-token');

  var is_login = config.url.indexOf('login') == -1 ? false : true;

  if (!is_login) {
    if (config.method == 'post') {
      config.data.token = token;
    }
    if (config.method == 'get') {
      config.params.token = token;
    }
  }
  return config;

}, function (error) {
  // 请求失败的处理
  return Promise.reject(error);
});

// 响应拦截（配置请求回来的信息）-------------------
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  // 处理响应失败
  return Promise.reject(error.response.data);
});
Vue.prototype.axios = axios;




// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/Login') return next()
  // 获取token
  const token = sessionStorage.getItem('access-token')
  // 判断token的状态,取反则没有token，让用户去登录
  if (!token) return next('/Login')
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
