import Vue from 'vue'
import VueRouter from 'vue-router'
import managerRouter from './manager'
import studentRouter from './student'
import teacherRouter from './teacher'

Vue.use(VueRouter)

const routes = [
  managerRouter,
  studentRouter,
  teacherRouter,
  {
    path: '/',
    component: ()=> import('@/views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if(to.path === '/') {
        switch (localStorage.getItem('type')) {
          case 'student':
            next('/studentMain/myCourse');
            break;
          case 'teacher':
            next('/teacherMain/messageT/studentGrade');
            break;
          case 'manager':
            next('/main/student');
            break;
          default:
            next();
        }
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
