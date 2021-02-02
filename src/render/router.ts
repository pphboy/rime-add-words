import { createRouter, createWebHashHistory } from 'vue-router'
import Index from './views/Index.vue'
const router:any = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
        path: '/',
        name: 'index',
        component: Index as any,
        meta: {
            title: '首页'
        }
    },
  ]
})

export default router
