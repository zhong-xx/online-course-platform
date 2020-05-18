<template>
  <div class="message">
      <div class="table">
        <div class="message-type-container">
          <div class="message-type" v-for="(item, index) in messageTypeList" :key="index">{{item}}</div>
        </div>
        <div class="message-wrap">
          <div class="message-container" v-for="(item, index) in messageList" :key="index">
            <div class="user-message">{{item.course_id.name}}</div>
            <div class="user-message">{{item.grade}}</div>
            <div class="user-message">{{item.grade_point}}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { studentCourseApi } from '@/api'
export default {
    name: 'MyGrade',
    data () {
      return {
        messageTypeList: ['课程','分数', '绩点'],
        messageList: [],
      }
    },
    created () {
        this.getStudentGrade();
    },
    methods: {
        async getStudentGrade () {
            let res = await this.$axios.get('/api'+ studentCourseApi.getStudentGrade, {
                params: {
                    studentId: localStorage.getItem('id')
                }
            });
            let { code, msg, data} = res.data;
            if(code === '0000') {
                this.messageList = data;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.message {
  margin: 20px 10%;
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

          &:last-of-type {
            cursor: pointer;
          }

          input {
            width: 100px;
            height: 23px;
            border: 1px solid gray;
            border-radius: 7px;
            outline: none;
            padding: 2px 5px;
            box-sizing: border-box;
          }
          
          button {
            margin-left: 7px;
            border-radius: 4px;
            border: 1px solid gray;
            padding: 2px 3px;
            color: #858585;
            outline: none;

            &:hover {
              color: black;
            }
          }
        }

      }
    }
  }
}
</style>