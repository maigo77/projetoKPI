<template>
  <div id="carteira-modal" class="modal">
    <div 
      v-if="todosProdutos.length == 0" 
      id="sem-produtos">
      <i class="fas fa-cart-arrow-down"></i>
      <h2> {{ titSemProdutos }} </h2>
    </div>
    <template v-else>
      <div id="saldo-atual">
        <h2>{{ txtSaldoAtual }}: <span class="selecionado">{{ saldo }}</span></h2>
      </div>

      <div id="filtros">
        <div id="filtros-titulo">
          <h3>
            <i class="fas fa-filter"></i>
            {{ txtFiltros }}
          </h3>
        </div>
        
        <div id="filtros-opcoes">
          <label class="switch">
            <input class="input-checkbox" type="checkbox" name="exibirSaldoInsuficiente" id="exibirSaldoInsuficiente" checked v-on:click="filtraProdutos()">
            <span class="slider round"></span>
          </label>
          <label for="exibirSaldoInsuficiente"> {{ txtSaldoInsuf }} </label>

          <label class="switch">
            <input class="input-checkbox" type="checkbox" name="exibirSaldoSuficiente" id="exibirSaldoSuficiente" checked v-on:click="filtraProdutos()">
            <span class="slider round"></span>
          </label>
          <label for="exibirSaldoSuficiente"> {{ txtSaldoSuf }} </label>
        </div>
      </div>

      <div id="produtos"> 
        <Produtos 
          v-for="produto in todosProdutos" 
          :key="produto.id_produto"
          :id-prod="produto.id_produto"
          :descricao="produto.descricao"
          :estoque="produto.estoque"
          :img="produto.img" 
          :valor="produto.pontos"
          :categoria="produto.categoria"
          :botao="produto.saldo_status" />
      </div>

      <ModalFolga />
    </template>
  </div>
</template>

<script>
import ModalFolga from './ModalFolga'
import Produtos from './ModalCarteiraProdutos'

import axios from 'axios'

import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      descricoes: [],
      titSemProdutos: 'Não há produtos disponíveis',
      txtSaldoAtual: 'Saldo Atual',
      txtFiltros: 'Filtros',
      txtSaldoInsuf: 'Saldo Insuficiente',
      txtSaldoSuf: 'Saldo Suficiente',
      txtBtnFolga: 'Agendar'
    }
  },
  components:{
    Produtos,
    ModalFolga
  },
  methods:{
    filtraProdutos(){
      
      let saldoInsuficiente = document.querySelector('#exibirSaldoInsuficiente')
      let saldoSuficiente = document.querySelector('#exibirSaldoSuficiente')

      let produtosComSaldoInsuficiente = document.querySelectorAll('.produto-botao.bg-btn-red.semClick')
      let produtosComSaldoSuficiente = document.querySelectorAll('.produto-botao.bg-btn-green')

      if(!saldoInsuficiente.checked){
        for(let i = 0; i < produtosComSaldoInsuficiente.length; i++){
          produtosComSaldoInsuficiente[i].parentElement.classList.add('dNone')
        }
      }else{
        for(let i = 0; i < produtosComSaldoInsuficiente.length; i++){
          produtosComSaldoInsuficiente[i].parentElement.classList.remove('dNone')
        }
      }

      if(!saldoSuficiente.checked){
        for(let i = 0; i < produtosComSaldoSuficiente.length; i++){
          produtosComSaldoSuficiente[i].parentElement.classList.add('dNone')
        }
      }else{
        for(let i = 0; i < produtosComSaldoSuficiente.length; i++){
          produtosComSaldoSuficiente[i].parentElement.classList.remove('dNone')
        }
      }

    },
    traduzTexto(){
      setTimeout(() => {
        this.titSemProdutos    = this.todosOsTextos.TIT_SEM_PRODUTOS
        this.txtSaldoAtual     = this.todosOsTextos.TIT_EXTRATO_SALDO
        this.txtFiltros        = this.todosOsTextos.TIT_EXTRATO_FILTRO
        this.txtSaldoInsuf     = this.todosOsTextos.TIT_EXTRATO_SALDO_NOK
        this.txtSaldoSuf       = this.todosOsTextos.TIT_EXTRATO_SALDO_OK
        this.txtBtnFolga       = this.todosOsTextos.TIT_FOLGA_BTN
      }, 300)
    }
  },
  computed: {
     ...mapGetters({
      saldo: 'saldoAtual',
      todosProdutos: 'produtosAtuais',
      todosOsTextos: 'getTodosOsTextos'
    })
  },
  mounted(){
    this.traduzTexto()
  }
}
</script>