export default {
  state: {
    saldo: '---',
    folga: Object,
    extrato: [],
    produtos: [],
    eventos: [],
    idProduto: '',
    idAnalise: '',
    visivel: false
  },
  mutations: {
    carregaSaldo(state, saldo){
      state.saldo = saldo
    },
    carregaFolga(state, folga){
      state.folga = folga
    },
    incrementaFolga(state){
      let intFolga = parseInt(state.folga.qtde_pendente)
      intFolga++
      state.folga.qtde_pendente = intFolga
    },
    carregaExtrato(state, extrato){
      state.extrato = extrato 
    },
    carregaProdutos(state, produtos){
      state.produtos = produtos
    },
    atualizaSaldo(state, valorSaldoAtualizado){
      state.saldo = valorSaldoAtualizado
    },
    atualizaEventos(state, elemento){
      let dia = elemento.getAttribute('data-date')
      let mes = elemento.getAttribute('data-month')
      mes = mes < 10 ? '0'+mes : mes
      let ano = elemento.getAttribute('data-year')
      let data = ano + "-" + mes + "-" + dia

      state.eventos.push({"date": data, "note": "Folga Solicitada"})
    },
    recebeIdProduto(state, idProduto){
      state.idProduto = idProduto
    },
    preencheIdAnalise(state, idAnalise){
      state.idAnalise = idAnalise
    },
    alteraVisibilidade(state, visivel){
      state.visivel = visivel
    }
  },
  getters: {
    saldoAtual(state){
      return state.saldo + ' Koins'
    },
    folgaAtual(state){
      return state.folga
    },
    extratoAtual(state){
      return state.extrato
    },
    produtosAtuais(state){
      return state.produtos
    },
    getEventos(state){
      return state.eventos
    },
    getIdProduto(state){
      return state.idProduto
    },
    getIdAnalise(state){
      return state.idAnalise
    },
    getVisibilidade(state){
      return state.visivel
    }
  }
}