export default {
    path: '/main',
    component: () => import('@/views/Main.vue'),
    beforEnter: (to, from, next) => {
        if(localStorage.getItem('type') === 'manager') {
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
            path: 'studentFunc/:type/:id?',
            component: () => import('@/components/user/StudentFunc.vue'),
            props: true
        },
        {
            path: 'teacherFunc/:type/:id?',
            component: () => import('@/components/user/TeacherFunc.vue'),
            props: true
        },
        {
            path: 'courseFunc/:type/:id?',
            component: () => import('@/components/course/CourseFunc.vue'),
            props: true
        },

        {
            path: 'student',
            component: () => import('@/components/Student.vue')
        },
        {
            path: 'addStudent',
            component: () => import('@/components/HandleStudent.vue')
        },
        {
            path: 'modifyStudent',
            component: () => import('@/components/HandleStudent.vue')
        },
        {
            path: 'coursePlan',
            component: () => import('@/components/CoursePlan.vue')
        },
        {
            path: 'addCoursePlan',
            components: {
                default: () => import('@/components/CoursePlan.vue'),
                addCoursePlan: () => import('@/components/OperationPlan.vue')
            }
        },
        {
            path: 'modifyCoursePlan/:major/:courseList',
            components: {
                default: () => import('@/components/CoursePlan.vue'),
                modifyCoursePlan: () => import('@/components/OperationPlan.vue')
            },
            props: {
                modifyCoursePlan: true
            }
        },
        {
            path: '/',
            redirect: '/main/message/user',
        }
    ]
}