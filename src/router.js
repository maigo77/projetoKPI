import Vue from "vue"
import Router from "vue-router"
import Inicio from "./components/templates/Inicio"

import Moodle from './components/templates/Moodle'

// import Treinamento from "./components/templates/Treinamento"
// import GerenciaTreinamento from "./components/GerenciaTreinamento"

Vue.use(Router);

const routes = [
  { name: "home", path: "/home", component: Inicio },
  // { name: "moodle", path: "/moodle", component: Moodle },
  // { name: "treinamento", path: "/treinamento", component: Treinamento },
  // { name: "gerencia-treinamento", path:"/treinamento/gerencia-treinamento", component: GerenciaTreinamento },
  { name: "any", path: '*', redirect: '/home' }
]

let baseUrl = ''
if(window.location.hostname == 'localhost' || window.location.hostname == '192.168.204.126'){
  baseUrl = ''
}else{
  baseUrl = 'kpi/'
}

export default new Router({
  base: baseUrl,
  mode: 'hash',
  routes: routes
});