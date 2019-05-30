<template>
  <div>
    <input type="text" v-demo v-model="text">
    <div v-demo1></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'hello directice'
    };
  },
  methods: {
    say() {
      console.log('hello directes');
    }
  },
  directives: {
    demo: {
      inserted: function (el, binding, vnode, oldVnode) {
        // input 绑定的text属性'没有'发生改变
        el.value = 'hello boy';
        // binding.value.set[binding.value.name] = el.value;
      },
      // update 和 componentUpdated 在修改的时候就触发了
      update() {
        console.log('update');
      },
      componentUpdated: function (el) {
        console.log('componentUpdated');
      }

    },
    demo1: function (el, binding, vnode, oldVnode) {
      let s = JSON.stringify
      el.innerHTML =
        'name: ' + s(binding.name) + '<br>' +
        'value: ' + s(binding.value) + '<br>' +
        'expression: ' + s(binding.expression) + '<br>' +
        'argument: ' + s(binding.arg) + '<br>' +
        'modifiers: ' + s(binding.modifiers) + '<br>' +
        'vnode keys: ' + Object.keys(vnode).join(', ')
    },
    demo2: function (el, binding, vnode) {
      // vnode.context === this
      // console.log('vnode: ', vnode);
      // console.log('el.value: ', el.value);
    }
  }
}
</script>
<style lang='scss' scoped>
</style>