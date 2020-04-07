<template>
  <div id="regulamento">
    <div class="bg-white regulamento-container">
      <h1>
        <i class="fas fa-lock"></i>
        {{ titRegulamento }}
      </h1>
      <hr>
      <div class="regulamento-txt" v-on:scroll="sinalizacaoRolagem()">
        <h3>{{  titTopico01 }}</h3>
        <p>
          {{ txtTopico01 }}
        </p>
        <h3> {{ titTopico02 }} </h3>
        <p>
          {{ txtTopico02 }}
        </p>
        <p> 
          {{ txtFim }}
        </p>
        <div id="btn-aceita" v-on:click='fcClick'>
          <p>
            {{ mensagemConfirmacaoLeitura }}
            <i class="fas fa-check"></i>
          </p>
        </div>
      </div>
      <div id="container-mouse" v-show="!rolouPagina">
        <div id="mouse" v-if="temBarraDeRolagem">
          <div class="mouse-linha"></div>
          <div class="mouse-scroll mouse-scroll-animation"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      rolouPagina: false,
      mensagemConfirmacaoLeitura: 'Li e Aceito os Termos de Uso e Política de Privacidade',
      titRegulamento: 'Termos de Uso e Política de Privacidade',
      titTopico01: 'Tópico 01',
      txtTopico01: '',
      titTopico02: 'Tópico 02',
      txtTopico02: '',
      txtFim: '',
      temBarraDeRolagem: false
    }
  },
  props: ['fcClick'],
  methods: {
    sinalizacaoRolagem(){
      let mouseAnimado = document.querySelector('#container-mouse')
      
      if(!mouseAnimado.classList.contains('fechaMouse') && !this.rolouPagina){
        this.$addClasse(mouseAnimado, 'fechaMouse')
        setTimeout(() => {
          this.rolouPagina = true
        }, 900)
      }

      let scrollMouseAnimado = document.querySelector('.mouse-scroll')
      if(mouseAnimado.classList.contains('mouse-scroll-animation')){
        this.$removeClasse(scrollMouseAnimado, 'mouse-scroll-animation')
      }
    },
    verificaBarraDeRolagem(){
      let regulamentoContainer = document.querySelector('.regulamento-txt')

      if(regulamentoContainer){
        let alturaContainer  = regulamentoContainer.clientHeight
        let tamanhoScrollbar = regulamentoContainer.scrollHeight 

        return this.temBarraDeRolagem = tamanhoScrollbar > alturaContainer ? true : false
      }
    },
    traduzTexto(){
      setTimeout(() => {
        this.titRegulamento             = this.todosOsTextos.TIT_TERMOS
        this.mensagemConfirmacaoLeitura = this.todosOsTextos.TIT_CONFIRMA_LEITURA
        this.titTopico01                = this.todosOsTextos.TIT_TOPICO_1
        this.txtTopico01                = this.todosOsTextos.TERMOS_TOPICO_1
        this.titTopico02                = this.todosOsTextos.TIT_TOPICO_2
        this.txtTopico02                = this.todosOsTextos.TERMOS_TOPICO_2
        this.txtFim                     = this.todosOsTextos.TERMOS_FINAL
      }, 300)
    }
  },
  computed: {
    ...mapGetters({
      todosOsTextos: 'getTodosOsTextos'
    })
  },
  mounted(){
    this.traduzTexto()

    setTimeout(() => { this.verificaBarraDeRolagem() }, 350)
  }
}
</script>