export default {
    path: '/teacherMain',
    component: () => import('@/views/Main.vue'),
    beforEnter: (to, from, next) => {
        if(localStorage.getItem('type') === 'teacher') {
            next();
        }else {
            next('/')
        }
    },
    children: [
        {
            path: 'messageT/:type',
            component: () => import('@/components/MessageT.vue'),
            props: true
        },
        {
            path: '/',
            redirect: '/teacherMain/messageT/studentGrade',
        }
    ]
}