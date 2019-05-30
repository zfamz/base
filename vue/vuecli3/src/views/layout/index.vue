<template>
  <el-container>
    <el-header style="height:70px">
      <nav-bar />
    </el-header>
    <el-scrollbar class="scrollbar" wrap-class="x-auto">
      <el-main>
        <keep-alive :exclude="['basicDeal']">
          <router-view />
        </keep-alive>
      </el-main>
    </el-scrollbar>
  </el-container>
</template>

<script>
import navBar from './components/navBar.vue';
export default {
  data() {
    return {};
  },
  components: { navBar },
  methods: {}
}
</script>
<style lang='scss'>
.scrollbar {
  height: calc(100vh - 70px);
  width: 100%;
  background: #f8f9ff;
}
</style>