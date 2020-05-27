<template>
  <div class="course-plan">
      <slot name="func"></slot>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        >
        <el-table-column
          prop="name"
          label="课程名"
          width="115">
        </el-table-column>
        <el-table-column
          prop="type"
          label="课程类型"
          width="115">
        </el-table-column>
        <el-table-column
          prop="place"
          label="课程地点"
          width="115">
        </el-table-column>
        <el-table-column
          prop="credit"
          label="学分"
          width="115">
        </el-table-column>
        <el-table-column
          prop="begin_week"
          label="开始周"
          width="115">
        </el-table-column>
        <el-table-column
          prop="end_week"
          label="结束周"
          width="115">
        </el-table-column>
        <el-table-column
          prop="book"
          label="书籍"
          width="115">
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="教师"
          width="115">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="总数量"
          width="115">
        </el-table-column>
        <el-table-column
          prop="selected_quantity"
          label="已选数量"
          show-overflow-tooltip>
        </el-table-column>

        <slot></slot>

      </el-table>
  </div>
</template>

<script>
import { courseApi, studentCourseApi } from '@/api'
export default {
    name: 'Teacher',
    created () {
      this.getCoursesMessage();
    },
    data () {
      return {
        tableData: []
      }
    },
    methods: {
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
              this.getCoursesMessage();
            }
      },
      async getCoursesMessage () {
        if(this.$route.path.indexOf('myCourse') !== -1) {
          let res = await this.$axios.get('/api'+ studentCourseApi.getStudentCourse, {
            params: {
              id: localStorage.getItem('id')
            }
          })
          let {code, msg, data} = res.data;
          if(code === '0000') {
            this.tableData = data;
          }
          return;
        }
        let res = await this.$axios.get('/api'+ courseApi.getCoursesMessage)
        let { code, msg, data } = res.data;
        if(code === '0000') {
          this.tableData = data
        }  
      }
    },
    watch: {
      '$route' (to, from) {
        if(from.path.indexOf('addCourse') !== 0 || from.path.indexOf('modifyCourse') !== 0 ) {
          this.getCoursesMessage();
        }
      }
    }
}
</script>

<style lang='less' scoped>
.course-plan {
  margin: 20px;
  background: white;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  
  .block {
    align-self: flex-end;
    margin-right: 50px;
  }
}
</style>