import Vue from "vue";
import axios from "axios";

Vue.use({
  install(Vue) {
    Vue.prototype.$http = axios.create({
      // baseURL: "https://linux03/",
      // baseURL: "https://localhost:8080/kpi/"
      baseURL: "",
      headers: {
        Authorization: "abc123"
      }
    });

    Vue.prototype.$http.interceptors.request.use(
      config => {
        return config;
      },
      error => Promise.reject(error)
    );

    Vue.prototype.$http.interceptors.response.use(
      res => {
        return res;
      },
      error => Promise.reject(error)
    );
  }
});