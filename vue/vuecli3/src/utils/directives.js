import Vue from 'vue';
import { makeRe } from 'minimatch';

// v-mask: 弹窗宽度拖大 拖小
Vue.directive('mask', {
  bind(el, binding, vnode, oldVnode) {
    console.log(el, binding.value);
    let mask = document.createElement('div');
    mask.style.height = '100%';
    mask.style.width = '100%';
    var finalStyle = el.currentStyle ? el.currentStyle : document.defaultView.getComputedStyle(el, null);
    console.log('finalStyle.position: ', finalStyle);
    if (!finalStyle.position || finalStyle.position === 'static') {
      el.style.position = 'relative';
    }
    el.style.overflow = 'hidden';
    mask.style.position = 'absolute';
    mask.style.top = '50px';
    mask.style.left = '0';
    mask.style.backgroundColor = 'black';
    mask.style.opacity = 0;
    el.appendChild(mask);
  }
});
