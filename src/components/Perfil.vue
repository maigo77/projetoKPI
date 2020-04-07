<template>
  <div id="perfil" class="bg-white">
    <!-- Div Superior -->
    <div
      id="perfil-ranking"
      :title="txtHoverRanking"
      class="semClick"
    > 
      <!-- Modal Desempenho -->
      <!-- v-on:click="abreModal('link-modal-desempenho', 'modal-desempenho')" --> 
      <!-- <a id="link-modal-desempenho" href="#modal-desempenho" rel="modal:open" class="dNone">Desempenho Modal</a> -->

      <!-- BTN Visível ou não -->
      <div id="aparecer-ranking">
        <i class="fas fa-eye" :title="titVisualizar" v-if="!visivel" v-on:click="alteraVisibilidade(true)"></i>
        <i class="fas fa-eye-slash" :title="titEsconder" v-else v-on:click="alteraVisibilidade(false)"></i>
      </div>

      <!-- Ranking Lateral Superior -->
      <div id="ranking">
        <template v-if="visivel">
          <template v-if="posicao != ''">
            <i class="fas fa-hashtag"></i>
            <p>{{ posicao }}</p>
          </template>
          <p v-else> --- </p>
          <i class="comparativo"></i>
        </template>
        <p v-else class="nao-visivel"> --- </p>
      </div>

      
    </div>

    <div id="perfil-aux">
      <!-- Div Avatar -->
      <div id="perfil-foto">
        <!-- Performance -->
        <VueSvgGauge
            :start-angle="-120"
            :end-angle="120"
            :value="performanceFuncionario"
            :separator-step="25"
            :innerRadius="85"
            :base-color='"#CCC"'
            :gauge-color="corSecundaria"
            :scale-interval="0"
          >
          <!-- Modal Perfil -->
          <div
            id="perfil-circulo"
            v-on:mouseenter="toggleClasse"
            v-on:mouseleave="toggleClasse"
            v-on:click="abreModal('link-modal', 'perfil-modal')"
          >
            <a id="link-modal" href="#perfil-modal" rel="modal:open"></a>
            <!-- Avatar SVG -->
            <div class="avatar" id="perfil-avatar"
              v-html="svgAvatar">
            </div>
            <i id="perfil-edita-avatar" class="fas fa-pen opacity transition"></i>
          </div>
        </VueSvgGauge>
        <!-- Círculo de performance -->
        <div class="circulo-performance bg-dark">
          <p>{{ parseInt(performanceFuncionario) + '%' }}</p>
        </div>
      </div>
      
      <!-- Informações Funcionário -->
      <div id="perfil-informacoes-funcionario">
        <h2>{{ nomeFuncionario }}</h2>
        <h3>{{ operacaoFuncionario }}</h3>
      </div>
    </div>
    
    <!-- Logo GAMEK -->
    <div id="perfil-logo">
      <img src="../../public/assets/img/GAMEK-COMPLETO.png" alt="">
    </div>

    <div id="perfil-cards">
      <!-- Saldo -->
      <div id="perfil-saldo" class="bg-transparent">
        <template v-if="visivel">
          <i class="fas fa-coins"></i>
          <p> {{ saldo }} </p>
        </template>
        <p v-else class="nao-visivel"> --- </p>
      </div>
      <!-- Shopping -->
      <div class="perfil-cards shopping" v-on:click="abreModal('carteira-modal', 'carteira-link', $event), shopping()">
        <a href="#carteira-modal" rel="modal:open" id="carteira-link" class="dNone">Carteira Modal</a>
        <div class="perfil-cards-icone shopping">
          <i class="fas fa-shopping-cart icon-dollar transition"></i>
        </div>
        <div class="perfil-cards-texto">
          <h2> {{ titShopping }} </h2>
          <span id="extrato" v-on:click="extrato()">
            <i class="fas fa-piggy-bank"></i>
            {{ titExtrato }}
            <a href="#extrato-modal" rel="modal:open" id="extrato-link" class="dNone">Extrato Modal</a>
          </span>
        </div>
      </div>
      <!-- Conquistas -->
      <div class="perfil-cards conquistas semClick"> 
        <!-- Modal Conquistas -->
        <!-- v-on:click="abreModal('conquistas-modal', 'conquistas-link')" -->
        <!-- <a href="#conquistas-modal" rel="modal:open" id="conquistas-link" class="dNone">Conquistas Modal</a> -->
        <div class="perfil-cards-icone conquistas">
          <i class="fas fa-award icon-conquistas transition"></i>
        </div>
        <div class="perfil-cards-texto">
          <h2> {{ titConquistas }} </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

import { baseUrlApi } from '../metodos/metodos'

import { VueSvgGauge } from 'vue-svg-gauge'

