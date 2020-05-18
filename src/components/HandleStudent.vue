<template>
  <div class="operation-message-wrap">
      <div class="operation-message">
          <div class="top">
              <div class="operation"><slot></slot></div>
              <div class="close" @click="close">X</div>
          </div>

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <div class="row-container">
                  <el-form-item label="名字 :">
                      <el-input v-model="ruleForm.name" placeholder="请输入名字"></el-input>
                  </el-form-item>
                  <el-form-item label="学号 :">
                      <el-input v-model="ruleForm.studentID" placeholder="请输入学号"></el-input>
                  </el-form-item>
              </div>
              <div class="row-container">
                  <el-form-item label="密码 :">
                      <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="学院 :">
                      <el-input v-model="ruleForm.college" placeholder="请输入学院"></el-input>
                  </el-form-item>
              </div>
              <div class="row-container">
                  <el-form-item label="班级 :">
                      <el-input v-model="ruleForm.class" placeholder="请输入班级"></el-input>
                  </el-form-item>
                  <el-form-item label="专业 :">
                      <el-input v-model="ruleForm.major" placeholder="请输入专业"></el-input>
                  </el-form-item>
              </div>
              <div class="row-container">
                  <el-form-item label="电话号码 :">
                      <el-input v-model="ruleForm.phoneNumber" placeholder="请输入电话号码"></el-input>
                  </el-form-item>
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
import { studentApi } from '@/api'
export default {
    name: 'HandleStudent',
    props: ['id'],
    created () {
        if(this.$route.path.indexOf('/modifyMaterial') !== -1) {
            this.getMaterialMessage();
        }
    },
    data () {
        return {
            ruleForm: {
                name: '',
                studentID: '',
                password:'',
                college:'',
                class: '',
                major: '',
                phoneNumber: '',
                mailBox: '',
            }
        }
    },
    methods: {
        async submitForm() {
            let res = await this.$axios.post('/api'+ studentApi.studentRegister, {
                name: this.ruleForm.name,
                studentId: this.ruleForm.studentID,
                password: this.ruleForm.password,
                college: this.ruleForm.college,
                class: this.ruleForm.class,
                major: this.ruleForm.major,
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
        async getMaterialMessage () {
            
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