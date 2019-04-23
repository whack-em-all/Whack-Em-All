import Vue from 'vue';
import ProgressBar from 'vuejs-progress-bar';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(ProgressBar);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
