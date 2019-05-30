<template>
  <div>
    <ul class="list">
      <li v-for="(item,index) in path" :key="index" class="list-item">
        <router-link :to="'/test/'+item.path" tag="span">
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
    let paths = this.$router.options.routes.filter(item => item.path === '/test')
    this.path = paths[0].children || [];
  }
}
</script>
<style lang='scss' scoped>
.list {
  display: flex;
  justify-content: flex-start;
  .list-item {
    padding: 5px 8px;
    margin: 0 1em;
    list-style: none;
    text-decoration: none;
    border: 1px solid #9c6685;
    border-radius: 5px;
    box-shadow: 0 0 10px red inset;
    cursor: pointer;
  }
}
</style>