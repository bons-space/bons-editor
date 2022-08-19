import {
  createRouter,
  RouteRecordRaw,
  createWebHistory,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    meta: {
      name: 'index',
    },
    component: () => import('../views/Index.vue'),
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
