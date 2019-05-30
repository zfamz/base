import Vue from 'vue';
import Vuex from 'vuex';
import project from './modules/project.js';
import user from './modules/user.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    project,
    user
  }
});
export default store;
