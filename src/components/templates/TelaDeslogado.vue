<template>
  <div id="tela-deslogado" class="bg-dark">
    <div class="tela-deslogado-info bg-transparent">
      <i class="fas fa-exclamation-circle"></i>
      <h1> {{ this.mensagemPadrao }} </h1>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      mensagemPadrao: 'Acesso Negado'
    }
  },
  props: ['msg'],
  mounted(){
    if(this.msg !== ''){
      this.mensagemPadrao = this.msg
    }
  }
}
</script>