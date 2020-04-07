<template>
  <div id="noticias-container">
    <div id="noticias-titulo" class="bg-dark">
      <h2> {{ titNoticias }} </h2>
    </div>
    <div id="noticias">
      <carousel 
        v-if="!erroReqNot && !naoHaNoticias" 
        :navigationClickTargetSize="13" 
        autoplay 
        autoplayHoverPause
        :perPage="1"
        :autoplayTimeout="5000"
        loop
        navigationEnabled
        :paginationColor="'rgba(255, 255, 255, 0.5)'">
          <slide 
            v-for="noticia in todasNoticias"
            :key="noticia.seq"
            :style="{ backgroundImage: `url('${noticia.url_capa}')`, backgroundSize: 'cover' }">
            <h1 class="bg-transparent" v-on:click="carregaConteudoNoticia(noticia.capa, noticia.seq)"> {{ noticia.titulo }} </h1>
            <!-- Modal -->
            <a :id="formataId('link', noticia.capa)" :href="'#' + formataId('noticia', noticia.capa)" rel="modal:open" class="dNone">Noticia Detalhe</a>
            <div class="modal estilo-modal" :id="formataId('noticia', noticia.capa)" > 
              <div class="noticia-titulo">
                <h1> <i class="fas fa-newspaper"></i> {{ noticiaTitulo }} </h1>
              </div>
              <div class="noticia-capa">
                <img :src="noticiaCapa">
              </div>
              <div class="noticia-conteudo" v-html="conteudoNoticia"></div>  
              <div 
                class="noticia-controle-leitura habilitado" 
                v-on:click="confirmaLeitura(noticia.seq, $event)"
                v-if="noticia.controle_leitura == 'S' && jaFoiLido !== 'LIDO' ">
                {{ txtMarcarComoLido }}
              </div>
            </div>
          </slide>
      </carousel>
      <TratamentoDeErros v-else-if="erroReqNot" />
      <div 
        class="tratamento-de-erros bg-transparent"
        v-if="naoHaNoticias">
        <i class="fas fa-newspaper"></i>
        <h2> {{ txtNaoHaNoticias }} </h2>
      </div>
    </div>
    <PopUpBloqueio 
      v-if="exibePopUp"
      :noticias="noticiasPopUp"/>
  </div>
</template>

<script>
import axios from 'axios'

import TratamentoDeErros from './TratamentoDeErros'
import PopUpBloqueio from './templates/PopUpBloqueio'

import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

import { baseUrlApi } from '../metodos/metodos'

