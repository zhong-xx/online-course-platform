<template>
  <div class="message">
      <div class="message-header">
        <div>
          <div class="message-type" @click="change(index)" :class="{word: index === whileType}" v-for="(item, index) in typeList" :key="index">{{item.name}}</div>
        </div>
      </div>
      <div class="table">
        <div class="message-type-container">
          <div class="message-type" v-for="(item, index) in messageTypeList" :key="index">{{item}}</div>
        </div>
        <div class="message-wrap">
          <div class="message-container" v-for="(item, index) in messageList[whileType]" :key="index">
            <div class="user-message">{{index+1}}</div>
            <div class="user-message">{{item.student_id.name}}</div>
            <div class="user-message" v-if="index !== writeWhile">
              <span v-if="item.isTest">{{item.grade}}</span> 
              <svg class="icon" aria-hidden="true" @click="beginWrite(index)">
                  <use xlink:href="#icon-tianxie"></use>
              </svg>
            </div>
            <div class="user-message" v-else>
              <input type="text" v-model="item.grade">
              <button @click="updateGrade(item)">确定</button>
              <button>取消</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { studentCourseApi } from '@/api'
export default {
    name: 'messageT',
    props: ['type'],
    data () {
      return {
        typeList: [],
        whileType: 0,
        messageTypeList: ['序号', '学生','分数'],
        messageList: [],
        writeWhile: -1
      }
    },
    created () {
      this.getStudents();
    },
    methods: {
      change (index) {
        this.whileType = index;
      },
      async getStudents () {
        let res = await this.$axios.get('/api'+ studentCourseApi.getStudents, {
          params: {
            teacherId: localStorage.getItem('id')
          }
        }); 
        let { code, msg, data} = res.data;
        if(code === '0000') {
          this.typeList = data.course;
          this.messageList = data.values;
        }     
      },
      beginWrite (index) {
        this.writeWhile = index;
        if(this.messageList[this.whileType][index].isTest === 0) {
          this.messageList[this.whileType][index].grade = null;
        }
      },
      async updateGrade (item) {
        if(item.grade !== null && item.grade !== '') {
          item.isTest = 1;
          this.writeWhile = -1;
          let res = await this.$axios.post('/api'+ studentCourseApi.updateGrade, {
            id: item._id,
            grade: parseInt(item.grade)
          });
          let {code, msg} = res.data;
          if( code === '0000') {
            console.log(msg)
          }
        }else {
          this.$toast({text: '请输入成绩', type: 'danger'})
        }
      } 
    },
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