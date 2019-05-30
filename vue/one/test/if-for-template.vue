<template>
  <div>
    <template v-if="isShow">
      <span v-for="(item,index) in 4" :key="index">
        {{ item }}
      </span>
    </template>
    <button @click="isShow=!isShow">
      toggle
    </button>
  </div>
</template>

<script>
export default {
  name: 'IfForTemplate',
  data() {
    return {
      isShow: true,
    };
  }
}
</script>
<style lang='scss' scoped>
</style>