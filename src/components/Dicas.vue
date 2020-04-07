<template>
  <div id="container-dicas" v-if="!erroReqMensagem">
    <div id="btn-dicas" v-on:click="toggleDicas()">
      <div id="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    <div id="conteudo-dicas">
      <h2 class="titulo-dicas"> <!--  bg-dark -->
        {{ titMsg }}
        <!-- <div v-on:click="alteraVisualizacao()">
          <i class="fas fa-bookmark"></i>
          <span>{{ txtVisualizarMsg }} </span>
        </div> -->
      </h2>
      <div id="container-lista-mensagens">
        <ul id="lista-mensagens-nao-lidas">
          <li v-for="(msg, index) in arrMensagens" :key="index">
            <i class="far fa-bookmark" :class="{'kpi': msg.categoria == 'kpi', 'outros': msg.categoria == 'todos', 'bsc': msg.categoria == 'bsc'}" :msg-id="msg.id" :id="'msg_'+index" v-on:click="marcarComoLido('msg_'+index, index)" :title="titMarcarLido"></i>
            {{ msg.mensagem }}
          </li>
        </ul>
      </div>
      <div id="legenda-dicas">
        <!-- <div class="container-legenda">
          <span class="titulo-legenda"> {{ titLegenda }} </span>
        </div> -->
        <!-- <div class="container-legenda">
          <span class="titulo-legenda"> {{ txtLegenda }} </span>
        </div> -->
        <div class="legenda opt1" v-on:click="filtraMensagens('opt1', 'kpi')">
          <div class="quadrado kpi-legenda"></div>
          <span> {{ tipoLegenda1 }} </span>
        </div>
        <div class="legenda opt2" v-on:click="filtraMensagens('opt2', 'bsc')">
          <div class="quadrado bsc-legenda"></div>
          <span> {{ tipolegenda2 }} </span>
        </div>
        <div class="legenda opt3" v-on:click="filtraMensagens('opt3', 'outros')">
          <div class="quadrado outros-legenda"></div>
          <span> {{ tipolegenda3 }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import { baseUrlApi } from '../metodos/metodos'

import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      carregando: true,
      primeiraReq: true,
      dicasAberto: false,
      erroReqMensagem: false,
      arrMensagens: [],
      titMsg: 'Mensagens',
      titLegenda: 'Legenda',
      txtLegenda: 'Mensagens referentes à: ',
      tipoLegenda1: 'KPI',
      tipolegenda2: 'BSC',
      tipolegenda3: 'Outros',
      titMarcarLido: 'Marcar como Lido',
      txtVisualizarMsg: 'Visualizar mensagens lidas',
      controleMsg: false
    }
  },
  methods: {
    toggleDicas(abrirForcado){
      if(this.carregando) return

      if(abrirForcado == 'abrir'){
        this.dicasAberto = true
      }else{
        this.dicasAberto = !this.dicasAberto
      }

      let containerDicas = document.querySelector('#container-dicas')
      
      if(this.dicasAberto){
        containerDicas.style.right = '0'
      }else{
        containerDicas.style.right = '-25vw'
      }

    },
    reqMensagens(){
      axios
      .get(`${baseUrlApi}webservices/intergrall-api/kpi/msg/lista`)
      .then(response => {
        if(response.data.status == 'OK'){

          this.arrMensagens = response.data.mensagens

          if(this.arrMensagens.length == 0){
            this.erroReqMensagem = true
            return
          }

          if(this.primeiraReq){
            setTimeout( () => {
              this.carregando = false
              document.querySelector('#btn-dicas').innerHTML = '<i class="fab fa-earlybirds"></i>'
              this.toggleDicas()
              },
            2500 )

            this.primeiraReq = false
          }else{
            this.toggleDicas('abrir')
          }

        }else{
          this.erroReqMensagem = true
        }
      })
      .catch(error => {
        console.log('Erro Req Mensagens: ', error)
        this.erroReqMensagem = true
      })
    },
    traduzTextos(){
      setTimeout(
        () => {
          this.titMsg           = this.todosOsTextos.TIT_MSG
          this.titLegenda       = this.todosOsTextos.TIT_LEGENDA
          this.txtLegenda       = this.todosOsTextos.TXT_LEG
          this.tipoLegenda1     = this.todosOsTextos.TXT_LEG1
          this.tipoLegenda2     = this.todosOsTextos.TXT_LEG2
          this.tipoLegenda3     = this.todosOsTextos.TXT_LEG3
          this.titMarcarLido    = this.todosOsTextos.TIT_MARCAR_LIDO
          this.txtVisualizarMsg = this.todosOsTextos.TXT_VISU_MSG1
        }, 200
      )
    },
    marcarComoLido(id){
      let icone = document.querySelector('#'+id)
      let idMsg = icone.getAttribute('msg-id')

      let objIdMsg = {
        id: idMsg
      }

      axios.post(`${baseUrlApi}webservices/intergrall-api/kpi/msg/lida`, objIdMsg)
        .then(
          response => {
            if(response.data.status == 'OK'){
              if(icone){
                icone.classList.remove('far')
                icone.classList.add('fas')
              }

              if(document.querySelector('.toasted.toasted-primary.success')){
                return
              }else{
                this.$toasted.global.marcarComoLido();
              }
            }else{
              if(document.querySelector('.toasted.toasted-primary.error')){
                return
              }else{
                this.$toasted.global.defaultError();
              }
            }
          }
        )
        .catch(
          error => {
            console.log(error)
            this.$toasted.global.defaultError()
          }
        )
    },
    filtraMensagens(classePai, classeLegenda){
      let filhos = document.querySelector('.'+classePai).children
      let todasOpcoes = document.querySelectorAll('.'+classeLegenda)

      if(filhos && todasOpcoes){
        for(let i = 0; i < filhos.length; i++){
          filhos[i].classList.toggle('desabilitado')
        }

        for(let i = 0; i < todasOpcoes.length; i++){
          if(todasOpcoes[i].localName == 'li'){
            todasOpcoes[i].classList.toggle('dNone')
          }
        }
      }
    },
    alteraVisualizacao(){
      let listaNLida = document.querySelector('#lista-mensagens-nao-lidas')
      let listaLida = document.querySelector('#lista-mensagens-lidas')

      listaNLida.classList.toggle('dNone')
      listaLida.classList.toggle('dNone')

      this.controleMsg = !this.controleMsg

      if(this.controleMsg){
        this.txtVisualizarMsg = this.todosOsTextos.TXT_VISU_MSG2
      }else{
        this.txtVisualizarMsg = this.todosOsTextos.TXT_VISU_MSG1
      }
    }
  },
  computed: {
    ...mapGetters({
      todosOsTextos: 'getTodosOsTextos'
    })
  },
  mounted(){
    this.reqMensagens()
    setInterval(
      () => {
        // if(this.reqMensagens == false){
        //   clearInterval()
        // }
        this.reqMensagens()
      }, 60000 // 1 minuto
    )
    // 600000 // 10 minutos
    this.traduzTextos()
  }
}
</script>

<style>

</style>