export default {
  data() {
    return{
      conteudoNoticia: String,
      noticiaCapa: String,
      noticiaTitulo: String,
      jaFoiLido: '',
      leitura: '',
      txtMarcarComoLido: '',
      naoHaNoticias: false,
      txtNaoHaNoticias: 'Não há notícias',
      titNoticias: 'Konectados na Not�cia'
    }
  },
  methods: {
    formataId(complemento, id){
      id = complemento+"_"+id
      return id
    },
    abreModal(id){
      let btnAbrirModal = document.querySelector('#link_'+id)
      btnAbrirModal.click()
    },

    ...mapMutations(['falhaNaRequisicaoNot', 'setTodasNoticias', 'setNoticiasPopUp', 'setExibePopUp']),

    reqNoticias(){
      axios
        .post(`${baseUrlApi}webservices/intergrallapi/kpi/noticias`)
        .then(
          response => {
            if(response.data.status == 'OK'){
              this.setTodasNoticias(response.data.noticias)
              this.verificaSeHaPopUp()
            }else{
              console.log('Status do Carrosel NOK: ', response.data)
              this.naoHaNoticias = true
            }
          }
        )
        .catch(
          error => {
            console.log('Erro no Carrosel: ', error)
            this.falhaNaRequisicaoNot(true)
          }
        )
    },
    async verificaSeHaPopUp(){
      for(let i = 0; i < this.todasNoticias.length; i++){
        if(this.todasNoticias[i].controle_leitura == 'S' && this.todasNoticias[i].display_popup == 'S'){
          await this.verificaSeFoiLido(this.todasNoticias[i].seq)
          
          if(this.leitura == "NAO_LIDO"){
            this.setNoticiasPopUp(this.todasNoticias[i])
            this.setExibePopUp(true)
          }
        }
      }
    },
    async verificaSeFoiLido(chave){
      let objChave = {
        seq: chave
      }

      objChave = JSON.stringify(objChave)

      await axios
      .post(`${baseUrlApi}webservices/intergrallapi/kpi/noticia-detalhe`, objChave)
      .then(
        response => {
          if(response.data.status == "OK"){
            if(response.data.noticias[0].conteudo){
              this.leitura       = response.data.noticias[0].leitura
            }else{
              this.leitura       = response.data.noticias[1].leitura
            }
          }else{
            console.log('Verificacao Leitura NOK: ', response.data)
          }
        }
      )
      .catch(
        error => {
          console.log('Erro Verificacao Leitura:', error)
        }
      )

    },
    carregaConteudoNoticia(id, chave){ 

      let objChave = {
        seq: chave
      }

      objChave = JSON.stringify(objChave)

      axios
      .post(`${baseUrlApi}webservices/intergrallapi/kpi/noticia-detalhe`, objChave)
      .then(
        response => {

          if(response.data.status == "OK"){
            if(response.data.noticias[0].conteudo){
              this.conteudoNoticia = response.data.noticias[0].conteudo
              this.noticiaCapa     = response.data.noticias[0].url_capa
              this.noticiaTitulo   = response.data.noticias[0].titulo
              this.jaFoiLido       = response.data.noticias[0].leitura
            }else{
              this.conteudoNoticia = response.data.noticias[1].conteudo
              this.noticiaCapa     = response.data.noticias[1].url_capa
              this.noticiaTitulo   = response.data.noticias[1].titulo
              this.jaFoiLido       = response.data.noticias[1].leitura
            }

            this.abreModal(id)
          }else{
            console.log('Noticia Detalhe status NOK: ', response.data)
          }
        }
      )
      .catch(
        error => {
          console.log('Erro Noticia Detalhe:', error)
        }
      )
    },
    confirmaLeitura(idNoticia, event){
      let botao = event.target

      if(botao.classList.contains('desabilitado')){
        return
      }

      let objLeitura = {
        id_noticia: idNoticia
      }

      objLeitura = JSON.stringify(objLeitura)

      axios.post(`${baseUrlApi}webservices/intergrall-api/kpi/noticia/lida`, objLeitura)
        .then(
          response => {
            if(response.data.status == 'OK'){
              this.$addClasse(botao, 'desabilitado')
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
            console.log('Erro confirmacao leitura: ', error)
            if(document.querySelector('.toasted.toasted-primary.error')){
              return
            }else{
              this.$toasted.global.defaultError();
            }
          }
        ) 
    },
    traduzTexto(){
      setTimeout(() => {
        this.titNoticias = this.todosOsTextos.TIT_NOTICIAS
        this.txtMarcarComoLido = this.todosOsTextos.TIT_MARCAR_LIDO
        this.txtNaoHaNoticias  = this.todosOsTextos.TIT_NAO_HA_NOTICIAS
      }, 300)
    }
  },
  created(){
    this.reqNoticias()
  },
  components: {
    TratamentoDeErros,
    PopUpBloqueio
  },
  computed: {
    ...mapGetters({
      erroReqNot: 'verificaErroReqNot',
      todosOsTextos: 'getTodosOsTextos',
      todasNoticias: 'getTodasNoticias',
      noticiasPopUp: 'getNoticiasPopUp',
      exibePopUp: 'getExibePopUp'
    })
  },
  mounted(){
    this.traduzTexto()
  }
};
</script>
