<template>
  <div class="message">
      <div class="message-header">
        <div>
          <div @click="getUserMessage(item)" class="message-type" :class="{word: index === userType}" v-for="(item, index) in typeList" :key="index">{{item}}</div>
        </div>
        <div>
          <div v-if="funcShow" class="add" @click="add">添加</div>
          <!-- <input type="text"> -->
        </div>
      </div>
      <div class="table">
        <div class="message-type-container">
          <div class="message-type" v-for="(item, index) in messageTypeList" :key="index">{{item}}</div>
        </div>
        <div class="message-wrap">
          <div class="message-container" v-for="(item, index) in userMessageList" :key="index">
            <div class="user-message" v-show="index !== 1" :class="{ handle: key === 'func' || key === 'delete'}" @click="handle(key,value, item)" v-for="(value, key, index) in item" :key="index">{{value}}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { studentApi, teacherApi, courseApi, studentCourseApi } from '@/api'
export default {
    name: 'message',
    props: ['type'],
    data () {
      return {
        typeList: [],
        // 针对学生教师使用的
        userType: 0,
        messageTypeList: [],
        userMessageList: [],
        funcShow: true
      }
    },
    created () {
      switch (this.type) {
        case 'user':
          this.typeList = ['学生', '教师'];
          break;
        case 'course':
          this.typeList = ['课程'];
          this.funcShow = true;
          break;
        case 'myCourse':
        case 'selectCourse':
          this.typeList = ['课程'];
          this.funcShow = false;
          break;
      }
      this.getUserMessage(this.typeList[0]);
    },
    methods: {
      getUserMessage (item) {
        if(item === '学生') {
          this.userType = 0;
          this.messageTypeList = ['密码','名字','学号','学院','班级','专业','电话号码','邮箱','操作','操作']
          this.$axios.get('/api'+ studentApi.getStudentsMessage)
                      .then(res => {
                        if(res.data.code === '0000') {
                          for(let item of res.data.data) {
                            item.func = '修改';
                            item.delete = '删除';
                          }
                          this.userMessageList = res.data.data;
                        }
                      })
          return;
        }
        if(item === '教师') {
          this.userType = 1;
          this.messageTypeList = ['密码','名字','教师号','电话号码','邮箱','操作','操作'];
          this.$axios.get('/api'+ teacherApi.getTeachersMessage)
                      .then(res => {
                        if(res.data.code === '0000') {
                          for(let item of res.data.data) {
                            item.func = '修改';
                            item.delete = '删除';
                            // this.messageTypeList.push('操作');
                          }
                          this.userMessageList = res.data.data;
                        }
                      })
        }
        if(item === '课程') {
          this.messageTypeList = ['已选数量','课程名','课程类型','课程地点','学分','开始周','结束周',
          '书籍','教师','总数量','操作'];
          if(this.type === 'myCourse') {
            this.$axios.get('/api'+ studentCourseApi.getStudentCourse, {
              params: {
                id: localStorage.getItem('id')
              }
            })
            .then(res => {
              let {code, msg, data} = res.data;
              if(code === '0000') {
                for(let item of data)
                  item.func = '删除';
                this.userMessageList = data;
              }
            })
            return;
          }
          this.$axios.get('/api'+ courseApi.getCoursesMessage)
                      .then(res => {
                        if(res.data.code === '0000') {
                          for(let item of res.data.data) {
                            switch (this.type) {
                              case 'course':
                                item.func = '修改';
                                item.delete = '删除';
                                this.messageTypeList.push('操作');
                                break;
                              case 'selectCourse':
                                item.func = '添加';
                                break;
                            }
                          }
                          this.userMessageList = res.data.data;
                        }
                      })
        }
      },
      async handle (key, value, item) {
        if(key === 'func' && value === '修改') {
          if(this.typeList[0] === '课程') {
            this.$router.push(`/main/courseFunc/update/${item._id}`)
            return
          }
          if(this.typeList[this.userType] === '学生') {
            this.$router.push(`/main/studentFunc/update/${item._id}`);
          }else {
            this.$router.push(`/main/teacherFunc/update/${item._id}`);
          }
        }
        if(key === 'func' && value === '添加') {
          this.$axios.post('/api'+ studentCourseApi.addStudentCourse, {
            id: localStorage.getItem('id'),
            courseId: item._id
          })
          .then(res => {
            let { code, msg } = res.data;
            if(code !== '0000') {
              this.$toast({text: msg, type: 'danger'})
              return
            }
            this.$toast({text: msg, type: 'success'})
          })
        }
        if(key === 'func' && value === '删除') {
          this.$axios.post('/api'+ studentCourseApi.deleteStudentCourse, {
            id: localStorage.getItem('id'),
            courseId: item._id
          })
          .then(res => {
            let { code, msg } = res.data;
            if(code === '0000') {
              this.$toast({text: msg, type: 'success'})
              this.getUserMessage(this.typeList[0]);
            }
          })
        }
        if(key === 'delete' && value === '删除') {
          if(this.typeList[0] === '课程') {
            let res = await this.$axios.post('/api'+ courseApi.deleteCourse, {
              courseId: item._id
            });
            let {code, msg} = res.data;
            if(code === '0000') {
              this.$toast({text: msg, type: 'success'});
              this.getUserMessage(this.typeList[0]);
            }
            return
          }
          if(this.typeList[this.userType] === '学生') {
            let res = await this.$axios.post('/api'+ studentApi.deleteStudent, {
              studentId: item._id
            });
            let {code, msg} = res.data;
            if(code === '0000') {
              this.$toast({text: msg, type: 'success'});
              this.getUserMessage(this.typeList[0]);
            }
          }else {
            let res = await this.$axios.post('/api'+ teacherApi.deleteTeacher, {
              teacherId: item._id
            });
            let {code, msg} = res.data;
            if(code === '0000') {
              this.$toast({text: msg, type: 'success'});
              this.getUserMessage(this.typeList[0]);
            }
          }
        }
      },
      add () {
        if(this.typeList[0] === '课程' ) {
          this.$router.push('/main/courseFunc/add');
          return
        }
        if(this.typeList[this.userType] === '学生') {
          this.$router.push('/main/studentFunc/add');
        }else {
          this.$router.push('/main/teacherFunc/add');
        }
      }
    },
    watch: {
      '$route' (to, from) {
        this.funcShow = true;
        switch (this.type) {
          case 'user':
            this.typeList = ['学生', '教师'];
            break;
          case 'course':
            this.typeList = ['课程'];
            break;
          case 'myCourse':
          case 'selectCourse':
            this.typeList = ['课程'];
            this.funcShow = false;
            break;
        }
        this.getUserMessage(this.typeList[0]);
      }
    }
}
</script>

