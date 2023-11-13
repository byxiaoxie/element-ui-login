import Vue from 'vue'
import VueRouter from 'vue-router'

import UserLogin from "@/views/UserLogin.vue";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);

const routes = [
  {
    path: '/',
    name: 'login',
    component: UserLogin
  }
]

const router = new VueRouter({
  routes
})

export default router
