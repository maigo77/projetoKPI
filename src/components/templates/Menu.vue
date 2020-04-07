<template>
  <nav id="navbar" class="bg-dark">
    <div id="navbar-links" class="bg-dark">
      <ul>
        <li>
          <div id="navbar-superior-logo" title="GAMEK"> <!-- title="Seed" -->
            <!-- <i class="fas fa-seedling"></i> -->
            <img src="../../../public/assets/img/GAMEK-SIMBOLO-WHITE.png" alt="Logo GAMEK">
          </div>
        </li>
        <router-link to="/home">
          <li id="home" v-bind:title="link01" class="navbar-selecionado" v-on:click="toggleClasses('navbar-selecionado', 'home')">
            <i class="fas fa-home"></i>
          </li>
        </router-link>

        <a href="http://177.130.112.172/login/index.php" target="_blank">
          <li id="moodle" title="Moodle">
            <i class="fas fa-graduation-cap"></i>
          </li>
        </a>

        <!-- <router-link to="/moodle">
          <li id="moodle" title="Moodle" v-on:click="toggleClasses('navbar-selecionado', 'moodle')">
            <i class="fas fa-graduation-cap"></i>
          </li>
        </router-link> -->

        <!-- <router-link to="/treinamento">
          <li id="treinamento" v-bind:title="link02" v-on:click="toggleClasses('navbar-selecionado', 'treinamento')">
            <i class="fas fa-graduation-cap"></i>
          </li>
        </router-link> -->

        <router-link to v-on:click.prevent.self>
          <li id="cog" v-bind:title="link03" v-on:click="toggleClasses('navbar-selecionado', 'cog')">
            <i class="fas fa-cog transition"></i>
            <a href="#config-modal" rel="modal:open" id="link-config"></a>
          </li>
        </router-link>

        <router-link to v-on:click.prevent.self class="dNone">
          <li id="help" v-bind:title="link04" v-on:click="toggleClasses('navbar-selecionado', 'help')">
            <i class="fas fa-question-circle"></i>
          </li>
        </router-link>

      </ul>

      <div id="navbar-titulo">
        <h2> Intergr<span>ALL</span> </h2>
      </div>

    </div>
  </nav>
</template>

<script>

import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

  export default {
    data(){
      return{
        tituloPrincipal: 'Game',
        link01: 'Home',
        // link02: 'Treinamento',
        link03: 'Configurações',
        link04: 'Tutorial'
      }
    },
    methods: {
      ...mapMutations(['setAbrirTutorial']),
      toggleClasses(classe, id){

        let perfilFoto = document.querySelector('#perfil-foto')
        if(perfilFoto){
          perfilFoto.style.zIndex = '1'
        }

        if(id == 'cog'){
          document.querySelector('#link-config').click()
        }

        if(id == 'help'){
          this.setAbrirTutorial(true)
        }

        var elementoAtual = document.querySelector('.'+classe)
        this.$removeClasse(elementoAtual, classe)
        
        var elementoClicado = document.querySelector('#'+id)
        this.$addClasse(elementoClicado, classe)

        if(id !== 'cog' && id !== 'help'){
          localStorage.setItem('abaSelecionada', id)
        }
      },
      verificaLocalStorage(){
        if(localStorage.abaSelecionada){
          let id = localStorage.abaSelecionada

          this.toggleClasses('navbar-selecionado', id)

          if(document.querySelector('#'+id)){
            document.querySelector('#'+id).click()
          }
        }
      },
      traduzTextos(){
        setTimeout(() => {
          // this.link02 = this.todosOsTextos.TIT_HOVER_TREINAMENTO
          this.link03 = this.todosOsTextos.TIT_HOVER_CONFIG
          this.link04 = this.todosOsTextos.TIT_HOVER_TUTORIAL
        }, 300)
      }
    },
    mounted(){
      this.verificaLocalStorage()
      this.traduzTextos()
    },
    computed:{
      ...mapGetters({
        todosOsTextos: 'getTodosOsTextos'
      })
    }
  };
</script>