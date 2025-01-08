import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue'), 
        //redirect: '/welcome',
        children: [],
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router