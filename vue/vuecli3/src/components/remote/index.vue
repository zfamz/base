<script>
export default {
  render(createElement) {
    let self = this;
    return createElement('script', {
      attrs: { type: 'text/javascript', src: this.jsUrl },
      on: {
        load: function () {
          // console.log(self);
          self.$emit('load-js-finish'); // 外部js加载完成回调
        }
      }
    });
  },
  props: {
    jsUrl: { type: String, required: true } // 需要加载的外部url
  }
};
</script>
