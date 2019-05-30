import Vue from 'vue';
import svgIcon from '@/components/SvgIcon';

// register globally
Vue.component('svgIcon', svgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);
