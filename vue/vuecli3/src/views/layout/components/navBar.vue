<template>
  <el-row class="menu">
    <el-col :span="3" class="menu-header">
      <span class="title">
        HELLO WROLD
      </span>
    </el-col>
    <el-col :span="20" class="menu-item">
      <ul>
        <router-link v-for="(item,index) in routes" :key="index" :to="item.path" tag="li" :class="[item.active?'active':'']">{{item.title}}</router-link>
      </ul>
    </el-col>
    <el-col :span="1" class="menu-right">
      <div title="登出" @click="logout" class="logout">
        <svg-icon name="logout"></svg-icon>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
    };
  },
  computed: {
    routes() {
      let navs = [];
      let activeName = this.$route.name;
      this.$router.options.routes.forEach(item => {
        if (!item.unNav) {
          let obj = {};
          obj.path = item.path;
          obj.name = item.children[0].name;
          obj.title = item.children[0].meta.title;
          if (obj.name === activeName) {
            obj.active = true;
          }
          navs.push(obj);
        }
      });
      return navs;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
}
</script>
<style lang='scss' scoped>
.menu {
  box-sizing: border-box;
  color: #fff;
  background: #2196f3;
  background: -webkit-linear-gradient(to left, #f44336, #2196f3);
  background: linear-gradient(to left, #f44336, #2196f3);

  .menu-header {
    height: 70px;
    font-size: 18px;
    display: flex;
    align-items: center;
    .title {
      padding-left: 30px;
    }
  }
  .menu-item {
    padding-left: 30px;
    ul {
      text-decoration: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 70px;
      margin: 0;
      padding: 0;
      li {
        cursor: pointer;
        padding: 25px 30px;
        font-size: 16px;
        list-style: none;
        &:hover {
          box-shadow: 0px 0px 10px red inset;
        }
      }
      .active {
        box-shadow: 0px 0px 10px red inset;
      }
    }
  }
  .menu-right {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    .logout {
      padding: 15px;
      cursor: pointer;
    }
  }
}
</style>