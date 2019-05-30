# vue svg 配置

#### 组件

```vue
// svgIcon.vue
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      if (this.iconClass) {
        return 'svg-icon ' + this.iconClass;
      } else {
        return 'svg-icon';
      }
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  /* vertical-align: -0.15em; */
  color: #fff;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

#### webpack 配置

```js
// vue.config.js 配置 （注意，里面配置的顺序好像有要求，不然会报错。配置后要重启）
const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .test(/\.(svg)(\?.*)?$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' });

// webpack.base.conf.js 配置
{
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/assets/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
}
```

#### 引入(require.context)

```js
// 引入组件
import Vue from 'vue';
import svgIcon from '@/components/SvgIcon';

// register globally
Vue.component('svgIcon', svgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);
```
