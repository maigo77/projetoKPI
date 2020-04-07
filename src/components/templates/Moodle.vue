<template>
  <div></div>
  <!-- <section class="inicio section-width" id="moodle" :class="!iframeLoad ? 'centralizar' : ''">
    <Gif 
      v-if="!iframeLoad"
      :msg="msgMoodle">
    </Gif>
    <iframe :src="linkMoodle" v-on:load="verificaStatus($event)" frameborder="0"></iframe>
  </section> -->
</template>

<script>
import { mapGetters } from 'vuex'
import Gif from './Gif'

export default {
  data(){
    return{
      iframeLoad: false,
      msgMoodle: 'Aguardando conexão com o Moodle..',
      linkMoodle: ''
    }
  },
  methods:{
    alterarMsgMoodle(){
      setTimeout(
        () => {
          this.msgMoodle = this.todosOsTextos.TIT_MSG_MOODLE2
        }, 10000
      )
    },
    traduzTexto(){
      setTimeout(
        () => {
          this.msgMoodle = this.todosOsTextos.TIT_MSG_MOODLE1
        }, 100
      )
    },
    verificaStatus(ev){
      if(ev.target.getAttribute('src') !== 'http://177.130.112.172/login/index.php'){
        this.iframeLoad = false
      }else{
        this.iframeLoad = true
      }
    }
  },
  components: {
    Gif
  },
  computed: {
    ...mapGetters({
      todosOsTextos: 'getTodosOsTextos'
    })
  },
  mounted(){
    this.traduzTexto()
    this.alterarMsgMoodle()

    setTimeout(
      () => {
        this.linkMoodle = "http://177.130.112.172/login/index.php"
      }, 1000
    )
  },
}
</script>