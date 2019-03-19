import VueRouter from 'vue-router'
import Vue from 'vue'
import Hello from '../components/hello.vue'

Vue.use(VueRouter)


export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'hello',
            component: Hello
        },
        {
            path: '/layout',
            name: 'layout',
            component: r => require.ensure([], () => r(require('../docs/layout.md')))
        },
        {
            path: '/button',
            name: 'button',
            component: r => require.ensure([], () => r(require('../docs/button.md')))
        }
    ]
})
