export default {
  state: {
    carrinhoRepre: Array
  },
  mutations: {
    setCarrinhoRepre(state, arrCarrinho){
      state.carrinhoRepre = arrCarrinho
    }
  },
  getters: {
    getCarrinhoRepre(state){
      return state.carrinhoRepre
    }
  }
}