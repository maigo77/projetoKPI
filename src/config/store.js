import Vue from "vue";
import Vuex from "vuex";

import operacional from './modulos/operacional'
import treinamento from './modulos/treinamento'
import chat from './modulos/chat'
import noticias from './modulos/noticias'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    erroReqOpe: false,
    erroReqNot: false,
    todosOsTextos: {},
    corSecundaria: '#222', //002855
    urlAvatar: '',
    svgAvatar: '',
    zonaDeTeste: false,
    abrirTutorial: false
  },
  mutations: {
    falhaNaRequisicaoOpe(state, statusRequisicao){
      state.erroReqOpe = statusRequisicao
    },
    falhaNaRequisicaoNot(state, statusRequisicao){
      state.erroReqNot = statusRequisicao
    },
    setTodosOsTextos(state, todosOsTextos){
      state.todosOsTextos = todosOsTextos
    },
    setCorSecundaria(state, corSecundaria){
      state.corSecundaria = corSecundaria
    },
    setUrlAvatar(state, urlAvatar){
      state.urlAvatar = urlAvatar
    },
    setSvgAvatar(state, svgAvatar){
      state.svgAvatar = svgAvatar
    },
    setZonaDeTeste(state, zonaDeTeste){
      state.zonaDeTeste = zonaDeTeste
    },
    setAbrirTutorial(state, abrirTutorial){
      state.abrirTutorial = abrirTutorial
    }
  },
  getters: {
    verificaErroReqOpe(state){
      return state.erroReqOpe
    },
    verificaErroReqNot(state){
      return state.erroReqNot
    },
    getTodosOsTextos(state){
      return state.todosOsTextos
    },
    getCorSecundaria(state){
      return state.corSecundaria
    },
    getUrlAvatar(state){
      return state.urlAvatar
    },
    getSvgAvatar(state){
      return state.svgAvatar
    },
    getZonaDeTeste(state){
      return state.zonaDeTeste
    },
    getAbrirTutorial(state){
      return state.abrirTutorial
    }
  },
  modules: { operacional, treinamento, chat, noticias }
});