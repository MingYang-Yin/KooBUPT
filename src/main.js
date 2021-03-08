// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  VueResource  from 'vue-resource'
import store from "./store"
import axios from 'axios'
import $ from 'jquery'
import Qs from 'qs'
Vue.prototype.$axios = axios
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 这里就可以进行vue-router的beforeEach拦截了，你也可以放其他地方，我比较喜欢放这
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '';
  //为测试方便设置，需要删除
  localStorage.setItem('userID',"2017211913")
  // 这里先获取下用户信息，我偷懒用sessionStorage存了
  // 里面包含了用户权限，用户各种信息等
  const user = JSON.parse(localStorage.getItem('userID'));
  // 这里必须加上to.path !== 'login'的判断，不然会陷入无限循环，
  // 因为逻辑是第一次进来，判断用户信息不存在，即!user为true，由于使用的是next('/login')而非next()，
  // 会再次进入路由跳转，next()方法没有参数是直接进入页面，不会再次进入路由拦截，有参数则会，因为跳转，
  // 所以再次进入路由，再次判断，再次进入路由，再次判断，循环往复无限循环
  // 所以一定要加to.path !== 'login'的判断
  if (user || to.path === '/login' || to.path === '/1' || to.path === '/login/login_Administrator' || to.path==='/login/0') {
    next();
  }
  else {
    alert("请先登录！")
    next({
      path:'/login'
    });
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})

/*// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });*/
