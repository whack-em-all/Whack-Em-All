import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Result from './views/Result.vue';
import Lobby from './views/Lobby.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    }, {
      path: '/result',
      name: 'result',
      component: Result,
    }, {
      path: '/lobby',
      name: 'lobby',
      component: Lobby,
    }, {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/game/:id',
      name: 'game',
      component: () => import(/* webpackChunkName: "game" */ './views/Game.vue'),
    },
  ],
});
