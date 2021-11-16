import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Home Page - Vue Test App',
      metaTags: [
        {
          name: 'description',
          content: 'The home page of a Vue.js Test'
        },
        {
          property: 'og:description',
          content: 'The home page of a Vue.js Test'
        }
      ]
    }
  },
  {
    path: '/items',
    name: 'Item List',
    component: () => import('../views/ItemList.vue'),
    meta: {
      title: 'Item List - Vue Test App',
      metaTags: [
        {
          name: 'description',
          content: 'The Item List Page of a Vue.js Test'
        },
        {
          property: 'og:description',
          content: 'The Item List Page of a Vue.js Test'
        }
      ]
    }
  },
  {
    path: '/items/:itemId/detail',
    name: 'Item Detail',
    props: true,
    component: () => import('../views/ItemDetail.vue'),
    meta: {
      title: 'Item Detail - Vue Test App',
      metaTags: [
        {
          name: 'description',
          content: 'The Item Detail Page of a Vue.js Test'
        },
        {
          property: 'og:description',
          content: 'The Item Detail Page of a Vue.js Test'
        }
      ]
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
