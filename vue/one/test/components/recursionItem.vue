<template>
  <ul>
    <template v-if="condition < 5">
      <li v-for="index in condition" :key="index">
        {{ index }}
        <button @click="changVal++">
          change
        </button>
        <recursion-item>
        </recursion-item>
      </li>
    </template>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  // 递归组件
  name: 'RecursionItem',
  props: ['count'],
  data() {
    return {
      changVal: 0
    };
  },
  watch: {
    count() {
      this.changVal++;
    }
  },
  computed: {
    condition() {
      let apple = Math.random() * 10;
      console.log('apple: ', apple);
      // this.$store.commit('SET_RECURSIONLAY')
      return parseInt(apple) + this.changVal - this.changVal;
    },
    ...mapState({
      recursionLay: state => state.recursionLay
    })
  }
}
</script>
<style lang='scss' scoped>
</style>