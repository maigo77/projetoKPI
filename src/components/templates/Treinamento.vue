<template>
  <section class="section-width">
    <div id="bloco-superior-treina">

      <!-- <div class="select">
        <v-select :options="['Vue.js','React']"></v-select>
      </div> -->

      <div id="cards">
        
        <div class="cards">
          <router-link to="/treinamento/gerencia-treinamento" class="link-adicionar">
            <div class="adicionar">
              <a id="link-modal" href="#modal-add-treina" rel="modal:open"></a>
              <i class="fas fa-folder-plus"></i>
              <h2>{{ texto }}</h2>
            </div>
          </router-link>
        </div>

        <div class="cards conteudo" v-on:click="abreModal('link-modal-conteudo', 'modal-ger-conteudo')">
          <a id="link-modal-conteudo" href="#modal-ger-conteudo" rel="modal:open"></a>
          <i class="fas fa-plus"></i>
          <h2>{{ textoConteudo }}</h2>
        </div>
        <div class="cards prova">
          <i class="fas fa-tasks"></i>
          <h2>{{ textoProva }}</h2>
        </div>
        <div class="cards agenda-treina">
          <i class="far fa-calendar-alt"></i>
          <h2>{{ textoAgendamento }}</h2>
        </div>
        <div class="cards realiza-prova">
          <i class="far fa-file-alt"></i>
          <h2>{{ textoGerEvolucao }}</h2>
        </div>
        <div class="cards gerencia-evolucao">
          <i class="fas fa-chart-line"></i>
          <h2>{{ textoEvolucao }}</h2>
        </div>
      </div>

    </div>

    <ModalGerTreinamento />
    <ModalGerConteudo />


    <div class="bloco-meio">
      <div class="teste">
        <div class="panel">
          <div class="panel-header">
            <p>Treinamentos Colaboradores</p>
          </div>
          <div class="panel-body">
            <div class="lista-videos-novo">
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="teste1">
        <div class="panel">
          <div class="panel-header">
            <p>Treinamentos Reciclagem</p>
          </div>
          <div class="panel-body">
            <div class="lista-videos-novo">
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
              <div>
                <div class="thumbnail">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3" alt="">
                </div>
                <div class="info-video">
                  TESTE DE VIDEO - xxxxxxxxxxxxxxxxxx
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>
</template>

<script>
import ModalGerTreinamento from "../ModalGerTreinamento";
import ModalGerConteudo from "../ModalGerConteudo";

import vSelect from 'vue-select'

export default {
  data(){
    return{
      texto: "Gerenciar Treinamento",
      textoAgendamento: "Agendar Treinamento",
      textoProva: "Gerenciar Prova",
      textoConteudo: "Gerenciar Conteúdo",
      textoGerEvolucao: "Realizar Prova",
      textoEvolucao: "Acompanhar Evolução"
    }
  },
  components: {
    ModalGerTreinamento,
    ModalGerConteudo,
    vSelect
  },
  methods: {
    abreModal(id, idModal){
      var link = document.querySelector("#"+id)
      link.click()

      $('#'+idModal).modal({
        fadeDuration: 100
      })
    },
  }
};
</script>