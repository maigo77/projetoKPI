<template>
  <div class="produto">
    <div class="produto-titulo">
        <h2>
          {{ descricao }}
        </h2>
    </div>
    <hr>
    <div class="produto-corpo">
      <div class="produto-corpo-estoque">
        <span> {{ txtEstoque }}: {{ estoque }} </span>
      </div>
      <div class="produto-corpo-img">
        <img :src="img">
      </div>
      <div class="produto-corpo-preco">
        <span class="bg-transparent"> {{ parseInt(valor) + " Koins" }} </span>
      </div>
    </div>
    <div class="produto-botao" 
      :id-prod="idProd"
      :class="{ 'bg-btn-green': saldoSuficiente, 'bg-btn-red': !saldoSuficiente, 'semClick': !saldoSuficiente }" 
      v-on:click="confirmaCompra()">
      <p> {{ msgBotao }} </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

import { baseUrlApi } from '../metodos/metodos'

export default {
  data(){
    return{
      saldoSuficiente: false,
      msgBotao: String,
      valorProduto: 0,
      obj: Object,
      solicitacaoEfetuada: Boolean,
      txtEstoque: 'Estoque',
      txtSolicitar: 'Solicitar',
      txtSaldoInsuf: 'Saldo Insuficiente',
      txtSolicitado: 'Solicitado'
    }
  },
  props: ["descricao", "estoque", "img", "valor", "botao", "categoria", "id-prod"],
  methods: {
    verificaSaldoSuficiente(){
      this.msgBotao = this.botao == 'SUFICIENTE' ? this.txtSolicitar : this.txtSaldoInsuf
      this.saldoSuficiente = this.msgBotao == this.txtSolicitar ? true : false
    },

    ...mapMutations(['atualizaSaldo', 'incrementaFolga', 'recebeIdProduto']),

    async confirmaCompra(){

    var div = event.target
    div = div.classList.contains('produto-botao') ? div : div.parentElement

    if(div.classList.contains('bg-btn-gray') || div.classList.contains('bg-btn-red') || !this.saldoSuficiente){
      return
    }

      let idProduto = div.getAttribute('id-prod')

      if(this.categoria == 'FOLGA'){
        this.recebeIdProduto(idProduto)
        this.incrementaFolga()
        this.simulaClickCalendario()
      }else{

        var textoConfirmacao = div.childNodes[0]

        // Gerando o token
        // Deveria ser uma função a parte, mas não está dando certo (a função retorna o obj antes de ser concluído) (Poderia ser resolvido com promisse)
        let objProduto = {}

        await axios.
          post(`${baseUrlApi}webservices/intergrallapi/intergrall/token/logado`)
          .then(
            response => {
              if(response.data.status == 'OK'){
                objProduto.id_analise = this.idAnalise
                objProduto.id_produto = idProduto
                objProduto.token = response.data.token
                objProduto.zonaDeTeste = this.zonaDeTeste
                objProduto = JSON.stringify(objProduto)
              }
            }
          )
          .catch(
            error => { console.log(error) }
          )

        // Enviando solicitação (que também devia ser outra função mas está dando o mesmo erro da função acima (Poderia ser resolvido com promisse)
        await axios
          .post(`${baseUrlApi}webservices/intergrall-api/kpi/resgatar/produto`, objProduto)
          .then( response => {
            if(response.data.status == 'OK'){
              this.atualizaSaldo(response.data.saldo)
              
              this.$toggleClasse(div, 'rotateY')
              this.$toggleClasse(div, 'bg-btn-green')
              this.$toggleClasse(div, 'bg-btn-gray')
              this.$toggleClasse(div, 'semClick')
          
              this.$toggleClasse(textoConfirmacao, 'unrotateY')
              textoConfirmacao.innerHTML = this.txtSolicitado
  
              return this.solicitacaoEfetuada = true
            }else{
              console.log('Status da solicitacao do produto NOK: ', response.data)
              return this.solicitacaoEfetuada = false
            }
          })
          .catch( error => {
            console.log('Erro na soliticacao do produto: ', error)
            return this.solicitacaoEfetuada = false
          })

        this.alertToasted(this.solicitacaoEfetuada)
    
      }

    },
    simulaClickCalendario(){
      document.querySelector('.close-modal').click()
      let linkFolga = document.createElement('a')
      linkFolga.setAttribute('href', '#folga-modal')
      linkFolga.setAttribute('rel', 'modal:open')
      document.querySelector('#app').append(linkFolga)
      linkFolga.click()
    },
    alertToasted(verdadeiro){
      if(verdadeiro == true){
        if(document.querySelector('.toasted.toasted-primary.success')){
          return
        }else{
          this.$toasted.global.defaultSuccess();
        }
      }else{
        if(document.querySelector('.toasted.toasted-primary.error')){
          return
        }else{
          this.$toasted.global.defaultError();
        }
      }
    },
    traduzTexto(){
      setTimeout(() => {
        this.txtEstoque    = this.todosOsTextos.TIT_EXTRATO_ESTOQUE
        this.txtSolicitar  = this.todosOsTextos.TIT_EXTRATO_SOLICITAR
        this.txtSaldoInsuf = this.todosOsTextos.TIT_EXTRATO_SALDO_NOK
        this.txtSolicitado = this.todosOsTextos.TIT_EXTRATO_SOLICITADO
      }, 300)
    }
  },
  computed: {
    ...mapGetters({
      todosOsTextos: 'getTodosOsTextos',
      idAnalise: 'getIdAnalise' ,
      zonaDeTeste: 'getZonaDeTeste'
    })
  },
  mounted(){
    this.verificaSaldoSuficiente()
    this.traduzTexto()
  }
}
</script>

<style>

</style>