<template>
  <div class="register">
      <h2>教师</h2>
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
import { teacherApi } from '@/api'
export default {
    name: 'TeacherFunc',
    props: ['type', 'id'],
    created () {
        if(this.type === 'add') {
            this.operation = '注册';
        }else {
            this.getTeacherMessage();
            this.operation = '修改';
        }
    },
    data () {
        return {
            userData: [
                {type:'text',DataType: '姓名:',data: '',id: 'name'},
                {type:'text',DataType: '教师号:',data: '',id: 'teacherID'},
                {type:'password',DataType: '密码:',data: '',id: 'password'},
                {type:'text',DataType: '电话号码:',data: '',id: 'phoneNumber'},
                {type:'text',DataType: '邮箱:',data: '',id: 'mailBox'}
            ],
            operation: ''
        }
    },
    methods: {
        handle () {
            if(this.operation === '注册') {
                this.$axios.post('/api'+ teacherApi.teacherRegister, {
                    name: this.userData[0].data,
                    teacherId: this.userData[1].data,
                    password: this.userData[2].data,
                    phoneNumber: this.userData[3].data,
                    mailBox: this.userData[4].data
                })
                .then(res => {
                    if(res.data.code !== '0000') {
                        this.$toast({text: res.data.msg, type: 'danger'});
                        return
                    }
                    this.$toast({text: res.data.msg, type: 'success'});
                })
            }else {
                this.$axios.post('/api'+ teacherApi.updateTeacherMessage, {
                    id: this.id,
                    name: this.userData[0].data,
                    teacherId: this.userData[1].data,
                    password: this.userData[2].data,
                    phoneNumber: this.userData[3].data,
                    mailBox: this.userData[4].data
                })
                .then(res => {
                    if(res.data.code === '0000') {
                        this.$toast({text: res.data.msg, type: 'success'})
                    }
                })
            }
            this.$router.back();
        },
        getTeacherMessage () {
            this.$axios.get('/api'+teacherApi.getTeacherMessage,{
                params: {
                    id: this.id
                }
            })
            .then(res => {
                if(res.data.code === '0000') {
                    this.userData[0].data = res.data.data.name;
                    this.userData[1].data = res.data.data.teacherId;
                    this.userData[2].data = res.data.data.password;
                    this.userData[3].data = res.data.data.phoneNumber;
                    this.userData[4].data = res.data.data.mailBox;
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
            margin: 20px 0;

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