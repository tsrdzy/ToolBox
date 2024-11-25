import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        component: () => import('@/components/index.vue'),
    },
    {
        path: '/asmdbuilder',
        component: () => import('@/view/tools/asmdbuilder/index.vue'),
    },
]
const router = createRouter({
    //  hash 模式。
    history: createWebHashHistory(),
    routes
})
export default router