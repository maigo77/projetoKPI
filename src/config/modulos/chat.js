export default {
  state: {
    novaNotificacao: false
  },
  mutations: {
    setNovaNotificacao(state, novaNotificacao){
      state.novaNotificacao = novaNotificacao
    }
  },
  getters: {
    getNovaNotificacao(state){
      return state.novaNotificacao
    }
  }
}