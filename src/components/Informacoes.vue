<template>
  <div id="informacoes-aux">
    <div class="header-result bg-dark">
      <div class="titulo">
        <h2>{{ tituloInformacoes }}</h2>
      </div>
    </div>
    <div id="informacoes" :class="{grafVazio}">
      <template v-if="!grafVazio">
        <div class="graph-results" :class="{'centralizar': carregando}">
          
          <Gif v-if="carregando"/>
          
          <template v-else>
            <listaCards
              v-for="(dados, i) in dadosTabelaDestaqueS"
              :key="i+'_DESTAQUE'"
              :id="i+'_DESTAQUE'"
              :tamGrafico="235"
              :titFontSize="'20px'"
              :titOffsetY="15"
              :lineSize="'30%'"
              :principal="true"
              :rankingFontSize="'18px'"
              :titAtualizacao="formataData(dados.data_maior_registro)"
              :status="dados.status"
              :seta="trataSeta(dados.seta, dados.status, dados.comparativo)"
              :titulo="dados.titulo"
              :titMeta="titMeta"
              :valorMeta="dados.meta"
              :metaFormatada="dados.meta_formatada"
              :titVoce="titVoce"
              :valorVoce="dados.m0"
              :voceFormatada="dados.m0_formatada"
              :titPrimeiro="titPrimColocado"
              :valorPrimeiro="dados.top1_real"
              :primeiroFormatada="dados.top1_formatada"
              :ranking="dados.ranking"
            />
          </template>
        </div>
        <div class="graph-results">
          <listaCards
            v-for="(dados, i) in dadosTabelaDestaqueN"
            :key="i+'_SEM_DESTAQUE'"
            :id="i+'_SEM_DESTAQUE'"
            :tamGrafico="175"
            :titFontSize="'16px'"
            :titOffsetY="10"
            :lineSize="'25%'"
            :principal="false"
            :rankingFontSize="'14px'"
            :titAtualizacao="formataData(dados.data_maior_registro)"
            :status="dados.status"
            :seta="trataSeta(dados.seta, dados.status, dados.comparativo)"
            :titulo="dados.titulo"
            :titMeta="titMeta"
            :valorMeta="dados.meta"
            :metaFormatada="dados.meta_formatada"
            :titVoce="titVoce"
            :valorVoce="dados.m0"
            :voceFormatada="dados.m0_formatada"
            :posicaoKpi="dados.ranking = dados.status == 'S' ? '0' : dados.ranking"
            :titPrimeiro="todosOsTextos.TIT_PRIM_COLOCADO"
            :valorPrimeiro="dados.top1_real"
            :primeiroFormatada="dados.top1_formatada"
            :ranking="dados.ranking"
          />
        </div>
      </template>
      <TratamentoDeErros v-else margin="15px auto" :msg="txtMsgErroInfo"/>
    </div>
    <div class="graph-legenda" v-if="!grafVazio">
      <span class='titulo-legenda'> {{ titLegenda }} </span>
      <div class="circulo meta"></div>
      <span> {{ titMeta }} </span>
      <div class="circulo voce"></div>
      <span> {{ titVoce }} </span>
      <div class="circulo primeiro"></div>
      <span> {{ titPrimColocado }} </span>
      <span> {{ titComparadoOntem }}: </span>
      <div class="seta-direcao up">
        <i class="fas fa-sort-up"></i>
      </div>
      <span> {{ titMelhor }} </span>
      <div class="seta-direcao mesmo">
        <i class="fas fa-sort-up"></i>
      </div>
      <span> {{ titIgual }} </span>
      <div class="seta-direcao down">
        <i class="fas fa-sort-down"></i>
      </div>
      <span> {{ titPior }} </span>
      <div class="seta-direcao ntem"></div>
      <span> {{ titSemComparativo }} </span>
    </div>
  </div>
</template>

<script>
import Gif from './templates/Gif'
import TratamentoDeErros from './TratamentoDeErros'
import listaCards from './ListaCards'

import { mapGetters } from 'vuex'
import { baseUrlApi } from '../metodos/metodos'

import axios from 'axios'

import 'balloon-css'

