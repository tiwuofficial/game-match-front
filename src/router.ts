import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Top from './views/Top.vue';
import Register from './views/Register.vue';
import Friends from './views/Friends.vue';
import Notifications from './views/Notifications.vue';
import User from './views/User.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
        path: '/friends',
        name: 'friends',
        component: Friends,
    },
    {
        path: '/notifications',
        name: 'notifications',
        component: Notifications,
    },
      {
          path: '/user/:id',
          name: 'user',
          component: User,
      },
  ],
});
