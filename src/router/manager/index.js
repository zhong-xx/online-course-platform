export default {
    path: '/main',
    component: () => import('@/views/Main.vue'),
    children: [     
        {
            path: 'student',
            component: () => import('@/components/Student.vue')
        },
        {
            path: 'addStudent',
            components: {
                default: () => import('@/components/Student.vue'),
                addStudent: () => import('@/components/HandleStudent.vue')
            }
        },
        {
            path: 'modifyStudent/:id',
            components: {
                default: () => import('@/components/Student.vue'),
                modifyStudent: () => import('@/components/HandleStudent.vue')
            },
            props: {
                modifyStudent: true
            }
        },

        {
            path: 'teacher',
            component: () => import('@/components/Teacher.vue')
        },
        {
            path: 'addTeacher',
            components: {
                default: () => import('@/components/Teacher.vue'),
                addTeacher: () => import('@/components/HandleTeacher.vue')
            }
        },
        {
            path: 'modifyTeacher/:id',
            components: {
                default: () => import('@/components/Teacher.vue'),
                modifyTeacher: () => import('@/components/HandleTeacher.vue')
            },
            props: {
                modifyTeacher: true
            }
        },

        {
            path: 'course',
            components:{
                course: () => import('@/components/Course.vue')
            } 
        },
        {
            path: 'addCourse',
            components: {
                course: () => import('@/components/Course.vue'),
                addCourse: () => import('@/components/HandleCourse.vue')
            }
        },
        {
            path: 'modifyCourse/:id',
            components: {
                course: () => import('@/components/Course.vue'),
                modifyCourse: () => import('@/components/HandleCourse.vue')
            },
            props: {
                modifyCourse: true
            }
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
            redirect: '/main/student',
        }
    ]
}