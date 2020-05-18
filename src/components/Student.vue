<template>
  <div class="course-plan">
      <div class="operation-container">
        <el-button type="primary" @click="add">新增</el-button>
      </div>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        >
        <el-table-column
          prop="name"
          label="名字"
          width="120">
        </el-table-column>
        <el-table-column
          prop="studentID"
          label="学号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="college"
          label="学院"
          width="120">
        </el-table-column>
        <el-table-column
          prop="class"
          label="班级"
          width="120">
        </el-table-column>
        <el-table-column
          prop="major"
          label="专业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="电话号码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mailBox"
          label="邮箱"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteStudent(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { studentApi } from '@/api'
export default {
    name: 'Student',
    created () {
      this.getStudentsMessage();
    },
    data () {
      return {
        tableData: []
      }
    },
    methods: {
      add () {
        this.$router.push('/main/addStudent')
      },
      modify(row) {
        // this.$router.push(`/main/modifyCoursePlan/${row.major}/${row.courseList}`)
      },
      async deleteStudent (row) {
        let res = await this.$axios.post('/api'+ studentApi.deleteStudent, {
              studentId: row._id
            });
            let {code, msg} = res.data;
            if(code === '0000') {
              this.$toast({text: msg, type: 'success'});
              this.getStudentsMessage();
            }
      },
      async getStudentsMessage () {
        let res = await this.$axios.get('/api'+ studentApi.getStudentsMessage)
        let { code, msg, data } = res.data;
        if(code === '0000') {
          this.tableData = data
        }  
      }
    },
    watch: {
      '$route' (to, from) {
        if(from.path.indexOf('addStudent') !== 0) {
          this.getStudentsMessage();
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