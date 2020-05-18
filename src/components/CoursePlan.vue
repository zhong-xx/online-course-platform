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
          prop="major"
          label="专业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="courseList"
          label="课程"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deletePlan(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { planApi } from '@/api'
export default {
    name: 'CoursePlan',
    created () {
      this.getPlanMessage();
    },
    data () {
      return {
        tableData: []
      }
    },
    methods: {
      add () {
        this.$router.push('/main/addCoursePlan')
      },
      modify(row) {
        this.$router.push(`/main/modifyCoursePlan/${row.major}/${row.courseList}`)
      },
      async deletePlan (row) {
        let res = await this.$axios.post('/api'+ planApi.deletePlan, {
          major: row.major
        });
        let { code, msg } = res.data;
        if(code === '0000') {
          this.$toast({text: msg, type: 'success'})
          this.getPlanMessage();
        }
      },
      async getPlanMessage () {
        let res = await this.$axios.get('/api'+ planApi.getPlanMessage)
        let { code, msg, data } = res.data;
        if(code === '0000') {
          this.tableData = data
        }    
      }
    },
    watch: {
      '$route' (to, from) {
        if(from.path.indexOf('addCoursePlan') !== 0) {
          this.getPlanMessage();
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