export default {
  data() {
    return {
      dadosTabela: [],
      dadosTabelaDestaqueS: [],
      dadosTabelaDestaqueN: [],
      labelTitleYou: String,
      labelTitlePosition: String,
      tituloInformacoes: 'Meus Resultados',
      grafVazio: false,
      txtMsgErroInfo: 'Nenhum dado disponível',
      titLegenda: 'Legenda',
      titVoce: 'VocÃª',
      titPrimColocado: '1º Colocado',
      titMelhor: 'Melhor',
      titIgual: 'Igual',
      titPior: 'Pior',
      titSemComparativo: 'Sem Comparativo',
      hora: '',
      tituloAtualizacao: 'Atualizado às',
      txtVerMais: 'Ver mais',
      titMeta: 'Meta',
      titRanking: 'Ranking',
      titComparadoOntem: 'Comparado a ontem',
      carregando: true
    }
  },
  components: {
    Gif,
    TratamentoDeErros,
    listaCards
  },
  methods: {
    filtraTabelaDestaqueS(value){
      if(value.titulo == '' ||  value.status == ''){
        return
      }else if(value.destaque == 'SIM'){
        if(value.status == 'S' || value.m0 == '' || value.top1_real == '' || value.meta == ''){
          value.meta = 0
          value.m0 = 0
          value.top1_real = 0
          value.ranking = 0
        }
        return value
      }
    },
    filtraTabelaDestaqueN(value){
      if(value.titulo == '' ||  value.status == ''){
        return
      }else if(value.destaque == 'NAO'){
        if(value.status == 'S' || value.m0 == '' || value.top1_real == '' || value.meta == ''){
          value.meta = 0
          value.m0 = 0
          value.top1_real = 0
          value.ranking = 0
        }
        return value
      }
    },
    removeZIndexPerfilFoto(){
      let perfilFoto = document.querySelector('#perfil-foto')
      if(perfilFoto){
        perfilFoto.style.zIndex = '1'
      }
    },
    formataData(data){
      if(data === "1111-11-11" || data == ''){
        return ''
      }
      data = data.replace(/-/g, "/").split("/").reverse().join("/")
      return this.tituloAtualizacao + ': '+  data
    },
    verificaGrafVazio(){
      if(this.dadosTabela.length == 0 || document.querySelector('.graph-results').childElementCount == 0 ){
        return this.grafVazio = true
      }else{
        return this.grafVazio = false
      }
    },
    recuperarDadosKPI(){
      axios
        .post(
          `${baseUrlApi}webservices/intergrallapi/kpi/operacional`
        )
        .then(response => {
          if (response.data.status == "OK") {
            this.dadosTabela = response.data.kpis
            this.dadosTabelaDestaqueS = this.dadosTabela.filter(this.filtraTabelaDestaqueS)

            this.dadosTabelaDestaqueN = this.dadosTabela.filter(this.filtraTabelaDestaqueN)

            this.verificaDadosVazios(this.dadosTabelaDestaqueS, this.dadosTabelaDestaqueN)
          }else{
            console.log('Recuperar Dados KPI status NOK: ', response.data)
          }
          setTimeout(
            () => {
              this.carregando = false
              this.verificaGrafVazio()
            }, 1000
          )
        })
        .catch(error => {
          console.log('Erro Recuperar Dados KPI: ', error)
          setTimeout(
            () => {
              this.carregando = false
              this.verificaGrafVazio()
            }, 1000
          )
        });
    },
    verificaDadosVazios(arr1, arr2){
      if(arr1.length <= 0){
        document.querySelectorAll('.graph-results')[0].remove()
      }

      if(arr2.length <= 0){
        document.querySelectorAll('.graph-results')[1].remove()
      }
    },
    trataSeta(seta, status, comparativo){
      
      if(status == 'S'){
        return seta = 'ntem'
      }else{
        if(typeof comparativo == 'object'){
          return seta = comparativo.seta
        }else{
          return seta
        }
      }
    },
    traduzTexto(){
      setTimeout(() => {
        this.tituloInformacoes = this.todosOsTextos.TIT_KPI
        this.txtMsgErroInfo    = this.todosOsTextos.TIT_MSG_ERRO_INFO
        this.titLegenda        = this.todosOsTextos.TIT_LEGENDA
        this.titVoce           = this.todosOsTextos.TIT_VOCE
        this.titPrimColocado   = this.todosOsTextos.TIT_PRIM_COLOCADO
        this.titMelhor         = this.todosOsTextos.TIT_MELHOR
        this.titIgual          = this.todosOsTextos.TIT_IGUAL
        this.titPior           = this.todosOsTextos.TIT_PIOR
        this.titSemComparativo = this.todosOsTextos.TIT_SEM_COMPARATIVO
        this.tituloAtualizacao = this.todosOsTextos.TIT_ATUALIZADO
        this.txtVerMais        = this.todosOsTextos.TIT_VER_MAIS
        this.titComparadoOntem = this.todosOsTextos.TIT_COMPARADO_ONTEM
        this.titMeta           = this.todosOsTextos.TIT_META
        this.titRanking        = this.todosOsTextos.TIT_RANKING
      }, 300)
    },
    formataHoraUltimaAtualizacao(){
      let data = new Date()
    
      let horas = data.getHours()
      horas = horas < 10 ? '0' + horas : horas
      let minutos = data.getMinutes()
      minutos = minutos < 10 ? '0' + minutos : minutos
      this.hora = horas + ':' + minutos
    }
  },
  mounted() {

    this.traduzTexto()
    
    this.formataHoraUltimaAtualizacao()
    this.objOp = JSON.stringify(this.objOp)
    this.recuperarDadosKPI()
  },
  computed: {
    ...mapGetters({
      erroReqOpe: 'verificaErroReqOpe',
      todosOsTextos: 'getTodosOsTextos'
    })
  }
};
</script>