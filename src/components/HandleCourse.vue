<template>
  <div class="operation-message-wrap">
      <div class="operation-message">
          <div class="top">
              <div class="operation"><slot></slot></div>
              <div class="close" @click="close">X</div>
          </div>

          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <div class="row-container">
                  <el-form-item label="课程名 :">
                      <el-input v-model="ruleForm.name" placeholder="请输入课程名"></el-input>
                  </el-form-item>
                  <el-form-item label="课程类型 :">
                      <el-input v-model="ruleForm.type" placeholder="请输入课程类型"></el-input>
                  </el-form-item>
              </div>
              <div class="row-container">
                  <el-form-item label="课程地点 :">
                      <el-input v-model="ruleForm.place" placeholder="请输入课程地点"></el-input>
                  </el-form-item>
                  <el-form-item label="学分 :">
                      <el-input v-model="ruleForm.credit" placeholder="请输入学分"></el-input>
                  </el-form-item>
              </div>
              <div class="row-container">
                  <el-form-item label="开始周 :">
                      <el-input v-model="ruleForm.begin_week" placeholder="请输入开始周"></el-input>
                  </el-form-item>
                  <el-form-item label="结束周 :">
                      <el-input v-model="ruleForm.end_week" placeholder="请输入结束周"></el-input>
                  </el-form-item>
              </div>
              <div class="row-container">
                  <el-form-item label="书籍 :">
                      <el-input v-model="ruleForm.book" placeholder="请输入书籍"></el-input>
                  </el-form-item>
                  <el-form-item label="教师 :">
                      <el-input v-model="ruleForm.teacher" placeholder="请输入教师"></el-input>
                  </el-form-item>
              </div>
              <div class="row-container">
                  <el-form-item label="总数量 :">
                      <el-input v-model="ruleForm.quantity" placeholder="请输入总数量"></el-input>
                  </el-form-item>
              </div>
              <div class="row-container">
                  <div></div>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm()">保存</el-button>
                    <el-button @click="close">关闭</el-button>
                  </el-form-item>
              </div>
          </el-form>
      </div>
  </div>
</template>

<script>
import { courseApi } from '@/api'
export default {
    name: 'HandleTeacher',
    props: ['id'],
    created () {
        if(this.$route.path.indexOf('modifyCourse') !== -1) {
            this.getCourseMessage();
        }
    },
    data () {
        return {
            ruleForm: {
                name: '',
                type: '',
                place:'',
                credit: '',
                begin_week: '',
                end_week: '',
                book:'',
                teacher: '',
                quantity: ''
            }
        }
    },
    methods: {
        async submitForm() {
            if(this.$route.path.indexOf('modifyCourse') !== -1) {
                let res = await this.$axios.post('/api'+ courseApi.updateCourseMessage, {
                    id: this.id,
                    name: this.ruleForm.name,
                    credit: this.ruleForm.credit,
                    beginWeek: this.ruleForm.begin_week,
                    endWeek: this.ruleForm.end_week,
                    book: this.ruleForm.book,
                    teacher: this.ruleForm.teacher,
                    quantity: this.ruleForm.quantity,
                    type: this.ruleForm.type,
                    place: this.ruleForm.place
                })
                let { code, msg } = res.data;
                if(code === '0000') {
                    this.$toast({text: msg, type: 'success'});
                    this.$router.back();
                }
                return;
            }
            let res = await this.$axios.post('/api'+ courseApi.addCourseMessage, {
                name: this.ruleForm.name,
                credit: this.ruleForm.credit,
                beginWeek: this.ruleForm.begin_week,
                endWeek: this.ruleForm.end_week,
                book: this.ruleForm.book,
                teacher: this.ruleForm.teacher,
                quantity: this.ruleForm.quantity,
                type: this.ruleForm.type,
                place: this.ruleForm.place
            })
            let { code, msg } = res.data;
            if(code === '0000') {
                this.$toast({text: msg, type: 'success'});
                this.$router.back();
                return
            }
            this.$toast({text: msg, type: 'danger'});
        },
        close () {
            this.$router.back();
        },
        async getCourseMessage () {
            let res = await this.$axios.get('/api'+ courseApi.getCourseMessage,{
                params: {
                    id: this.id
                }
            })
            let { code, msg, data } = res.data;
            if( code === '0000') {
                this.ruleForm = data;
            }
        }
    }
}
</script>

<style lang='less' scoped>
.operation-message-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .operation-message {
        width: 840px;
        border: 1px solid gray;
        border-radius: 5px;
        background: white;

        .top {
            height: 50px;
            margin: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .operation {
                font-weight: bold;
            }

            .close {
                color: gray;
                cursor: pointer;

                &:hover {
                    color: rgb(54, 54, 231);
                }
            }
        }

        .el-form {
            padding: 15px 30px;
            border-top: 2px solid gray;

            .row-container {
                display: flex;
                justify-content: space-between;

                .el-input,.el-select {
                    width: 280px;
                }
            }
        }
    }
}
</style>