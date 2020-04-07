<template>
  <div id="popUp-bloqueio">
    <div class="noticias-popup">
      <div class="noticias-popup-titulo">
        <h1> <i class="fas fa-newspaper"></i> {{ noticiaTitulo }} </h1>
      </div>
      <div class="conteudo-container">
        <div class="noticia-popup-capa">
          <img :src="noticiaCapa">
        </div>
        <div class="noticias-popup-conteudo" v-html="conteudoNoticia"></div>
        <Botao id="btn-popup" :funcao="acaoPopUpBloqueio" :width="'65%'" :margin="'15px auto 0 auto'" :height="'35px'" :opacity=".8" :p="txtMarcarComoLido"/> 
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

import { baseUrlApi } from '../../metodos/metodos'

import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

import Botao from './Botao'

export default {
  props: ['noticias'],
  data(){
    return{
      indice: 0,
      conteudoNoticia: '',
      noticiaCapa: '',
      noticiaTitulo: '',
      txtMarcarComoLido: 'Marcar como Lido'
    }
  },
  components:{
    Botao
  },
  methods:{
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
            }else{
              this.conteudoNoticia = response.data.noticias[1].conteudo
              this.noticiaCapa     = response.data.noticias[1].url_capa
              this.noticiaTitulo   = response.data.noticias[1].titulo
            }

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
    acaoPopUpBloqueio(){
      this.confirmaLeitura(this.noticias[this.indice].seq)
      this.incrementaNoticia()
    },
    confirmaLeitura(idNoticia){
      let botao = document.querySelector('#btn-popup')

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
    ...mapMutations(['setExibePopUp']),
    incrementaNoticia(){
      if(this.indice < (this.noticias.length - 1)){  
        this.indice += 1
        this.carregaConteudoNoticia(this.noticias[this.indice].capa, this.noticias[this.indice].seq)
      }else{
        this.setExibePopUp(false)
      }
    }
  },
  computed: {
    ...mapGetters({
      todosOsTextos: 'getTodosOsTextos'
    })
  },
  mounted(){
    this.carregaConteudoNoticia(this.noticias[this.indice].capa, this.noticias[this.indice].seq)
    setTimeout(
      () => {
        this.txtMarcarComoLido = this.todosOsTextos.TIT_MARCAR_LIDO
      }, 300
    )
  }
}
</script>

<style>

</style>