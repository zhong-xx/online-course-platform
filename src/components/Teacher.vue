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
          width="230">
        </el-table-column>
        <el-table-column
          prop="teacherID"
          label="教师号"
          width="230">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="230">
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="电话号码"
          width="230">
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
            <el-button @click="deleteTeacher(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { teacherApi } from '@/api'
export default {
    name: 'Teacher',
    created () {
      this.getTeachersMessage();
    },
    data () {
      return {
        tableData: []
      }
    },
    methods: {
      add () {
        this.$router.push('/main/addTeacher')
      },
      modify(row) {
        this.$router.push(`/main/modifyTeacher/${row._id}`)
      },
      async deleteTeacher (row) {
        let res = await this.$axios.post('/api'+ teacherApi.deleteTeacher, {
              teacherId: row._id
            });
            let {code, msg} = res.data;
            if(code === '0000') {
              this.$toast({text: msg, type: 'success'});
              this.getTeachersMessage();
            }
      },
      async getTeachersMessage () {
        let res = await this.$axios.get('/api'+ teacherApi.getTeachersMessage)
        let { code, msg, data } = res.data;
        if(code === '0000') {
          this.tableData = data
        }  
      }
    },
    watch: {
      '$route' (to, from) {
        if(from.path.indexOf('addTeacher') !== 0 || from.path.indexOf('modifyTeacher') !== 0 ) {
          this.getTeachersMessage();
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