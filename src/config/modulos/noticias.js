export default {
  state: {
    todasNoticias: [],
    noticiasPopUp: [],
    naoHaNoticias: false,
    exibePopUp: false
  },
  mutations: {
    setTodasNoticias(state, todasNoticias){
      state.todasNoticias = todasNoticias
    },
    setNoticiasPopUp(state, noticiasPopUp){
      state.noticiasPopUp.push(noticiasPopUp)
    },
    setNaoHaNoticias(state, naoHaNoticias){
      state.naoHaNoticias = naoHaNoticias
    },
    setExibePopUp(state, exibePopUp){
      state.exibePopUp = exibePopUp
    }
  },
  getters: {
    getTodasNoticias(state){
      return state.todasNoticias
    },
    getNoticiasPopUp(state){
      return state.noticiasPopUp
    },
    getNaoHaNoticias(state){
      return state.naoHaNoticias
    },
    getExibePopUp(state){
      return state.exibePopUp
    }
  }
}