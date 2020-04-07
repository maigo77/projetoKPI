<template>
  <div id="modal-add-representante" class="dNone">
    <div class="panel">
      <div class="panel-header">
        <div class="tit">
          Adicionar Representantes
        </div>
        <i class="fas fa-times" v-on:click="fechaCarrinhoRepre()"></i>
      </div>
      <div class="panel-body">
        <div class="list-representantes form">
          <ul>
            <div class="inputGroup todos">
              <input id="option_todos" name="option_todos" value="todos" type="checkbox" v-on:click="selecionaTodos"/>
              <label for="option_todos">Selecionar Todos</label>
            </div>
            <div :class="'inputGroup div_'+index" v-for="(item, index) in arrOptions" :key="index">
              <input :id="'option_'+index" :name="'option_'+index" :value="item.value" type="checkbox"/>
              <label :for="'option_'+index">{{item.descricao}}</label>
            </div>
          </ul>
        </div>
      </div>
      <div class="rodape">
        <ul class="rodape-items">
          <li class="rodape-item" v-on:click="selecionaRepresentantes()">
            <strong>Adicionar representante</strong>
          </li>
        </ul>
        <ul class="rodape-items">
          <li class="rodape-item">
            <input type="text" class="dNone" name='filtro-repre' id='filtro-repre' v-on:keyup="keyword">
          </li>
          <li class="rodape-item" v-on:click="mostraFiltroRepre()">
            <div class="rodape-item-circle">
              <i class="fas fa-filter"></i>
            </div>
          </li>
        </ul>
        <!-- <div class="button">
          <a href="#" class="btn-two green rounded small" v-on:click="selecionaRepresentantes()">Adicionar Representantes</a>
        </div>
        <div class="filter" id="filter-repre">
          <input type="text" v-on:keyup="keyword" name='filtro-repre' id='filtro-repre' class="dNone">
          <div class="circle" v-on:click="mostraFiltroRepre()">
            <i class="fas fa-filter"></i>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { apiTeste } from "../services/api";
import { mapMutations } from "vuex";
export default {
  data(){
    return {
      arrOptions: [],
      arrNome:[]
    }
  },
  methods:{
    async getRepresentantes(){
      const data = {
        cod_classe: "REPRE",
        representante: "URANET",
        status : "A"
      };
      const dadosEnv = JSON.stringify(data);
      const response = await apiTeste.post("/rotinas/monta-combo", dadosEnv);
      this.montaOptions(response.data.ret);
    },
    montaOptions(dados){
      let arrDados = [];
      if(dados){
        dados.forEach((obj, index) => {
          let objDados = {
            value: obj.vlr_classe,
            descricao: obj.desc_classe
          }
          arrDados.push(objDados);
          this.arrNome.push(obj.desc_classe.toLowerCase());
        });
        let selecionaTodos = 'Selecionar Todos';
        this.arrOptions = arrDados;
      }
    },
     mostraFiltroRepre(){
       if(document.getElementById("filtro-repre").style.display == "block"){
         document.getElementById("filtro-repre").style.display = "none";
         document.getElementById("filter-repre").style.paddingLeft = "32.6%";
         document.getElementById("filtro-repre").value = "";
         keyword()

       }else{
         document.getElementById("filtro-repre").style.display = "block";
         document.getElementById("filter-repre").style.paddingLeft = "0%";
       }
    },
    fechaCarrinhoRepre(){
      document.getElementById("modal-add-representante").style.display = "none";
    },
    ...mapMutations(['setCarrinhoRepre']),
    selecionaRepresentantes(){
      let arrOpcoesChecadas = [];
      let opcoes = document.querySelectorAll(".inputGroup > input:checked");
      opcoes.forEach((elem) =>{
        arrOpcoesChecadas.push({
          valor: elem.value,
          desc: elem.nextElementSibling.textContent
        });
      });
      this.setCarrinhoRepre(arrOpcoesChecadas);
      document.getElementById("modal-add-representante").style.display = "none";
    },
    keyword() {
      let busca = event.target.value.toLowerCase();
      for (var i = 0; i < this.arrNome.length; i++) {
        if (busca !== "") {
          document.querySelector(".todos").style.display = "none";
          if (
            this.arrNome[i].split("").includes(busca) ||
            this.arrNome[i].includes(busca)
          ) {
            document.querySelector(".div_" + i).style.display = "block";
          } else {
            document.querySelector(".div_" + i).style.display = "none";
          }
        } else {
          document.querySelector(".div_" + i).style.display = "block";
          document.querySelector(".todos").style.display = "block";
        }
      }
    },
    selecionaTodos(){
      let lista = document.querySelectorAll('[type=checkbox]');
      
      for(let elemento in lista){
        if(lista[0].checked){
          lista[elemento].checked = true;
        }else{
          lista[elemento].checked = false;
        }
      }

    }

  },
  components: {

  },
  mounted() {
    this.getRepresentantes()
  }
}
</script>