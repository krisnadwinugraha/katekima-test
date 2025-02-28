import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/berries'
    },
    {
      path: '/berries',
      name: 'berries',
      component: () => import('./views/BerryListView.vue')
    },
    {
      path: '/berries/:id',
      name: 'berry-detail',
      component: () => import('./views/BerryDetailView.vue'),
      props: true
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('./views/ProductListview.vue')
    },
    {
      path: '/products/add',
      name: 'product-add',
      component: () => import('./views/ProductAddView.vue')
    },
    {
      path: '/products/edit/:id',
      name: 'product-edit',
      component: () => import('./views/ProductEditView.vue'),
      props: true
    }
  ]
});

export default router;