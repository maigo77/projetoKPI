<template>
  <!-- <div></div> -->
  <!-- Nivel: Situação das PA's para deslogar -->
  <div id="chat-container">
    <div id="chat" :class="{'centralizar': !chatLoad, 'closed': !chatAberto}">
      <Gif v-if="!chatLoad" />
      <iframe id="iframe-chat" :src="link" v-on:load="chatLoad = true" frameborder="0" crossorigin="*"></iframe>
    </div>
    <div id="notificacao" v-if="exibeNotificacao">
      <i class="fas fa-bell ring"></i>
    </div>
    <div id="container-mensagem" class="bg-dark" v-on:click="mudaEstadoChat()">
      <i :class="{'fas fa-comments': !chatAberto, 'fas fa-times rotate': chatAberto}"></i>
    </div>
  </div>
</template>

<script>

import Gif from './Gif'
import { baseUrlApi } from '../../metodos/metodos'

import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  data(){
    return{
      chatLoad: false,
      link: `${baseUrlApi}callcenter/im_link_padrao.php?strAut=hkfvUszoXGRM7Y7O2VeLR0bBbLX7MgxvqmLdMxv253v2uqoWHJ3Wz6i4QBv5ZEPJ`,
      exibeNotificacao: false,
      chatAberto: false
    }
  },
  components: {
    Gif
  },
  methods: {
    mudaEstadoChat(){
      this.chatAberto = !this.chatAberto

      this.retiraNotificacao()
    },
    retiraNotificacao(){
      if(this.chatAberto && this.exibeNotificacao == true){
        this.exibeNotificacao = false
      }
    },
    
    ...mapMutations(['setNovaNotificacao']),

    recebeMensagem(evento){
      let url = baseUrlApi.substring(0, baseUrlApi.length - 1)

      if(evento.origin != url){ 
        // console.log('Origem do evento: |' + evento.origin + '|')
        return
      }

      this.setNovaNotificacao(true)
      this.verificaMensagemLida()
    },
    escutaNovaNotificacao(){
      window.addEventListener("message", this.recebeMensagem, false)
    },
    verificaMensagemLida(){

      if(!this.chatAberto){
        this.exibeNotificacao = true
        if(!document.querySelector('.toasted.toasted-primary.success')){
          this.$toasted.global.novaMensagem();
        }
      }
    }
  },
  mounted(){
    this.escutaNovaNotificacao()
  },
  computed: {
    ...mapGetters({
      novaNotificacao: 'getNovaNotificacao'
    })
  }
}
</script>