<template>
  <div id="app">
    <TelaDeslogado v-if="verificaLogin" :msg="mensagem" />
    <template v-else>
      <div id="gif-tela-inicial" v-if="temGif">
        <div id="gif">
          <Gif />
        </div>
      </div>
      <Regulamento v-else-if="!varAceite && !temGif" :fcClick="verificaAceite" />
      <template v-else-if="varAceite && !temGif">
        <Tutorial /> 
        <Navbar />
        <Menu />
        <Dicas />
        <BalaoMensagem />
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>
      </template>
    </template>
    <LoginTeste v-if="zonaDeTeste" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

import Gif from './components/templates/Gif'
import Tutorial from './components/templates/Tutorial'
import TelaDeslogado from './components/templates/TelaDeslogado'
import Regulamento from './components/templates/Regulamento'
import Navbar from './components/templates/Navbar'
import Menu from './components/templates/Menu'
import BalaoMensagem from './components/templates/BalaoMensagem'
import LoginTeste from './components/templates/LoginTeste'
import Dicas from './components/Dicas'

import metodos from './metodos/metodos'
import axios from 'axios'
import { baseUrlApi } from './metodos/metodos'
export default {
  components: {
    Gif,
    Tutorial,
    Navbar,
    Menu,
    BalaoMensagem,
    LoginTeste,
    Regulamento,
    TelaDeslogado,
    Dicas
  },
  data(){
    return{
      verificaLogin: false,
      varAceite: false,
      temGif: true,
      objRegulamento: {
        acao: "REGULAMENTO_CONSULTA"
      },
      mensagem: "Acesso Negado"
    }
  },
  methods: {
    ...mapMutations(['carregaSaldo', 'carregaFolga', 'setTodosOsTextos', 'preencheIdAnalise', 'setZonaDeTeste', 'setAbrirTutorial']),
    abrirTutorial(){
      this.setAbrirTutorial(false)
    },
    async verificaAceite() {
      let objAceita = {
        regulamento_aceite_cd: "S",
	      acao: "REGULAMENTO_ATUALIZA"
      }
      objAceita = JSON.stringify(objAceita)
      await axios
        .post(`${baseUrlApi}webservices/intergrall-api/kpi/userconfig`, objAceita)
        .then(
          response => {
            if(response.data.status == 'OK'){
              this.varAceite = true
              this.temGif = false
            }else{
              if(!document.querySelector('.toasted.toasted-primary.error')){
                this.$toasted.global.problemaLogin()
              }
            }
          }
        )
        .catch(
          error => {
            if(!document.querySelector('.toasted.toasted-primary.error')){
              this.$toasted.global.defaultError();
            }
            console.log(error)
          }
        )
    },
    // Operacional
    async reqOperacional(){
      await axios
        .post(`${baseUrlApi}webservices/intergrallapi/kpi/operacional`)
        .then(response => {
          if (response.data.status == "OK") {
            // Recebendo Saldo
            this.carregaSaldo(response.data.operador.saldo)
            // Recebendo Folga
            this.carregaFolga(response.data.operador.folga)
            // Preenchendo Id Analise
            this.preencheIdAnalise(response.data.operador.id_analise)

            this.temGif = false
          }else{
            if(response.data.msg){
              if(response.data.msg.search('Nenhuma') !== -1){
                  this.verificaLogin = true
                  this.todosOsTextos.ERRO_SEM_ANALISE = this.todosOsTextos.ERRO_SEM_ANALISE == '' ? this.todosOsTextos.ERRO_SEM_ANALISE : 'Sem Registros para o Representante Informado'
                  this.mensagem = this.todosOsTextos.ERRO_SEM_ANALISE
              }else{
                console.log('Operacional Status NOK: ', response.data)
                if(document.querySelector('#perfil-saldo > p')){
                  document.querySelector('#perfil-saldo > p').textContent = '---'
                }
              }
            }
          }
        })
        .catch(error => {
          if(document.querySelector('#perfil-saldo > p')){
            document.querySelector('#perfil-saldo > p').textContent = '---'
          }
          this.verificaLogin = true
          this.mensagem = error
          console.log('Erro no Operacional: ', error);
        });
    },
    // Verificando se o usu?rio j? aceitou os termos
    async jaAceitouTermos() {
      await axios
        .post(`${baseUrlApi}webservices/intergrall-api/kpi/userconfig`, this.objRegulamento)
        .then(
          response => {
            if(response.data.status == 'OK'){
              if(response.data.regulamento_aceite_ds == "ACEITOU" && response.data.regulamento_aceite_cd == "S"){
                this.varAceite = true
                this.temGif = false
              }
            }else{
              this.verificaLogin = true
              this.todosOsTextos.ERRO_USU_NAO_LOGADO = this.todosOsTextos.ERRO_USU_NAO_LOGADO == '' ? this.todosOsTextos.ERRO_USU_NAO_LOGADO : 'Acesso Negado'
              this.mensagem = this.todosOsTextos.ERRO_USU_NAO_LOGADO
              console.log('Aceitou Termos status NOK: ', response.data)
            }
          }
        )
        .catch(
          error => {
            if(!document.querySelector('.toasted.toasted-primary.error')){
              this.$toasted.global.defaultError();
            }
            console.log('Erro no Aceitou Termos :', error)
          }
        )
    },
    tradutor(){
      axios.post(`${baseUrlApi}webservices/intergrallapi/kpi/dicionario`)
      .then(
        response => {
          this.setTodosOsTextos(response.data)
        }
      )
      .catch(
        error => {
          console.log('Erro no Dicionario: ', error)
        }
      )
    },
    verificaZonaDeTeste(){
      let parametroNaUrl = window.location.search
      if(parametroNaUrl.search('login_simulado=S') !== -1){
        this.setZonaDeTeste(true)
      }
    }
  },
  created() {
    this.verificaZonaDeTeste()
    this.objRegulamento = JSON.stringify(this.objRegulamento)

    // Mudar depois
    this.abrirTutorial()

    this.reqOperacional()
    this.tradutor()
    this.jaAceitouTermos()
  },
  computed: {
    ...mapGetters({
      todosOsTextos: 'getTodosOsTextos',
      zonaDeTeste: 'getZonaDeTeste'
    })
  }
}
</script>

<style>
  @keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
.slide-enter-active {
  animation: slide-in 0.3s ease;
}
.slide-leave-active {
  animation: slide-out 0.3s ease;
}
</style>