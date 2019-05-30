<template>
  <button @click="show">
    inject
  </button>
</template>

<script>
export default {
  name: 'Inject',
  data() {
    return {};
  },
  inject: ['getInputVal'],
  methods: {
    show() {
      alert(this.getInputVal());
    }
  }
}
</script>
<style lang='scss' scoped>
</style>