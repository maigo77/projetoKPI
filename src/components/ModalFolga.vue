<template>
  <!-- Ajustar esse arquivo -->
  <div id="folga-modal" class="modal">
    <TratamentoDeErros cor="#FFF" v-if="erroReqDatas" :msg="mensagem" />
    
    <template v-else>
      <div id="folgas-disponiveis">
        <h2> {{ titAgendamentoFolga }} </h2>
      </div>

      <input type="hidden" id="arrDatas" :value="JSON.stringify(arrDatas)">

      <div id="dncalendar-container"></div>
      
      <div id="legenda-calendario">
        <ul>
          <li>
            <div class="quadrado disp">
              <div></div>
            </div>
            - {{ titDataDisponivel }}
          </li>
          <li>
            <div class="quadrado indisp">
              <div></div>
            </div>
            - {{ titDataIndisponivel }}
          </li>
          <li>
            <div class="quadrado hoje">
              <div></div>
            </div>
            - {{ titDiaDeHoje }}
          </li>
          <li>
            <div class="quadrado folga-marcada">
              <div></div>
            </div>
            - {{ titFolgaSolicitada }}
          </li>
          <li>
            <div class="quadrado folga-confirmada">
              <div></div>
            </div>
            - {{ titFolgaConfirmada }}
          </li>
          <li>
            <div class="quadrado folga-recusada">
              <div></div>
            </div>
            - {{ titFolgaRecusada }}
          </li>
        </ul>
      </div>

      <div id="confirma-folga" class="dNone">
        <h2> {{ titConfirmaFolga }} </h2>
        <div class="bg-white">
          <p>
            {{ msg }} <span> {{ dia + "/" + mes }}</span>?
          </p>
          <div>
            <div class="confirma-folga" v-on:click="solicitaFolga()">
              <p>
                {{ msgBtn }}
              </p>
            </div>
            <div class="cancela-folga bg-btn-red" v-on:click="recusaFolga()">
              <p>
                {{ titCancelar }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";

import TratamentoDeErros from './TratamentoDeErros'

import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

import axios from 'axios'

import { baseUrlApi } from '../metodos/metodos'

export default {
  data(){
    return{
      dia: 0,
      mes: '',
      msg: '',
      msgBtn: '',
      diaClicado: undefined,
      token: "",
      erroReqDatas: false,
      arrDatas: [],
      titAgendamentoFolga: "Agendamento de Folga",
      titDiaDeHoje: "Dia de Hoje",
      titDataIndisponivel: "Data Indisponível",
      titDataDisponivel: "Data Disponível",
      titFolgaSolicitada: "Folga Solicitada",
      titFolgaConfirmada: "Folga Confirmada",
      titFolgaRecusada: "Folga Recusada",
      titConfirmaFolga: "ConfirmaÃ§Ã£o de folga",
      titCancelar: "Cancelar",
      janeiro: "Janeiro",
      fevereiro: "Fevereiro",
      marco: "MarÃ§o",
      abril: "Abril",
      maio: "Maio",
      junho: "Junho",
      julho: "Julho",
      agosto: "Agosto",
      setembro: "Setembro",
      outubro: "Outubro",
      novembro: 'Novembro',
      dezembro: "Dezembro",
      dom: 'Domingo',
      seg: 'Segunda-Feira',
      terca: 'Terça-Feira',
      quarta: 'Quarta-Feira',
      quinta: 'Quinta-Feira',
      sexta: 'Sexta-Feira',
      sabado: 'SÃ¡bado'
    }
  },
  methods: {
    chamaCalendario(){
      let calendario = $('#dncalendar-container').dnCalendar({
        dataTitles: {
          defaultDate: 'default',
          today: ''
        },
        monthNames: [ this.janeiro, this.fevereiro, this.marco, this.abril, this.maio, this.junho, this.julho, this.agosto, this.setembro, this.outubro, this.novembro, this.dezembro ], 
	      dayNames: [ this.dom, this.seg, this.terca, this.quarta, this.quinta, this.sexta, this.sabado],
        dayClick: (dataSelecionada, mes, elem) => {

          let hoje = new Date().getDate()
          let mesAtual = new Date().getMonth() + 1
          
          if((mesAtual !== mes) && (mes !== mesAtual + 1)){
            return
          }else{
            if((hoje >= dataSelecionada) && (mes !== mesAtual + 1)){ // Caso a data seja o dia de hoje
              return
            }else{

              if(parseInt(this.folga.qtde_pendente) < 1 || document.querySelector('.note')){
                if(!document.querySelector('.toasted.toasted-primary.error')){
                  this.$toasted.global.folgaIndisponivel();
                }
                return
              }

              if(!elem.classList.contains('disponivel')){
                if(!document.querySelector('.toasted.toasted-primary.error')){
                  this.$toasted.global.diaIndisponivel();
                }
                return
              }

              if(elem.classList.contains('note')){
                if(!document.querySelector('.toasted.toasted-primary.error')){
                  this.$toasted.global.jaPossuiFolga();
                }
                return
              }

              this.$toggleClasse(elem, 'selected-date')

              let verificaClasse = document.querySelectorAll('.selected-date')
              if(verificaClasse.length > 1){
                for(let i = 0; i < verificaClasse.length; i++){
                  this.$removeClasse(verificaClasse[i], 'selected-date')
                }
                this.$toggleClasse(elem, 'selected-date')
              }
      
              if(document.querySelector('.selected-date')){
                this.$removeClasse(document.querySelector('#confirma-folga'), 'dNone')
              }else{
                this.$addClasse(document.querySelector('#confirma-folga'), 'dNone')
              }
              
              let btn  = document.querySelector('.confirma-folga')

              this.$removeClasse(btn, 'bg-btn-yellow')
              this.$addClasse(btn, 'bg-btn-green')
              

              dataSelecionada = dataSelecionada < 10 ? '0'+dataSelecionada : dataSelecionada
              this.dia = dataSelecionada

              mes = mes < 10 ? '0'+mes : mes
              this.mes = mes

              this.diaClicado = elem
            }
          }
        },
        notes: this.eventos
      })

      calendario.build()
    },
    recusaFolga(){
      let elem = this.diaClicado

      if(document.querySelector('.selected-date')){
        this.$removeClasse(document.querySelector('.selected-date'), 'selected-date')
      }
      
      this.$addClasse(document.querySelector('#confirma-folga'), 'dNone')
    },
    retornaDataFormatada(elem){
      let postDay = elem.getAttribute("data-date")
      let postMonth = elem.getAttribute("data-month")
      let postYear = elem.getAttribute("data-year")

      postDay = postDay.length == 1 ? "0" + postDay : postDay
      postMonth = postMonth.length == 1 ? "0" + postMonth : postMonth

      return postYear + '-' + postMonth + '-' + postDay
    },
    
    async apiSolicitaFolga(objFolga){
      let elem = this.diaClicado 

      await axios
        .post(`${baseUrlApi}webservices/intergrall-api/kpi/folga/resgatar/folga`, objFolga)
        .then(res => {
          if(res.data.status == 'OK'){
            this.$addClasse(elem, 'note')
            this.preencheEvento()
            this.$addClasse(document.querySelector('#confirma-folga'), 'dNone')
            this.atualizaSaldo(res.data.saldo)
            if(!document.querySelector('.toasted.toasted-primary.success')){
              this.$toasted.global.defaultSuccess()
            }
          }else{
            console.log('Folga nao foi agendada com sucesso: ', res)
            if(!document.querySelector('.toasted.toasted-primary.error')){
              this.$toasted.global.defaultError()
            }
          }
        })
        .catch(error => {
          console.log('Folga nao foi agendada com sucesso: ', error)
          if(!document.querySelector('.toasted.toasted-primary.error')){
            this.$toasted.global.defaultError()
          }
        })
    },

    ...mapMutations(['atualizaEventos', 'atualizaSaldo']),
    solicitaFolga(){
      
      new Promise(async (resolve, reject) => {
        await this.gerarToken()
        resolve(this.token)
      }).then(
        (token) => {
          let elem = this.diaClicado

          let dataFormatada = this.retornaDataFormatada(elem)
          let objFolga         = {}
          objFolga.data        = dataFormatada
          objFolga.token       = token
          objFolga.id_analise  = this.idAnalise
          objFolga.id_produto  = this.idProduto
          objFolga.zonaDeTeste = this.zonaDeTeste
          objFolga = JSON.stringify(objFolga)

          this.apiSolicitaFolga(objFolga)
        }
      )

    },
    async gerarToken(){
      await axios.
        post(`${baseUrlApi}webservices/intergrallapi/intergrall/token/logado`)
        .then(
          response => {
            if(response.data.status == 'OK'){
              this.token = response.data.token
            }else{
              console.log('Token nao foi gerado com sucesso: ', response)
            }
          }
        )
        .catch(
          error => { console.log(error) }
        )
    },
    preencheEvento(){
      let elem = this.diaClicado
      this.atualizaEventos(elem)
    },
    verificaDiasDisponiveis(){
      axios.
        post(`${baseUrlApi}webservices/intergrallapi/kpi/folga/lista`)
        .then(
          response => {
            if(response.data.status == 'OK'){
              this.arrDatas = response.data.datas
              this.preencheDiasDisponiveis(response.data.datas)
            }else{
              console.log('Erro de status dias indisponives: ', response)
              this.erroReqDatas = true
              this.mensagem = this.todosOsTextos.TIT_SEM_DATAS
            }
          }
        )
        .catch(
          error => {
            console.log('Erro na requisicao: ', error)
            this.erroReqDatas = true
            this.mensagem = this.todosOsTextos.ERRO_REQ_DATAS
          }
        )
    },
    preencheDiasDisponiveis(arrDatas){
      let todasDatasDisponiveis = document.querySelectorAll('.disponivel')
      let arrDatasDisponiveis = []
      for(let j = 0; j < arrDatas.length; j++){
        for(let i = 0; i < todasDatasDisponiveis.length; i++){

          todasDatasDisponiveis[i].classList.remove('disponivel', 'calendarClick')
          todasDatasDisponiveis[i].classList.add('indisponivel')
          todasDatasDisponiveis[i].setAttribute('id', '')

          let dia = todasDatasDisponiveis[i].dataset.date
          dia = dia < 10 ? '0'+dia : dia

          let mes = todasDatasDisponiveis[i].dataset.month
          mes = mes < 10 ? '0'+mes : mes

          const ano = todasDatasDisponiveis[i].dataset.year

          const data = ano + '-' + mes + '-' + dia

          if(data == arrDatas[j]){
            arrDatasDisponiveis.push(todasDatasDisponiveis[i])
          }
        }
      }
      
      for(let i = 0; i < arrDatasDisponiveis.length; i++){
        arrDatasDisponiveis[i].classList.remove('indisponivel')
        arrDatasDisponiveis[i].classList.add('disponivel', 'calendarClick')
        arrDatasDisponiveis[i].setAttribute('id', 'calendarClick')
      }
    },
    traduzTexto(){
      this.dom                 = this.todosOsTextos.TIT_DOM
      this.seg                 = this.todosOsTextos.TIT_SEG
      this.terca               = this.todosOsTextos.TIT_TERCA
      this.quarta              = this.todosOsTextos.TIT_QUARTA
      this.quinta              = this.todosOsTextos.TIT_QUINTA
      this.sexta               = this.todosOsTextos.TIT_SEXTA
      this.sabado              = this.todosOsTextos.TIT_SABADO

      this.titDataIndisponivel = this.todosOsTextos.TIT_DIA_INDISP
      this.titDataDisponivel   = this.todosOsTextos.TIT_DIA_DISP
      this.titAgendamentoFolga = this.todosOsTextos.TIT_AGENDAMENTO
      this.titDiaDeHoje        = this.todosOsTextos.TIT_DIA_DE_HOJE
      this.titFolgaSolicitada  = this.todosOsTextos.TIT_SOLICITADA
      this.titFolgaConfirmada  = this.todosOsTextos.TIT_CONFIRMADA
      this.titFolgaRecusada    = this.todosOsTextos.TIT_RECUSADA
      this.titConfirmaFolga    = this.todosOsTextos.TIT_CONFIRMACAO
      this.titCancelar         = this.todosOsTextos.TIT_CANCELAR
      this.msgBtn              = this.todosOsTextos.TIT_BTN
      this.msg                 = this.todosOsTextos.TIT_MSG_CONFIRMA

      this.janeiro             = this.todosOsTextos.TIT_JANEIRO
      this.fevereiro           = this.todosOsTextos.TIT_FEVEREIRO
      this.marco               = this.todosOsTextos.TIT_MARCO
      this.abril               = this.todosOsTextos.TIT_ABRIL
      this.maio                = this.todosOsTextos.TIT_MAIO
      this.junho               = this.todosOsTextos.TIT_JUNHO
      this.julho               = this.todosOsTextos.TIT_JULHO
      this.agosto              = this.todosOsTextos.TIT_AGOSTO
      this.setembro            = this.todosOsTextos.TIT_SETEMBRO
      this.outubro             = this.todosOsTextos.TIT_OUTUBRO
      this.novembro            = this.todosOsTextos.TIT_NOVEMBRO
      this.dezembro            = this.todosOsTextos.TIT_DEZEMBRO
    }
  },
  mounted(){
    this.traduzTexto()

    this.verificaDiasDisponiveis()

    if(!this.erroReqDatas){
      this.chamaCalendario()
    }
  },
  computed: {
     ...mapGetters({
      folga: 'folgaAtual',
      eventos: 'getEventos',
      idProduto: 'getIdProduto',
      todosOsTextos: 'getTodosOsTextos',
      idAnalise: 'getIdAnalise',
      zonaDeTeste: 'getZonaDeTeste'
    })
  },
  components: {
    TratamentoDeErros
  }
}
</script>