export default {
  data(){
    return{
      nomeFuncionario: '---',
      operacaoFuncionario: '---',
      performanceFuncionario: 0,
      posicao: '',
      rendimento: "",
      progressoBarra: '0',
      titShopping: 'Shopping',
      titExtrato: 'Extrato',
      titConquistas: 'Conquistas',
      txtHoverRanking: 'Posição Atual no Ranking',
      statusExtrato: true,
      atualizacao: '',
      // visivel: false,
      titVisualizar: 'Visualizar',
      titEsconder: 'Esconder'
    };
  },
  methods: {
    abreModal(id, idModal, event) {
      let perfilFoto = document.querySelector('#perfil-foto')
      if(idModal == "perfil-modal"){
        perfilFoto.style.zIndex = '4'
        if(document.querySelector('#perfil-modal').style.display == 'inline-block'){
          return
        }
      }else{
        perfilFoto.style.zIndex = '1'
      }

      if(this.erroReqOpe){
        return
      }

      if(event){
        if(event.target == document.querySelector('#extrato') || event.target == document.querySelector('.fas.fa-piggy-bank')){
          return
        }
      }

      var link = document.querySelector("#" + id);
      link.click();

      $("#" + idModal).modal({
        fadeDuration: 100
      });
    },
    ...mapMutations(['carregaExtrato', 'carregaProdutos', 'setSvgAvatar', 'setUrlAvatar', 'alteraVisibilidade']),

    // Recebendo Extrato
    async extrato(){
      
      if(!this.statusExtrato){
        if(document.querySelector('.toasted.toasted-primary.error')){
          return
        }else{
          this.$toasted.global.defaultError();
        }
        return
      }

      await axios
        .post(`${baseUrlApi}webservices/intergrallapi/kpi/extrato`)
        .then(
          response => {
            if(response.data.status == 'OK'){
              this.carregaExtrato(response.data.extrato)
              this.abreModal('extrato-modal', 'extrato-link')
            }else{
              if(document.querySelector('.toasted.toasted-primary.error')){
                return
              }else{
                this.$toasted.global.defaultError();
              }
              console.log('Extrato Status NOK: ', response.data)
            }
          }
        )
        .catch(
          error => {
            if(document.querySelector('.toasted.toasted-primary.error')){
              return
            }else{
              this.$toasted.global.defaultError();
            }
            console.log('Erro Carregar Extrato: ', error)
          }
        )
    },
    // Recebendo Produtos
    async shopping(){
      let objIdAnalise = {
        id_analise: this.idAnalise
      }

      objIdAnalise = JSON.stringify(objIdAnalise)

      await axios
      .post(`${baseUrlApi}webservices/intergrallapi/kpi/produtos/lista`, objIdAnalise)
      .then(response => {
        if(response.data.status == 'OK'){
          this.carregaProdutos(response.data.produtos)
        }else{
          console.log('Status Carrega Produtos NOK: ', response.data)
          this.statusExtrato = false
        }
      })
      .catch(error => {
        this.statusExtrato = false
        console.log('Erro Carrega Produtos: ', error)
      })
    },
    tratamentoErroPerfilCards(){
      let camposDosCards = document.querySelectorAll('.cards .bg-transparent')
      for(let i = 0; i < camposDosCards.length; i++){
        if(camposDosCards[i].getAttribute('id') == 'conquistas'){
          camposDosCards[i].innerHTML = '<p>---</p>'
        }else{
          camposDosCards[i].textContent = '---'
        }

        camposDosCards[i].classList.remove('bg-transparent')
      }
    },
    toggleClasse() {

      if(this.erroReqOpe){
        return
      }

      var avatarPrincipal = document.querySelector("#perfil-avatar")
      var avatarEdita = document.querySelector("#perfil-edita-avatar")
      var circuloAvatar = document.querySelector("#perfil-circulo")

      if(document.querySelector('#perfil-modal').style.display == 'inline-block'){
        this.$removeClasse(avatarPrincipal, "blur")
        this.$addClasse(avatarEdita, "opacity")
        this.$removeClasse(circuloAvatar, "circuloAvatar")
        
        return
      }

      avatarPrincipal.classList.toggle("blur");
      avatarEdita.classList.toggle("opacity");
      circuloAvatar.classList.toggle("circuloAvatar");
    },
    preencheDados(dados) {
      this.nomeFuncionario = dados.nome;
      this.nomeFuncionario = this.nomeFuncionario == '' ? '---' : this.nomeFuncionario
      
      this.operacaoFuncionario = dados.representante;
      this.operacaoFuncionario = this.operacaoFuncionario == '' ? '---' : this.operacaoFuncionario

      this.performanceFuncionario = dados.performance;
      if(this.performanceFuncionario !== ''){
        this.performanceFuncionario = this.performanceFuncionario.replace(',','.')
        this.performanceFuncionario = parseFloat(this.performanceFuncionario)
      }else{
        this.performanceFuncionario = '---'
      }
    },
    verificaComparativo(direcaoSeta) {

      if(this.posicao == ''){
        return
      }  
      
      let iconeComparativo = document.querySelector(".comparativo")

      if(!iconeComparativo){
        return
      }
      switch(direcaoSeta){
        case 'up':
          this.$addClasse(iconeComparativo, "fas")
          this.$addClasse(iconeComparativo, "fa-sort-up")
          this.$addClasse(iconeComparativo, "positivo")
        break
        case 'down':
          this.$addClasse(iconeComparativo, "fas")
          this.$addClasse(iconeComparativo, "fa-sort-down")
          this.$addClasse(iconeComparativo, "negativo")
        break
        case 'mesmo':
          this.$addClasse(iconeComparativo, "fas")
          this.$addClasse(iconeComparativo, "fa-caret-right")
          this.$addClasse(iconeComparativo, "mesmo")
        break
        case 'ntem':
          this.$addClasse(iconeComparativo, "ntem")
        break;
        default:
        return
      }

    },
    // iniciarProgresso() {
		// 	let valor = 0
		// 	const temporizador = setInterval( () => {
		// 		valor += 5
		// 		this.progressoBarra = `${valor}%`
		// 		if(valor == 65){
		// 			clearInterval(temporizador)
		// 		}
		// 	}, 100)
    // },
    // exibeXp(){
    //   let span = document.querySelector('.indicador-level')
    //   let xp = '300/500'

    //   span.textContent = xp
    // },
    // exibeLevel(){
    //   let span = document.querySelector('.indicador-level')
    //   let level = 'Level 1'

    //   span.textContent = level
    // },
    reqPerfil(){
      axios
      .post(
        `${baseUrlApi}webservices/intergrallapi/kpi/operacional`
      )
      .then(response => {
        if (response.data.status == "OK") {

          if(response.data.operador.avatar !== ''){
            this.getSvgAvatar(response.data.operador.avatar)
          }else{
            this.getSvgAvatar(this.criaUrlAvatarPadrao())
          }

          this.preencheDados(response.data.operador)

          this.posicao = response.data.operador.ranking_bsc
          this.verificaComparativo(response.data.operador.ranking_seta)
          
          // this.iniciarProgresso()
        }else{
          console.log('Perfil Cards status NOK: ', response.data)
          this.tratamentoErroPerfilCards()
        }
      })
      .catch(error => {
        console.log('Erro Perfil Cards: ', error);
        this.tratamentoErroPerfilCards()
      });
    },
    getSvgAvatar(urlAvatar){
      let objAvatar = {
        url: urlAvatar
      }

      // Para ser usado no modalPerfil
      this.setUrlAvatar(urlAvatar)

      objAvatar = JSON.stringify(objAvatar)

      axios.
        post(`${baseUrlApi}webservices/intergrallapi/kpi/avatar/request`, objAvatar)
        .then(
          response => {
            if(response.data.status == 'OK'){
              this.setSvgAvatar(response.data.dados)
            }else{
              console.log('Svg Avatar Status NOK: ', response.data)
            }
          }
        )
        .catch(
          error => {
            console.log('Erro Svg Avatar: ', error)
          }
        )
    },
    criaUrlAvatarPadrao(){
      return 'https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Tanned'
    },
    formataHoraUltimaAtualizacao(){
      let data = new Date()
    
      let horas = data.getHours()
      horas = horas < 10 ? '0' + horas : horas

      let minutos = data.getMinutes()
      minutos = minutos < 10 ? '0' + minutos : minutos

      this.atualizacao = horas + ':' + minutos
    },
    traduzTexto(){
      setTimeout(() => {
        this.titShopping       = this.todosOsTextos.TIT_RESGATE
        this.titExtrato        = this.todosOsTextos.TIT_EXTRATO
        this.titConquistas     = this.todosOsTextos.TIT_CONQUISTA
        this.txtHoverRanking   = this.todosOsTextos.TIT_HOVER_RANKING
        this.titVisualizar     = this.todosOsTextos.TIT_VISUALIZAR
        this.titEsconder       = this.todosOsTextos.TIT_ESCONDER
      }, 300)
    }
  },
  components: {
    VueSvgGauge
  },
  mounted() {
    this.reqPerfil()
    this.formataHoraUltimaAtualizacao()
    this.traduzTexto()
  },
  computed: {
    ...mapGetters({
      erroReqOpe: 'verificaErroReqOpe',
      saldo: 'saldoAtual',
      todosOsTextos: 'getTodosOsTextos',
      idAnalise: 'getIdAnalise',
      corSecundaria: 'getCorSecundaria',
      svgAvatar: 'getSvgAvatar',
      visivel: 'getVisibilidade'
    })
  }
};
</script>