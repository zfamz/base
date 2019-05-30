<template>
  <div>
    <input type="text" v-model="inputVal" v-focus>
    <inject-com></inject-com>
  </div>
</template>

<script>
import injectCom from './components/inject'
export default {
  name: 'Provide',
  components: {
    injectCom
  },
  data() {
    return {
      inputVal: ''
    };
  },
  provide() {
    return {
      getInputVal: this.getInputVal
    }
  },
  methods: {
    getInputVal() {
      console.log(this.inputVal);
      return this.inputVal;
    }
  }
}
</script>
<style lang='scss' scoped>
</style>