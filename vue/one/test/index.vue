<template>
  <div>
    <ul>
      <li v-for="(item,index) in path" :key="index">
        <router-link :to="'/test/'+item.path">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: []
    };
  },
  created() {
    let paths = this.$router.options.routes.filter(item => item.name === 'Test')
    this.path = paths[0].children || [];
  }
}
</script>
<style lang='scss' scoped>
</style>