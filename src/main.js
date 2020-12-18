import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import 'lib-flexible';
import fastClick from 'fastclick';

Vue.use(Lazyload);
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
fastClick.attach(document.body);
Vue.use(Vant);
Vue.use(Lazyload, {
  lazyComponent: true,
  loading:'./assets/img/default.png',
  error:require('./assets/img/default.png')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
