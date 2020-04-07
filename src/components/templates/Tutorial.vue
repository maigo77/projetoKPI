<template>
  <div id="tutorial-blocker" v-if="abrirTutorial">
    <div class="todos-tutoriais">

      <div class="tutorial-container">
        <div class="tutorial-titulo">
          <h2> <i class="fas fa-life-ring"></i> {{ tutoriais[indice].titulo }} </h2>
          <hr>
        </div>
        <div class="tutorial-conteudo"> 
          <ul>
            <li
              v-for="(informacao, i) in tutoriais[indice].conteudo"
              :key="i">
                {{ informacao }}
              </li>
          </ul>
        </div>
      </div>

      <div class="tutorial-controles">
        <div class="setas seta-direita" 
          v-show="indice > 0"
          v-on:click="moverTutorial('menos')">
          <i class="fas fa-arrow-alt-circle-left"></i>
        </div>
        <div class="pular-tutorial" v-on:click="fecharTutorial()">
          <span> {{ estadoTutorial }} </span>
        </div>
        <div class="setas seta-esquerda" 
          v-show="indice < tutoriais.length - 1"
          v-on:click="moverTutorial('mais')">
          <i class="fas fa-arrow-alt-circle-right"></i>
        </div>
      </div>

    </div>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  data(){
    return{
      indice: 0,
      tutoriais: [
        { 
          titulo: 'Tutorial de Funcionamento', 
          conteudo: [
            'Nome do Sistema: Seeds',
            'Objetivo: XXXXXXX'
          ] 
        },
        {
          titulo: 'Menu Lateral', 
          conteudo: [
            'Home: Página principal da aplicação, aqui você consulta todos seus status e efetua transações com suas KOINS',
            'Treinamento: Página de Treinamento',
            'Configurações: Página onde é possível configurar as cores primárias e secundárias do sistema e também o tamanho de fonte',
            'Ajuda: Abre o tutorial de ajuda'
          ]
        },
      ],
      btnTutorial: ''
    }
  },
  methods: {
    ...mapMutations(['setAbrirTutorial']),
    fecharTutorial(){
      this.setAbrirTutorial(false)
    },
    moverTutorial(operacao){
      if(operacao == 'mais'){
        this.indice++
      }else{
        this.indice--
      }

      
    }
  },
  computed: {
    ...mapGetters({
      abrirTutorial: 'getAbrirTutorial'
    }),
    estadoTutorial(){
      if(this.indice == this.tutoriais.length - 1){
        return this.btnTutorial = 'Fim do Tutorial'
      }else{
        return this.btnTutorial = 'Pular Tutorial'
      }
    }
  }
}
</script>

<style>

</style>