<style lang="less" scoped>
.message {
  margin: 20px;
  background: white;

  .message-header {
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .message-type {
      display: inline-block;
      line-height: 40px;
      margin: 0 20px;
      cursor: pointer;
      font-size: 12px;
    }

    .word {
      font-weight: 600;
      border-bottom: 2px solid #f77c69;
    }

    input {
      width: 180px;
      height: 28px;
      margin-right: 20px;
      border-radius: 5px;
      padding: 2px 5px;
      box-sizing: border-box;
      border: 1px solid rgb(207, 196, 196);
      outline: none;
    }

    .add {
      display: inline-block;
      margin-right: 60px;
      color: rgb(219, 50, 50);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
  }

  .table {
    padding: 20px 0;
    line-height: 40px;
    background: white;

    .message-type-container {
      display: flex;
      background: #f2f2f2;
      font-size: 12px;
      font-weight: 500px;

      .message-type {
        flex: 1;
        color: #646464;

        &:first-of-type {
          margin-left: 20px;
        }
      }
    }

    .message-wrap {

      .message-container {
        display: flex;

        &:nth-of-type(2n) {
          background: #f5f7fa;
        }

        .user-message {
          flex: 1;
          font-size: 12px;
          color: #858585;
          
          &:first-of-type {
            margin-left: 20px;
          }
        }

        .handle {
          color: #f67968;
          cursor: pointer;
        }
      }
    }
  }
}
</style>