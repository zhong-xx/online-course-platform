<template>
  <div class="main-container">
      <header>
          <h1>网上选课系统</h1>
          <button @click="quit">退出</button>
      </header>
      <div class="container">
          <div class="aside">
              <Aside></Aside>
          </div>
          <div class="main">
              <router-view></router-view>
          </div>
      </div>
      <router-view name="addCoursePlan">
          新增选课方案
      </router-view>
      <router-view name="modifyCoursePlan">
          修改选课方案
      </router-view>
  </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
export default {
    name: 'Main',
    components: {
        Aside
    },
    methods: {
        quit () {
            localStorage.clear();
            this.$router.push('/');
        }
    }
}
</script>

<style lang='less' scoped>
.main-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    header {
        height: 50px;
        background: #1d2027;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            line-height: 50px;
            margin-left: 20px;
        }

        button {
            margin-right: 20px;
            width: 50px;
            height: 32px;
            border-radius: 5px;
            border: none;

            &:hover {
                color: blue;
            }
        }
    }

    .container {
        flex: 1;
        display: flex;

        .aside {
            width: 150px;
        }

        .main {
            flex: 1;
            background: #f2f6fa;
        }
    }
}
</style>