<template>
  <div>
    <!-- <input type="number" v-model="count"> -->
    <button @click="count++">
      change
    </button>
    <recursion-item :count="count"></recursion-item>
  </div>
</template>

<script>
import recursionItem from './components/recursionItem'
export default {
  // 递归组件
  name: 'Recursion',
  data() {
    return {
      count: 0
    };
  },
  components: {
    recursionItem
  }
}
</script>
<style lang='scss' scoped>
</style>