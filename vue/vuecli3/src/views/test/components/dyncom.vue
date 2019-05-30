<script>
import Vue from 'vue';
export default {
  props: {
    html: String
  },
  methods: {
    say() {
      console.log('hi');
    }
  },
  render(h) {
    // console.log(' this.html: ', this.html);
    // const com = Vue.extend({
    //   template: this.html
    // });

    // return h(com);
    return h('el-button', { on: { click: this.say }, props: { text: 'hello' } }, this.html);
  }
}
</script>