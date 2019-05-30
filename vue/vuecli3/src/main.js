import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import ElementUI from 'element-ui';
import '@/assets/icons/index.js';
import components from './components/index';
import '@/utils/directives';
import '@/utils/common';

import '@/style/index.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(components);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
