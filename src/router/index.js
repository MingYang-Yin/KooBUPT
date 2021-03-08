import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
// eslint-disable-next-line camelcase
import menu from '../components/menu'
import unfinish from '../components/unfinish'
import finish from '../components/finish'
import campusChoice from '../components/campusChoice'
import changeInformation from '../components/changeInformation'
import login from '../components/login'
import login_user from '../components/login_user'
import login_Administrator from '../components/login_Administrator'
import timeset from '../components/timeset'
import classset from '../components/classset'
import menu_Administrator from '../components/menu_Administrator'
import administratorInfo from '../components/administratorInfo'
import roomManage from '../components/roomManage'
import checkAppointment from '../components/checkAppointment'
import importTeacher from '../components/importTeacher'

Vue.use(Router)
const router = new Router();
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      children: [
        {
          path: '',
          component: login_user
        },
        {
          path: 'login_Administrator',
          component: login_Administrator
        }
      ]
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu,
      children: [
        {
          path: '',
          component: unfinish
        },
        {
          path: 'finish',
          component: finish
        },
        {
          path: 'campusChoice',
          component: campusChoice
        },
        {
          path: 'changeInformation',
          component: changeInformation
        },
        {
          path: 'classset',
          component: classset
        },
        {
          path: 'timeset',
          component: timeset
        },
        {
          path: 'roomManage',
          component: roomManage
        },
        {
          path: 'checkAppointment',
          component: checkAppointment
        },
        {
          path: 'importTeacher',
          component: importTeacher
        }
      ]
    },
    {
      path: '/menu_Administrator',
      name: 'menu_Administrator',
      component: menu_Administrator,
      children: [
        {
          path: 'administratorInfo',
          component: administratorInfo,
        }
      ]
    }
  ]
});

