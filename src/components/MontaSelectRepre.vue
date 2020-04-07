<template>
  <select name="representante" id="representante">
    <option value="todos">Todos</option>
    <option 
      v-for="montaRepre in dados" :key="montaRepre.vlr_classe" 
      v-bind:value=montaRepre.vlr_classe>
      {{ montaRepre.desc_classe }}
    </option>
  </select>
</template>

<script>
import representante from "../services/representante";
// import apiTeste from "../services/api";
import { apiTeste } from "../services/api";

export default {
  data(){
    return {
      dados: Array
    }
  },
  methods: {
    async recebeDados(){
      const response = await apiTeste.post('/rotinas/monta-combo',representante);
      return response.data.ret;
    },
  },
  mounted(){
  this.recebeDados()
    .then(response => {
      this.dados = response;
    })
    .catch(err => {
      console.log(err)
    });
  }
}

</script>