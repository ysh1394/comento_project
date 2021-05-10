import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Feed',
    component: () => import('@/views/Feed/Feed.vue'),
  },
  {
    path: '/detail/:id',
    name: 'FeedDetail',
    component: () => import('@/views/FeedDetail/FeedDetail.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
