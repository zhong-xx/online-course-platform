<template>
  <div class="register">
      <h2>课程</h2>
      <div class="data-warp">
          <div class="data-container" v-for="(item,index) in userData" :key="index">
              <label class="message-type" :for="item.id">{{item.DataType}}</label><br>
              <input class="text" :type="item.type" v-model="item.data" :id="item.id">
          </div>
          <div class="data-container">
              <label class="message-type">课程类型:</label>
              <div class="type-container">
                  <div v-for="(item, index) in courseTypeData" :key="index">
                      <input type="radio" v-model="courseType" name="type" :value="item.type" :id="item.id"><label :for="item.id">{{item.type}}</label>
                  </div>
              </div>
          </div>
          <div class="data-container">
              <label class="message-type">课程地点:</label>
              <select v-model="place">
                <option value="超星" selected="selected">超星</option>
                <option value="锡科401">锡科401</option>
                <option value="锡科402">锡科402</option>
                <option value="锡科403">锡科403</option>
                <option value="锡科404">锡科404</option>
              </select>
          </div>
          <button @click="implement">{{operation}}</button>
      </div>
  </div>
</template>

<script>
import { courseApi } from '@/api'
export default {
    name: 'CourseFunc',
    props: ['type', 'id'],
    created () {
        if(this.type === 'add') {
            this.operation = '添加';
        }else {
            this.getCourseMessage();
            this.operation = '修改';
        }
    },
    data () {
        return {
            userTypeList: ['学生注册','教师注册'],
            userData: [
                {type:'text',DataType: '课程名:',data: '',id: 'name'},
                {type:'text',DataType: '学分:',data: '',id: 'credit'},
                {type:'text',DataType: '开始周:',data: '',id: 'beginWeek'},
                {type:'text',DataType: '结束周:',data: '',id: 'endWeek'},
                {type:'text',DataType: '书籍:',data: '',id: 'book'},
                {type:'text',DataType: '教师:',data: '',id: 'teacher'},
                {type:'text',DataType: '总数量:',data: '',id: 'quantity'},
            ],
            courseType: '',
            courseTypeData: [
                {
                    type: '实体课程',
                    id: 'entity'
                },
                {
                    type: '网络课程',
                    id: 'network'
                }],
            place: '超星',
            operation: '添加'
        }
    },
    methods: {
        implement () {
            if(this.operation === '添加') {
                this.$axios.post('/api'+ courseApi.addCourseMessage, {
                    name: this.userData[0].data,
                    credit: this.userData[1].data,
                    beginWeek: this.userData[2].data,
                    endWeek: this.userData[3].data,
                    book: this.userData[4].data,
                    teacher: this.userData[5].data,
                    quantity: this.userData[6].data,
                    type: this.courseType,
                    place: this.place
                })
                .then(res => {
                    if(res.data.code !== '0000') {
                        this.$toast({text: res.data.msg, type: 'danger'});
                        return
                    }
                    this.$toast({text: res.data.msg, type: 'success'});
                })
            }else {
                this.$axios.post('/api'+ courseApi.updateCourseMessage, {
                    id: this.id,
                    name: this.userData[0].data,
                    credit: this.userData[1].data,
                    beginWeek: this.userData[2].data,
                    endWeek: this.userData[3].data,
                    book: this.userData[4].data,
                    teacher: this.userData[5].data,
                    quantity: this.userData[6].data,
                    type: this.courseType,
                    place: this.place
                })
                .then(res => {
                    if(res.data.code === '0000') {
                        this.$toast({text: res.data.msg, type: 'success'})
                    }
                })
            }
            this.$router.back();
        },
        getCourseMessage () {
            this.$axios.get('/api'+courseApi.getCourseMessage,{
                params: {
                    id: this.id
                }
            })
            .then(res => {
                if(res.data.code === '0000') {
                    this.userData[0].data = res.data.data.name;
                    this.userData[1].data = res.data.data.credit;
                    this.userData[2].data = res.data.data.begin_week;
                    this.userData[3].data = res.data.data.end_week;
                    this.userData[4].data = res.data.data.book;
                    this.userData[5].data = res.data.data.teacher;
                    this.userData[6].data = res.data.data.quantity;
                    this.courseType = res.data.data.type;
                    this.place = res.data.data.place;
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

        .data-container {
            margin: 20px 0;
            display: flex;

            .message-type {
                display: inline-block;
                width: 80px;
                font-size: 14px;
                line-height: 32px;
                text-align: right;
                margin-right: 15px;
            }

            .text {
                flex: 1;
                height: 30px;
                padding: 2px 10px;
                box-sizing: border-box;
            }

            .type-container {
                flex: 1;
                display: flex;
                align-items: center;
                
                div {
                    margin-right: 10px;
                }
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