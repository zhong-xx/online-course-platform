export default {
    path: '/studentMain',
    component: () => import('@/views/Main.vue'),
    beforEnter: (to, from, next) => {
        if(localStorage.getItem('type') === 'student') {
            console.log('ldfj')
            next();
        }else {
            next('/')
        }
    },
    children: [
        {
            path: 'message/:type',
            component: () => import('@/components/Message.vue'),
            props: true
        },
        {
            path: 'myGrade',
            component: () => import('@/components/MyGrade.vue')
        },
        {
            path: '/',
            redirect: '/studentMain/message/myCourse',
        }
    ]
}