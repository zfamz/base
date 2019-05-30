<template>
  <div>
    <h3>暂时自己有点蒙，香菇</h3>
    <el-button>button</el-button>
    <el-button @click="apple">{{text}}</el-button>
    <div v-html="transform(html)"></div>
    <com1 :html="html"></com1>
    <div id="innerH">id</div>
    <div ref="innerH">ref</div>
    <!-- <component :is="currentView">component</component> -->
    <section>
      <p>tips: 让vue编译一下字符串，即template</p>
      <p>failed, 无法实现，vue本身就不支持这种理念</p>
      <p>extend加mount的方式会报（pre-compile the templates into render functions）</p>
      <p>19/5/6 vue 技术内幕</p>
    </section>
  </div>
</template>

<script>
import Vue from 'vue';
import com1 from './components/dyncom';

export default {
  name: 'DynamicHtml',
  components: { com1 },
  data() {
    return {
      text: 'insert html string by js',
      html: `<button @click="apple">{{text}}</button>`
    }
  },
  computed: {
    currentView() {
      return { template: this.html };
    }
  },
  mounted() {
    // 创建构造器
    var Profile = Vue.extend({
      template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
      data: function () {
        return {
          firstName: 'Walter',
          lastName: 'White',
          alias: 'Heisenberg'
        }
      }
    })
    // 创建 Profile 实例，并挂载到一个元素上。 报错，这个标签直接消失
    new Profile().$mount('#innerH')


    this.$nextTick(function () {
      this.$forceUpdate();
    })
  },
  methods: {
    apple() {
      console.log('I can !!');
    },
    transform(html) {
      // 无法调用
      // let temp = this.compile(html);
      // let Com = Vue.extend({ template: this.html });
      // console.log('Com: ', Com);
      // let com = new Com().$mount('#innerH');
      // console.log('com: ', com);
      // setTimeout(() => {
      //   console.log('com.$el: ', com.$el);
      //   document.getElementById('innerH').appendChild(com.$el)
      // }, 0)
      return html;
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  display: inline-block;
  padding: 5px 8px;
}
</style>