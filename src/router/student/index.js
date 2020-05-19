export default {
    path: '/studentMain',
    component: () => import('@/views/Main.vue'),
    children: [
        {
            path: 'myCourse',
            components:{
                myCourse: () => import('@/components/Course.vue')
            } 
        },
        {
            path: 'selectCourse',
            components:{
                selectCourse: () => import('@/components/Course.vue')
            } 
        },
        {
            path: 'myGrade',
            component: () => import('@/components/MyGrade.vue')
        },
        {
            path: '/',
            redirect: '/studentMain/myCourse',
        }
    ]
}