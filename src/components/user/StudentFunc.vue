<template>
  <div class="register">
      <h2>学生</h2>
      <div class="data-warp">
          <div class="data-container" v-for="(item,index) in userData" :key="index">
              <label :for="item.id">{{item.DataType}}</label><br>
              <input :type="item.type" v-model="item.data" :id="item.id">
          </div>
          <button @click="handle">{{operation}}</button>
      </div>
  </div>
</template>

<script>
import { studentApi } from '@/api'
export default {
    name: 'StudentFunc',
    props: ['type', 'id'],
    created () {
        if(this.type === 'add') {
            this.operation = '注册';
        }else {
            this.getStudentMessage();
            this.operation = '修改';
        }
    },
    data () {
        return {
            userData: [
                {type:'text',DataType: '姓名:',data: '',id: 'name'},
                {type:'text',DataType: '学号:',data: '',id: 'studentID'},
                {type:'password',DataType: '密码:',data: '',id: 'password'},
                {type:'text',DataType: '学院:',data: '',id: 'college'},
                {type:'text',DataType: '班级:',data: '',id: 'class'},
                {type:'text',DataType: '专业:',data: '',id: 'major'},
                {type:'text',DataType: '电话号码:',data: '',id: 'phoneNumber'},
                {type:'text',DataType: '邮箱:',data: '',id: 'mailBox'}
            ],
            operation: ''
        }
    },
    methods: {
        handle () {
            if(this.operation === '注册') {
                this.$axios.post('/api'+ studentApi.studentRegister, {
                    name: this.userData[0].data,
                    studentId: this.userData[1].data,
                    password: this.userData[2].data,
                    college: this.userData[3].data,
                    class: this.userData[4].data,
                    major: this.userData[5].data,
                    phoneNumber: this.userData[6].data,
                    mailBox: this.userData[7].data
                })
                .then(res => {
                    if(res.data.code !== '0000') {
                        this.$toast({text: res.data.msg, type: 'danger'});
                        return
                    }
                    this.$toast({text: res.data.msg, type: 'success'});
                })
            }else {
                this.$axios.post('/api'+ studentApi.updateStudentMessage, {
                    id: this.id,
                    name: this.userData[0].data,
                    studentId: this.userData[1].data,
                    password: this.userData[2].data,
                    college: this.userData[3].data,
                    class: this.userData[4].data,
                    major: this.userData[5].data,
                    phoneNumber: this.userData[6].data,
                    mailBox: this.userData[7].data
                })
                .then(res => {
                    if(res.data.code === '0000') {
                        this.$toast({text: res.data.msg, type: 'success'})
                    }
                })
            }
            this.$router.back();
        },
        getStudentMessage () {
            this.$axios.get('/api'+studentApi.getStudentMessage,{
                params: {
                    id: this.id
                }
            })
            .then(res => {
                if(res.data.code === '0000') {
                    this.userData[0].data = res.data.data.name;
                    this.userData[1].data = res.data.data.studentId;
                    this.userData[2].data = res.data.data.password;
                    this.userData[3].data = res.data.data.college;
                    this.userData[4].data = res.data.data.class;
                    this.userData[5].data = res.data.data.major;
                    this.userData[6].data = res.data.data.phoneNumber;
                    this.userData[7].data = res.data.data.mailBox;
                }
            })
        }
    }
}
</script>

<style lang='less' scoped>
.register {
    width: calc(100%-40px);
    background: white;
    margin: 20px;
    padding: 20px 0 40px;
    border: 1px solid #f2f6fa;
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        font-size: 20px;
    }

    .data-warp {
        width: 270px;
        margin: 0 auto;

        .data-container {
            margin: 10px 0;

            label {
                font-size: 14px;
                line-height: 32px;
            }

            input {
                width: 100%;
                height: 30px;
                padding: 2px 10px;
                box-sizing: border-box;
            }
        }

        button {
            display: block;
            margin: 0 auto;
            width: 80px;
            height: 30px;
            background: linear-gradient(0deg,#3580eb,#2c79eb);
            border: 1px #3083ff solid;
            border-radius: 3px;
            color: white;
            font-size: 1em;
            text-align: center;
            line-height: 30px;
            cursor: pointer;

            &:hover {
                color: black;
            }
        }
    }
}
</style>