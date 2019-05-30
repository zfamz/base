<template>
  <div class="container">
    <div>
      <div class="header">
        v-pre
      </div>
      <div class="content">
        <span v-pre>
          {{ this will not be compiled }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
}
</script>
<style lang='scss' scoped>
.container {
  & > div {
    outline: 1px solid #1348af;
    min-height: 2em;
    padding: 8px 1em;
    .header {
      padding: 5px 1em;
      color: #fff;
      border-radius: 5px;
      background: #0f2027; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to right,
        #2c5364,
        #203a43,
        #0f2027
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
      /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    .content {
      margin-top: 8px;
    }
  }
}
</style>