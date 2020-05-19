<template>
  <div class="operation-message-wrap">
      <div class="operation-message">
          <div class="top">
              <div class="operation"><slot></slot></div>
              <div class="close" @click="close">X</div>
          </div>

          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <div class="row-container">
                  <el-form-item label="名字 :">
                      <el-input v-model="ruleForm.name" placeholder="请输入名字"></el-input>
                  </el-form-item>
                  <el-form-item label="教师号 :">
                      <el-input v-model="ruleForm.teacherID" placeholder="请输入教师号"></el-input>
                  </el-form-item>
              </div>
              <div class="row-container">
                  <el-form-item label="密码 :">
                      <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="电话号码 :">
                      <el-input v-model="ruleForm.phoneNumber" placeholder="请输入电话号码"></el-input>
                  </el-form-item>
              </div>
              <div class="row-container">
                  <el-form-item label="邮箱 :">
                      <el-input v-model="ruleForm.mailBox" placeholder="请输入邮箱"></el-input>
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
import { teacherApi } from '@/api'
export default {
    name: 'HandleTeacher',
    props: ['id'],
    created () {
        if(this.$route.path.indexOf('modifyTeacher') !== -1) {
            this.getTeacherMessage();
        }
    },
    data () {
        return {
            ruleForm: {
                name: '',
                teacherID: '',
                password:'',
                phoneNumber: '',
                mailBox: '',
            }
        }
    },
    methods: {
        async submitForm() {
            if(this.$route.path.indexOf('modifyTeacher') !== -1) {
                let res = await this.$axios.post('/api'+ teacherApi.updateTeacherMessage, {
                    id: this.id,
                    name: this.ruleForm.name,
                    teacherId: this.ruleForm.teacherID,
                    password: this.ruleForm.password,
                    phoneNumber: this.ruleForm.phoneNumber,
                    mailBox: this.ruleForm.mailBox
                })
                let { code, msg } = res.data;
                if(code === '0000') {
                    this.$toast({text: msg, type: 'success'});
                    this.$router.back();
                }
                return;
            }
            let res = await this.$axios.post('/api'+ teacherApi.teacherRegister, {
                name: this.ruleForm.name,
                teacherId: this.ruleForm.teacherID,
                password: this.ruleForm.password,
                phoneNumber: this.ruleForm.phoneNumber,
                mailBox: this.ruleForm.mailBox
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
        async getTeacherMessage () {
            let res = await this.$axios.get('/api'+ teacherApi.getTeacherMessage,{
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