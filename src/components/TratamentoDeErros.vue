<template>
  <div id="tratamento-de-erros" class="bg-transparent" :style="{margin}">
    <i class="fas fa-exclamation-triangle"></i>
    <h2 :style="{color: cor}" v-html="msg"> Erro Inesperado</h2>
  </div>
</template>

<script>
  export default { 
    props: ['cor', 'margin', 'msg']
   }
</script>