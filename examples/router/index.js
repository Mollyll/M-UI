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
            path: '/test',
            name: 'test',
            component: r => require.ensure([], () => r(require('../docs/test.md')))
        }
    ]
})
