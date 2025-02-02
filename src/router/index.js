import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cart from '@/components/Cart'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            props: true
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart,
            props: true
        }
    ]
})