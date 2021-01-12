import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  {
    path: '/contacts_list',
    name: 'ContactsList',
    component: () => import('../views/ContactsList.vue'),
  },
  {
    path: '/new_contact',
    name: 'NewContact',
    component: () => import('../components/NewContact.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
