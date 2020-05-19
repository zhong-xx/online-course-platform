<template>
  <div class="aside">
      <div class="function-container" :class="{functioncolor: index === whichFunction}" v-for="(item,index) in functionList" :key="index">
          <div class="function"  @click="changeFunction(index,item)">{{item}}</div>
      </div>
  </div>
</template>

<script>
import { otherApi } from '@/api'
export default {
    name: 'Aside',
    data () {
        return {
            functionList: ['学生信息','教师信息','课程信息','选课方案'],
            whichFunction: 0,
            userType: ''
        }
    },
    methods: {
        changeFunction (index, item) {
            this.whichFunction = index;
            switch (item) {
                case '学生信息':
                    this.$router.push('/main/student');
                    break;
                case '教师信息':
                    this.$router.push('/main/teacher');
                    break;
                case '课程信息':
                    this.$router.push('/main/course');
                    break;
                case '选课方案':
                    this.$router.push('/main/coursePlan');
                    break;
                case '我的课程':
                    this.$router.push('/studentMain/myCourse');
                    break;
                case '可选课程':
                    this.$router.push('/studentMain/selectCourse');
                    break;
                case '我的成绩':
                    this.$router.push('/studentMain/myGrade')
                    break;
                case '学生成绩':
                    this.$router.push('/teacherMain/messageT/studentGrade')
                    break;
            }
        },
        getUserType () {
            switch (localStorage.getItem('type')) {
                case 'student':
                    this.functionList = ['我的课程','可选课程','我的成绩'];
                    break;
                case 'teacher':
                    this.functionList = ['学生成绩'];
                    break;
                case 'manager':
                    this.functionList = ['学生信息','教师信息','课程信息','选课方案'];
                    break;
            }
            switch (true) {
                case '/studentMain/myCourse' === this.$route.path || this.$route.path.indexOf("tudent") > 4: 
                    this.whichFunction = 0;
                    break;
                case ['/studentMain/selectCourse'].includes(this.$route.path) || this.$route.path.indexOf("eacher") > 4: 
                    this.whichFunction = 1;
                    break;
                case this.$route.path.indexOf("oursePlan") > 4:
                    this.whichFunction = 3;
                    break;
                case ['/studentMain/myGrade', '/main/coursePlan'].includes(this.$route.path) || this.$route.path.indexOf("ourse") > 4: 
                    this.whichFunction = 2;
                    break;
            }
        }
    },
    created () {
        this.getUserType();
    },
    watch: {
        '$route'(to, from) {
            this.getUserType();
        }
    }
}
</script>

<style lang='less' scoped>
.aside {
    height: 100%;
    background: #3d464d;

    .function-container {
        height: 1.75em;
        display: flex;
        align-items: center;

        .function {
            color: #a3a4a7;
            margin-left: 10px;
            cursor: pointer;
        }
    }

    .functioncolor {
        background: #292d36;
    }
}
</style>