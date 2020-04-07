<template>
  <div class="btn-personalizado" :style="{width, height, opacity, padding, margin}" v-on:click="funcao">
    <p v-html="p"></p>
    <span v-if="habilitaSpan" v-html="span"></span>
  </div>
</template>

<script>
export default {
  props: {
    width: String,
    height: String,
    padding: String,
    opacity: Number,
    margin: String,
    habilitaSpan: Boolean,
    span: String,
    p: String,
    funcao: Function
  }
}
</script>

<style>

</style>