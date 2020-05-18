<template>
  <div class="operation-message-wrap">
      <div class="operation-message">
          <div class="top">
              <div class="operation"><slot></slot></div>
              <div class="close" @click="close">X</div>
          </div>
          <div class="operation-container">
              <div class="message-container">
                  <el-select :disabled='forbid' v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="tag-container">
                      <el-tag
                        v-for="(tag, index) in tags"
                        :key="tag.name"
                        :type="tag.type"
                        @click="selectCourse(index)">
                        {{tag.name}}
                      </el-tag>
                  </div>
              </div>
              <div class="operation">
                    <el-button type="primary" @click="submit">保存</el-button>
                    <el-button @click="close">关闭</el-button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { planApi } from '@/api'
export default {
    name: 'OperationPlan',
    props: ['major', 'courseList'],
    created () {
        this.getCourseList();
        if(this.$route.path.indexOf('modifyCoursePlan') !== -1) {
            this.value = this.major;
            this.forbid = true;
            let self = this;
        }
    },
    data () {
        return {
            forbid: false,
            options: [{
                value: '软件工程',
                label: '软件工程'
                }, {
                value: '网络工程',
                label: '网络工程'
                }, {
                value: '物联网工程',
                label: '物联网工程'
                }, {
                value: '计算机科学与技术',
                label: '计算机科学与技术'
            }],
            value: '',
            tags: [
                // { name: '标签一', type: '' },
                // { name: '标签二', type: '' },
                // { name: '标签三', type: '' },
                // { name: '标签四', type: '' },
                // { name: '标签五', type: '' }
            ]
        }
    },
    methods: {
        close () {
            this.$router.back();
        },
        selectCourse (index) {
            if(this.tags[index].type === '') {
                this.tags[index].type = 'success';
            }else {
                this.tags[index].type = '';
            }
        },
        async getCourseList() {
            let res = await this.$axios.get('/api'+ planApi.getCourseList);
            let { code, msg, data } = res.data;
            if(code === '0000') {
                this.tags = data

                if(this.$route.path.indexOf('modifyCoursePlan') !== -1) {
                    this.tags.forEach(item => {
                        if(this.courseList.indexOf(item.name) !== -1) {
                            item.type = 'success';
                        }
                    })
                }
            }
        },
        async submit () {
            let courseList = [];
            if(this.value === '') {
                this.$toast({text: '请选择专业', type: 'danger'})
                return;
            }
            this.tags.forEach((item)=> {
                if(item.type === 'success') {
                    courseList.push(item);
                }
            })
            if(courseList.length === 0) {
                this.$toast({text: '请选择相应课程', type: 'danger'})
                return;
            }
            if(this.$route.path.indexOf('modifyCoursePlan') !== -1) {
                let res = await this.$axios.post('/api'+ planApi.modifyPlan, {
                    major: this.value,
                    courseList
                });
                let { code, msg } = res.data;
                if(code === '0000') {
                    this.$toast({text: msg, type: 'success'});
                    this.$router.back();
                }
                return;
            }
            let res = await this.$axios.post('/api'+ planApi.addPlanMessage, {
                major: this.value,
                courseList
            })
            let { code, msg } = res.data;
            if(code === '0000') {
                this.$toast({text: msg, type: 'success'})
                this.$router.back();
                return;
            }
            this.$toast({text: msg, type: 'danger'})
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
            padding: 0 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid gray;

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

        .operation-container {
            margin: 30px 30px;

            .message-container {
                height: 120px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .el-select {
                    margin-left: 30px;
                }

                .tag-container {
                    width: 300px;
                    margin-right: 30px;

                    .el-tag {
                        margin-right: 10px;
                        margin-bottom: 10px;
                        cursor: pointer;
                    }
                }
            }

            .operation {
                display: flex;
                justify-content: flex-end;
            }
        }
    } 
}
</style>