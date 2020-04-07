<template>
  <div id="info-modal" class="modal">
    <div class="graph-results">
      <!-- <listaCards
        v-for="(dados, i) in dadosTabela"
        :tamGrafico="300"
        :titAtualizacao="formataData(dados.data_maior_registro)"
        :key="i+'_modal'"
        :status="dados.status"
        :seta="trataSeta(dados.seta, dados.status, dados.comparativo)"
        :titulo="dados.titulo"
        :meta="dados.meta_titulo"
        :totPrimeiro="dados.top1 = dados.status == 'S' ? '0' : dados.top1"
        :totPrimeiroForm="dados.top1_formatada = dados.status == 'S' ? '0' : dados.top1_formatada"
        :totUser="dados.atingido = dados.status == 'S' ? '0' : dados.atingido"
        :totUserForm="dados.m0_formatada = dados.status == 'S' ? '0' : dados.m0_formatada"
        :posicaoKpi="dados.ranking = dados.status == 'S' ? '0' : dados.ranking"
        :id="i+'_modal'"
        :titVoce="titVoce"
        :titPrimeiro="titPrimColocado"
        :titMeta="titMeta"
        :titRanking="titRanking"
        :titFontSize="'20px'"
      /> -->
    </div>
  </div>
</template>

<script>
import listaCards from './ListaCards'
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      titVoce: 'Você',
      titPrimColocado: '1º Colocado',
      titMeta: 'Meta',
      titRanking: 'Ranking'
    }
  },
  props: ['dadosTabela'],
  components: {
    listaCards
  },
  methods:{
    formataData(data){
      if(data === "1111-11-11"){
        return ''
      }
      data = data.replace(/-/g, "/").split("/").reverse().join("/")
      return this.tituloAtualizacao + ': '+  data
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
        this.titVoce           = this.todosOsTextos.TIT_VOCE
        this.titPrimColocado   = this.todosOsTextos.TIT_PRIM_COLOCADO
        this.titMeta           = this.todosOsTextos.TIT_META
        this.titRanking        = this.todosOsTextos.TIT_RANKING
      }, 300)
    }
  },
  computed:{
    ...mapGetters({
      todosOsTextos: 'getTodosOsTextos'
    })
  },
  mounted(){
    this.traduzTexto()
  }
}
</script>