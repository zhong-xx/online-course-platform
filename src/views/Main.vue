<template>
  <div class="main-container">
      <header>
          <h1>网上选课系统</h1>
          <button @click="quit">退出</button>
      </header>
      <div class="container">
          <div class="aside">
              <Aside></Aside>
          </div>
          <div class="main">
              <router-view></router-view>

              <router-view name="course" ref="course">

                  <template v-slot:func>
                      <div class="operation-container">
                          <el-button type="primary" @click="add">新增</el-button>
                       </div>
                  </template>
                  
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="deleteCourse(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
              </router-view>

              <router-view name="selectCourse">
                  <template v-slot:func>
                      <div>根据你的专业，推荐的课程有：<span class="major">{{majorPlan}}</span></div>
                  </template>

                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button @click="addToMyCourse(scope.row)" type="text" size="small">添加</el-button>
                    </template>
                  </el-table-column>
              </router-view>

              <router-view name="myCourse" ref="myCourse">
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button @click="deleteMyCourse(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
              </router-view>
          </div>
      </div>
      <router-view name="addStudent">
          学生注册
      </router-view>
      <router-view name="modifyStudent">
          修改学生信息
      </router-view>

      <router-view name="addTeacher">
          教师注册
      </router-view>
      <router-view name="modifyTeacher">
          修改教师信息
      </router-view>

      <router-view name="addCourse">
          课程注册
      </router-view>
      <router-view name="modifyCourse">
          修改课程信息
      </router-view>

      <router-view name="addCoursePlan">
          新增选课方案
      </router-view>
      <router-view name="modifyCoursePlan">
          修改选课方案
      </router-view>
  </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
import { courseApi, studentCourseApi, planApi } from '@/api'
export default {
    name: 'Main',
    components: {
        Aside
    },
    created () {
        this.getMajorPlan();
    },
    data () {
        return {
            majorPlan: ''
        }
    },
    methods: {
        quit () {
            localStorage.clear();
            this.$router.push('/');
        },
        add () {
            this.$router.push('/main/addCourse')
        },
        modify(row) {
            this.$router.push(`/main/modifyCourse/${row._id}`)
        },
        async deleteCourse (row) {
            let res = await this.$axios.post('/api'+ courseApi.deleteCourse, {
                courseId: row._id
            });
            let {code, msg} = res.data;
            if(code === '0000') {
                this.$toast({text: msg, type: 'success'});
                this.$refs.course.getCoursesMessage();
            }
        },
        async addToMyCourse (row) {
            let res = await this.$axios.post('/api'+ studentCourseApi.addStudentCourse, {
                id: localStorage.getItem('id'),
                courseId: row._id
            })
            let {code, msg} = res.data;
            if(code !== '0000') {
              this.$toast({text: msg, type: 'danger'})
              return
            }
            this.$toast({text: msg, type: 'success'})
        },
        async deleteMyCourse (row) {
            let res = await this.$axios.post('/api'+ studentCourseApi.deleteStudentCourse, {
                id: localStorage.getItem('id'),
                courseId: row._id
            })
            let { code, msg } = res.data;
            if(code === '0000') {
              this.$toast({text: msg, type: 'success'})
              this.$refs.myCourse.getCoursesMessage();
            }
        },
        async getMajorPlan () {
            let res = await this.$axios.get('/api'+ planApi.getMajorPlan, {
                params: {
                    id: localStorage.getItem('id')
                }
            })
            let {code, msg, data} = res.data;
            if(code === '0000') {
                this.majorPlan = data;
            }
        }
    },
    watch: {
        "$route" (to, from) {
            if(['/studentMain/myCourse', '/studentMain/selectCourse'].includes(to.path)) {
                this.$router.go(0);
            }
        }
    }
}
</script>

<style lang='less' scoped>
.main-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    header {
        height: 50px;
        background: #1d2027;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            line-height: 50px;
            margin-left: 20px;
        }

        button {
            margin-right: 20px;
            width: 50px;
            height: 32px;
            border-radius: 5px;
            border: none;

            &:hover {
                color: blue;
            }
        }
    }

    .container {
        flex: 1;
        display: flex;

        .aside {
            width: 150px;
        }

        .main {
            flex: 1;
            background: #f2f6fa;

            .major {
                color: rgb(30, 27, 219);
            }
        }
    }
}
</style>