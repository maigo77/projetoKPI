<template>
  <div id="config-modal" class="modal">

    <div id="config-cores">

      <h2> {{ txtCorDeFundo }} </h2>

      <div>
        
        <ul class="config-cores-primarias">
          <li>
            <div class="circulo-opcao bg-light selecionado primaria" v-on:click="mudaSelecionado()"></div>
          </li>
          <li>
            <div class="circulo-opcao bg-darker primaria" v-on:click="mudaSelecionado()"></div>
          </li>
        </ul>
      
      </div>

      <hr>

      <h2> {{ txtCorSecun }} </h2>

      <div>
        
        <ul class="config-cores-secundarias">
          <li>
            <div class="circulo-opcao bg-dark selecionado secundaria" v-on:click="mudaSelecionado()"></div>
          </li>
          <li>
            <div class="circulo-opcao bg-opt1 secundaria" v-on:click="mudaSelecionado()"></div>
          </li>
          <li>
            <div class="circulo-opcao bg-opt2 secundaria" v-on:click="mudaSelecionado()"></div>
          </li>
          <li>
            <div class="circulo-opcao bg-opt3 secundaria" v-on:click="mudaSelecionado()"></div>
          </li>
          <li>
            <div class="circulo-opcao bg-opt4 secundaria" v-on:click="mudaSelecionado()"></div>
          </li>
        </ul>
      
      </div>

      <hr>
      
    </div>

    <div id="config-fonte">

      <h2> {{ txtTamFonte }} </h2>

      <div>
      
        <ul>
          <li id="aumenta-fonte" v-on:click="mudaFonte('A+')">A+</li>
          <li>|</li>
          <li id="diminui-fonte" v-on:click="mudaFonte('a-')">a-</li>
        </ul>
        
        <div class="config-fonte-exemplo bg-white">
          <p> {{ txtExemplo }} </p>
        </div>
      
      </div>

      <hr>

    </div>

    <Botao :funcao="salvar" width="100%" :p="txtSalvar" :habilitaSpan="true" :span="txtSalvarObs" :opacity="0.8" padding="15px" margin="10px auto"/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

import Botao from './templates/Botao'

export default {
  data(){
    return{
      txtCorDeFundo: 'Cor de fundo',
      txtCorSecun: 'Cor secundária',
      txtTamFonte: 'Tamanho de fonte',
      txtExemplo: 'Texto',
      txtSalvar: 'Salvar',
      txtSalvarObs: 'Obs: As definições escolhidas somente ficarão salvas neste dispositivo'
    }
  },
  components: {
    Botao
  },
  methods: {
    mudaSelecionado(){
      if(event.target.classList.contains('secundaria')){
        let selecionadoAtual = document.querySelector('.secundaria.selecionado')
        this.$removeClasse(selecionadoAtual, 'selecionado')
  
        this.$addClasse(event.target, 'selecionado')
  
        this.alteraCoresSecundarias(event.target)
      }else{
        let selecionadoAtual = document.querySelector('.primaria.selecionado')
        this.$removeClasse(selecionadoAtual, 'selecionado')
  
        this.$addClasse(event.target, 'selecionado')
  
        this.alteraCoresFundo(event.target)
      }
    },
    alteraCoresFundo(div){
      let corSelecionada = div.classList[1]

      let body = document.querySelector('body')
      let corAtual = body.classList[0]

      this.$removeClasse(body, corAtual)
      this.$addClasse(body, corSelecionada)
    },

    ...mapMutations(['setCorSecundaria']),

    alteraCoresSecundarias(div){
      let corSelecionada = div.classList[1]

      let corAtual = document.querySelector('#navbar-links').classList[0]
      let elementos = document.querySelectorAll('.'+corAtual)

      for(var indice = 0; indice < elementos.length; indice++){

        if(!elementos[indice].classList.contains('circulo-opcao')){
          this.$removeClasse(elementos[indice], corAtual)
          this.$addClasse(elementos[indice], corSelecionada)
        }

      }


      let codigoCorAtual = getComputedStyle(div).backgroundColor
      let barraProgresso = document.querySelector('#_progress')

      barraProgresso.style.background = "linear-gradient(to right,"+ codigoCorAtual +" var(--scroll),transparent 0)"
      this.setCorSecundaria(codigoCorAtual)

    },
    mudaFonte(e){
      let elemento = document.querySelector('section')
      let estilos = getComputedStyle(elemento) 
      let fonte = estilos.fontSize

      let exemplo = document.querySelector('.config-fonte-exemplo')
      let fonteExemplo = getComputedStyle(exemplo).fontSize

      if(e == 'A+'){
        elemento.style.fontSize = elemento.style.fontSize >= '18px' ? '18px' : (parseInt(fonte) + 1) + 'px'

        exemplo.style.fontSize = exemplo.style.fontSize >= '18px' ? '18px' : (parseInt(fonteExemplo) + 1) + 'px'
      }else{
        elemento.style.fontSize = elemento.style.fontSize <= '13px' ? '13px' : (parseInt(fonte) - 1) + 'px'

        exemplo.style.fontSize = exemplo.style.fontSize <= '13px' ? '13px' : (parseInt(fonteExemplo) - 1) + 'px'
      }
    },
    salvar(){
      let bgPrimario = document.querySelector('.primaria.selecionado').classList[1]
      let bgSecundario = document.querySelector('.secundaria.selecionado').classList[1]

      let elemento = document.querySelector('section')
      let estilos = getComputedStyle(elemento) 
      let fonte = estilos.fontSize

      localStorage.setItem('Cor Primaria', bgPrimario)
      localStorage.setItem('Cor Secundaria', bgSecundario)
      localStorage.setItem('Tam Fonte', fonte)

      if(document.querySelector('.toasted.toasted-primary.success')){
        return
      }else{
        this.$toasted.global.defaultSuccess();
      }
    },

    verificaLocalStorage(){
      let corPrimaria = localStorage.getItem('Cor Primaria')
      let corSecundaria = localStorage.getItem('Cor Secundaria')
      let tamFonte = localStorage.getItem('Tam Fonte')

      let elemPrimario = document.querySelector('.config-cores-primarias > li > .'+corPrimaria)
      let elemSecundario = document.querySelector('.config-cores-secundarias > li > .'+corSecundaria)
      let elemGeral = document.querySelector('section')

      if(elemPrimario){
        elemPrimario.click()
      }

      if(elemSecundario){
        elemSecundario.click()
      }

      if(elemGeral){
        elemGeral.style.fontSize = tamFonte
      }

    },
    traduzTexto(){
      setTimeout(() => {
        this.txtCorDeFundo = this.todosOsTextos.TIT_CONFIG_COR_DE_FUNDO
        this.txtCorSecun   = this.todosOsTextos.TIT_CONFIG_COR_SECUN
        this.txtTamFonte   = this.todosOsTextos.TIT_CONFIG_TAM_FONTE
        this.txtExemplo    = this.todosOsTextos.TIT_CONFIG_TXT_EXEMPLO
        this.txtSalvar     = this.todosOsTextos.TIT_CONFIG_SALVAR
        this.txtSalvarObs  = this.todosOsTextos.TIT_CONFIG_SALVAR_OBS
      }, 300)
    }
  },
  computed: {
    ...mapGetters({
      todosOsTextos: 'getTodosOsTextos'
    })
  },
  mounted(){
    this.verificaLocalStorage()
    this.traduzTexto()
  }
}
</script>