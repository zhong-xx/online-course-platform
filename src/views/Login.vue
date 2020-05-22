<template>
  <div class="login-wrap">
      <div class="login-box">
          <h1>欢迎登录网上选课系统</h1>
          <div class="user-type-box">
              <div class="user-type" :class="{color: index === userType}" @click="changeUser(index)" v-for="(item,index) in login.userTypeList" :key="index">{{item}}</div>
          </div>
          <div class="data-wrap">
              <div v-for="(item,index) in login.typeList" :key="index"  class="data-box">
                  <label for="">{{login.titleList[userType][index]}}</label>
                  <input :type="item" v-model="login.userData[index]" placeholder="可以输入123456">
              </div>
              <button @click="userLogin">登录</button>
          </div>
      </div>
  </div>
</template>

<script>
import { studentApi, otherApi, teacherApi } from '@/api'
export default {
    name: 'Login',
    data () {
        return {
            login: {
                userTypeList: ['学生登录','教师登录','管理员登录'],
                typeList: ['text','password'],
                titleList: [
                    ['学生号 :', '密码 :'],
                    ['教师号 :', '密码 :'],
                    ['管理号 :', '密码 :'],
                ],
                userData:['','']
            },
            userType: 0
        }
    },
    methods: {
        changeUser (index) {
            this.userType = index;
        },
        async userLogin () {
            if(this.userType === 0) {
                this.$axios.post('/api'+ studentApi.studentLogin, {
                    studentId: this.login.userData[0],
                    password: this.login.userData[1]
                })
                .then(res => {
                    let {code, msg, data} = res.data;
                    if(code !== '0000') {
                        this.$toast({text: msg, type: 'danger'})
                        return
                    }
                    localStorage.setItem('id', data.id);
                    localStorage.setItem('type', data.type);
                    this.$toast({text: msg, type: 'success'})
                    this.$router.push({path:'/studentMain'})
                })
            }
            if(this.userType === 1) {
                this.$axios.post('/api'+ teacherApi.teacherLogin, {
                    teacherId: this.login.userData[0],
                    password: this.login.userData[1]
                })
                .then(res => {
                    let {code, msg, data} = res.data;
                    if(code !== '0000') {
                        this.$toast({text: msg, type: 'danger'})
                        return
                    }
                    localStorage.setItem('id', data.id);
                    localStorage.setItem('type', data.type);
                    this.$toast({text: msg, type: 'success'})
                    this.$router.push({path:'/teacherMain/messageT/studentGrade'})
                })
            }
            if(this.userType === 2) {
                if(this.login.userData[0] === '123456' && this.login.userData[1] === '123456') {
                    localStorage.setItem('id', '123456');
                    localStorage.setItem('type', 'manager');
                    let res = await this.$axios.post('/api'+ otherApi.managerLogin)
                    this.$toast({text: res.data.msg, type: 'success'})
                    this.$router.push({path:'/main'});
                } else {
                    this.$toast({text: "管理号或密码错误", type: 'danger'})
                }
            }
        }
    }
}
</script>

<style lang='less' scoped>
.login-wrap {
    height: 100%;
    background-image: url('../assets/bg4.jpg');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-box {
        width: 400px;
        height: 240px;
        background: rgba(252, 248, 248, 0.7); ;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            font-size: 1.875em;
            font-weight: 500;
            margin: .6em 0;
        }

        .user-type-box {
            width: 270px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.25em;

            .user-type {
                cursor: pointer;

                &:hover {
                    color: #3083ff;

                    &::before {
                        color: black;
                    }
                }

                &::before {
                    content: '|';
                    position: relative;
                    left: -12px;
                }

                &:nth-of-type(1)::before {
                    content: '';
                }
            }

            .color {
                color: #3083ff;

                &::before {
                    color: black;
                }
            }
        }

        .data-wrap {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 20px;
            width: 270px;

            .data-box {
                display: flex;
                justify-content: flex-end;
                align-items: center;

                label {
                    margin-right: 20px;
                    // color: rgb(29, 44, 173);
                }

                input {
                    width: 190px;
                    height: 27px;
                    border: 1px solid #9aa0a7;
                    padding: 2px 5px;
                    box-sizing: border-box;
                    border-radius: 4px;
                    outline: none;
                }
            }

            button {
                align-self: center;
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
}
</style>