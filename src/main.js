import "@babel/polyfill"
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./config/msgs";
import "./plugins/axios";
import metodos from "./metodos/metodos"
import VueCarousel from 'vue-carousel'

import store from "./config/store"

Vue.config.productionTip = false;

Vue.use(VueCarousel)

new Vue({
  router,
  metodos,
  store,
  VueCarousel,
  render: h => h(App)
}).$mount("#app");