import Vue from 'vue'

import app from './app.vue'
import router from './router/index'
import demoBlock from './components/demo-block.vue';

import MUI from '../packages/index.js'
import './assets/style/global.less'
import '../packages/theme-default/lib/index.less'

Vue.use(MUI)
Vue.component('demo-block', demoBlock);

new Vue({
    el: '#root',
    router,
    render: (h) => h(app)
})