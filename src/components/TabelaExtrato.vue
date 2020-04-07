<template>
  <tr>
    <td> {{ formataOrigem(origem) }} </td>
    <td> {{ descricao }} </td>
    <td class="text-center" v-html="verificaOperacao(operacao) + ' ' + qtde"></td>
    <td :class="corStatus(statusFormatado)"> {{ formataStatus(status)  }} </td>
    <td> {{ formataData(data) }} </td>
    <td> {{ formataHora(hora) }} </td>
    <td class="text-center"> {{ formataData(dataFolga) }} </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      iconOperacao: '',
      statusFormatado: '',
      txtConcluido: 'Concluído',
      txtAnalise: 'Análise',
      txtAgendado: 'Agendado',
      txtRetirado: 'Retirado',
      txtPendente: 'Pendente'
    }
  },
  props: ['origem', 'descricao', 'qtde', 'operacao', 'status', 'data', 'hora', 'dataFolga'],
  methods: {
    verificaOperacao(operacao){
      if (operacao == "MAIS") {
        this.iconOperacao = '<i class="fas fa-plus color-green"></i>';
      } else {
        this.iconOperacao = '<i class="fas fa-minus color-red"></i>';
      }
      return this.iconOperacao
    },
    formataOrigem(txtOrigem){
      if(txtOrigem.length > 3){
        txtOrigem = txtOrigem[0].toUpperCase() + txtOrigem.substring(1).toLowerCase()
        return txtOrigem
      }else{
        return txtOrigem
      }
    },
    formataStatus(status){
      if(status == "ANALISE"){
        this.statusFormatado = this.txtAnalise
      }else if(status == "CONCLUIDO"){
        this.statusFormatado = this.txtConcluido
      }else if(status == "AGENDADO"){
        this.statusFormatado = this.txtAgendado
      }else if(status == "RETIRADO"){
        this.statusFormatado = this.txtRetirado
      }else if(status == "PENDENTE"){
        this.statusFormatado = this.txtPendente
      }else{
        this.statusFormatado = "---"
      }
      return this.statusFormatado
    },
    corStatus(status){
      let nomeClasse = ''
      if(status == this.txtAnalise){
        nomeClasse = 'color-lightblue'
      }else if(status == this.txtConcluido){
        nomeClasse = 'color-green'
      }else if(status == this.txtAgendado){
        nomeClasse = 'color-orange'
      }else if(status == this.txtRetirado){
        nomeClasse = 'color-blue'
      }else if(status == this.txtPendente){
        nomeClasse = 'color-pink'
      }

      return nomeClasse
    },
    formataData(data){
      if(data === "1111-11-11"){
        return '---'
      }
      data = data.replace(/-/g, "/").split("/").reverse().join("/")
      return data
    },
    formataHora(hora){
      hora = hora.slice(0, 5).replace(":", "H")
      return hora
    },
    traduzTexto(){
      setTimeout(() => {
        this.txtAnalise = this.todosOsTextos.TIT_EXTRATO_STATUS_DESC1
        this.txtConcluido = this.todosOsTextos.TIT_EXTRATO_STATUS_DESC2
        this.txtAgendado = this.todosOsTextos.TIT_EXTRATO_STATUS_DESC3
        this.txtRetirado = this.todosOsTextos.TIT_EXTRATO_STATUS_DESC4
        this.txtPendente = this.todosOsTextos.TIT_EXTRATO_STATUS_DESC5
      }, 300)
    }
  },
  computed: {
    ...mapGetters({
      todosOsTextos: 'getTodosOsTextos'
    })
  },
  mounted(){
    this.verificaOperacao()
    this.formataStatus()

    this.traduzTexto()
  }
}
</script>