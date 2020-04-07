<template>
  <section class="section-width">
    <div id="main">
        <div class="div-add-treinamento" id="inclusao-treinamento">
          <AddTreinamento />
        </div>
        <div class="back">
          <router-link to="/treinamento">
            <i class="fas fa-arrow-left"></i>
          </router-link>
        </div>
      <header id="header">
        <div class="header__title">
          <ul class="header__title-items">
            <li class="header__title-item header__title-item-1">
              <h1>Gerenciar Treinamento</h1>
            </li>
            <li class="header__title-item header__title-item-2">
              <div class="header__addTreinamento"  v-on:click="abreInclusaoTreinamento(6)">
                <ul class="header__addTreinamento-items">
                  <li class="header__addTreinamento-item header__addTreinamento-item-1">
                    <p>Adicionar Treinamento</p>
                  </li>
                  <li class="header__addTreinamento-item header__addTreinamento-item-2">
                    <i class="fas fa-angle-right"></i>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          
        </div>
        <div class="header__search">
          <ul class="header__search-items">
            <li class="header__search-item header__search-item-1">
              <input type="text" placeholder="Digite o nome para pesquisa" v-on:keyup="keyword">
            </li>
            <li class="header__search-item header__search-item-2">
              <div class="header__search-item-2-filter" v-on:click="filter = !filter">
                <ul class="header__search-item-2-elements">
                  <li class="header__search-item-2-element-1">
                    <p>Filtros</p>
                  </li>
                  <li class="header__search-item-2-element-2">
                    <i class="fas fa-filter"></i>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </header>
      <main id="content-body" v-if="!filter">
        <ul class="container-items" v-for="dados in arrDados" :key="dados.index" :id="'item_'+dados.index">
          <li class="container-item">
            <div class="container-item__div">
              <ul>
                <li class="container-item__div-1__title">Nome:</li>
                <li>{{ dados.nome }}</li>
              </ul>
              <ul>
                <li class="container-item__div-1__title">Status:</li>
                <li>{{ dados.status }}</li>
              </ul>
              <ul>
                <div class="fas__border-radius" :id="'border_'+dados.index" >
                  <li class="icon__opcao"><i class="fas fa-ellipsis-v" :id="'i_'+dados.index" @click="mudaValor(dados.index)"></i></li>
                </div>
              </ul>
            </div>
            <div class="container-item__div container-item__div-2">
              <ul>
                <li class="container-item__div-1__title">KPI:</li>
                <li>{{ dados.kpi }}</li>
              </ul>
              <ul>
                <li class="container-item__div-1__title">Ultima Modificacao:</li>
                <li>{{ dados.data }}</li>
              </ul>
            </div>
          </li>
          <div class="opcoes">
            <ul :class="'opcoes__items  escondeElemento ul_'+dados.index">
              <li class="opcoes__item">Apoio</li>
              <li class="opcoes__item">Gerenciar</li>
              <li class="opcoes__item">Editar Atributos</li>
              <li class="opcoes__item">Editar Versão</li>
            </ul>
          </div>
        </ul>
      </main>
      <main id="filter" v-else>
        <header class="header__content-filter">
          <ul class="header__content-items">
            <li class="header__content-item">
              <i class="fas fa-arrow-left" v-on:click="filter = !filter"></i>
            </li>
            <li class="header__content-item">
              <h1>Filtros</h1>
            </li>
          </ul>
        </header>
        <main class="main__content">
          <ul class="main__content-items">
            <li class="main__content-item content-item__title">
              <div class="main__content-title">
                <h3>Representante:</h3>
              </div>
            </li>
            <li class="main__content-item">
              <div class="main__content-select">
                  <MontaSelectRepre />
              </div>
            </li>
          </ul>

          <ul class="main__content-items">
            <li class="main__content-item content-item__title">
              <div class="main__content-title">
                <h3>KPI:</h3>
              </div>
            </li>
            <li class="main__content-item">
              <div class="main__content-select">
                <select
                  name="select-profession"
                  id="select-profession"
                  class="objetoDados"
                >
                  <option value="todos">Todos</option>
                  <option value="ABS">ABS</option>
                  <option value="TMA">TMA</option>
                  <option value="NPS">NPS</option>
                  <option value="FCR">FCR</option>
                </select>
              </div>
            </li>
          </ul>


          <ul class="main__content-items">
            <li class="main__content-item content-item__title">
              <div class="main__content-title">
                <h3>Status:</h3>
              </div>
            </li>
            <li class="main__content-item">
              <div class="main__content-select">
                <select name="status" id="status" class="objetoDados">
                  <option value="A" selected>Ativo</option>
                  <option value="I">Inativo</option>
                </select>
              </div>
            </li>
          </ul>


          <ul class="main__content-items">
            <li class="main__content-item content-item__title">
              <div class="main__content-title">
                <h3>Data:</h3>
              </div>
            </li>
            <li class="main__content-item">
              <div class="main__content-select main__content-item-data">
                <select
                  name="dataOption"
                  id="dataOption"
                  v-on:change="condicaoSelectData"
                  class="objetoDados"
                >
                  <option value="todos"> Todos </option>
                  <option value="ano_mes">Data criação</option>
                  <option value="ano_mes_vigencia">Data de Vigência</option>
                </select>

                <select
                  name="ano"
                  id="ano"
                  :value="ano"
                  :disabled="desabilitaSelect"
                  style="background-color:#ccc"
                  class="objetoDados"
                >
                  <option
                    v-for="ano in montaAno"
                    :key="ano"
                    v-bind:value="ano">{{ ano }}
                  </option>
                </select>

                  <select
                    name="mes"
                    id="mes"
                    :value="mes"
                    :disabled="desabilitaSelect"
                    style="background-color:#ccc"
                    class="objetoDados"
                  >
                    <option value="01">Janeiro</option>
                    <option value="02">Fevereiro</option>
                    <option value="03">Março</option>
                    <option value="04">Abril</option>
                    <option value="05">Maio</option>
                    <option value="06">Junho</option>
                    <option value="07">Julio</option>
                    <option value="08">Agosto</option>
                    <option value="09">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                  </select>
              </div>
            </li>
          </ul>
        </main>
        <Strong id="mensagemErroPesquisa"></Strong>
        <footer>
          <button class="limpar_filtros" v-on:click="limpaFiltros">Limpar Filtros</button>
          <button class="pesquisar" v-on:click="pesquisaPersonalizada">Pesquisar</button>
        </footer>
      </main>
    </div>
  </section>
</template>

<script>
import { apiTeste } from '../services/api';
import AddTreinamento from "../components/AddTreinamento";
import MontaSelectRepre from "../components/MontaSelectRepre";
import { ano } from "../services/utils/DataAtual";
import { mes } from "../services/utils/DataAtual";

export default {
  data(){
    return {
      arrDados: [],
      arrNome: [],
      filter: false,
      montaAno: [],
      desabilitaSelect: true,
      ano: ano,
      mes: mes
    }
  },
  components: {
    AddTreinamento,
    MontaSelectRepre
  },
  methods: {
    abreInclusaoTreinamento(numero){
      document.getElementById("inclusao-treinamento").style.left = `${numero}%`;
      this.fechaDivFiltro();
    },
    fechaDivFiltro() {
      if (this.show) this.show = !this.show;
    },
    async requisicaoTreinamento() {
      const data = {
        representante: "BMG-CALLATE",
        representante_session: "BMG-CALLATE"
      };
      const dataEnvio = JSON.stringify(data);
      const response = await apiTeste.post("/kpi/treinamento/lista", dataEnvio);
      this.montaArrDados(response.data.ret);
    },

    montaArrDados(dados){
      let dadosTabela = [];
      if (dados) {
        dados.forEach((obj, index) => {
          let data_ajustada = obj.data_cri
            .replace(/-/g, "/")
            .split("/")
            .reverse()
            .join("/");
          let hora_ajustada = obj.hora_cri.slice(0, 5).replace(":", "H");
          let objetoParaDadosTabela = {
            index: index,
            nome: obj.nome,
            kpi: obj.id_kpi,
            versao: obj.versao,
            data: `${data_ajustada}-${hora_ajustada}`,
            status: obj.status
          };
          dadosTabela.push(objetoParaDadosTabela);
          this.arrNome.push(obj.nome.toLowerCase());
        });
        this.arrDados = dadosTabela;
      } else {
        throw new Error("Nenhum resultado encontrado");
      }
    },

    mudaValor(index) {
      const elementoLista = document.querySelector('.ul_'+index);

      if(elementoLista.classList.contains('escondeElemento')){
        for(let elemento = 0; elemento < this.arrDados.length; elemento++){
          let elementoLocal = document.querySelector(`.ul_${elemento}`);
          elementoLocal.classList.contains('escondeElemento') ? '' : elementoLocal.classList.add('escondeElemento');
        }
        elementoLista.classList.remove('escondeElemento');
      }else{
        elementoLista.classList.add('escondeElemento');
      }
    },

    reconheceClickForaDoElementoOpcoes(){
      document.querySelector("html").addEventListener("click", (evt) =>{
        if(!event.target.classList.contains('fas')){
          for(let elemento = 0; elemento < this.arrDados.length; elemento++){
            if(!document.querySelector(`.ul_${elemento}`).classList.contains('escondeElemento')){
              document.querySelector(`.ul_${elemento}`).classList.add('escondeElemento');
            }
          }
        }
      });
    },
    iteraAno() {
      for (let i = 2020; i <= 2100; i++) {
        this.montaAno.push(i);
      }
    },

    condicaoSelectData(){
      if(document.querySelector('#dataOption').value != "todos"){
        this.desabilitaSelect = false;
        this.mudaCorSelectData('#fff');
      }else{
        this.desabilitaSelect = true;
        this.mudaCorSelectData('#ccc');
      }
    },

    mudaCorSelectData(color){
      document.querySelector('#ano').style.backgroundColor = color;
      document.querySelector('#mes').style.backgroundColor = color;
    },

    async pesquisaPersonalizada() {
      let representante_session = "BMG-CALLATE";

      const objetoParaSerFiltrado = {
        representante_session
      };

      const objetoDados = document.querySelectorAll(".objetoDados");

      objetoDados.forEach(target => {
        objetoParaSerFiltrado[target.name] = target.value;
      });

      console.log(objetoParaSerFiltrado);

      const objetoParaBusca = await this.filtraObjetoApi(objetoParaSerFiltrado);

      console.log(objetoParaBusca);

      const response = await apiTeste.post(
        "/kpi/treinamento/lista",
        objetoParaBusca
      );


      try {
        this.montaArrDados(response.data.ret);
        this.filter = false;
      } catch (err) {
        document.querySelector("#mensagemErroPesquisa").innerHTML =
          "Nenhum Resultado encontrado!";
        setTimeout(() => {
          document.querySelector("#mensagemErroPesquisa").innerHTML = "";
        }, 3000);
      }
    },
    filtraObjetoApi(apiObjeto) {
      const {
        representante_session,
        dataOption,
        ano,
        mes,
        representante,
        status
      } = apiObjeto;

      
      let filter = {};

      if (status != "todos") {
        filter["status"] = status;
      }

      if (representante == "todos") {
        filter["representante_session"] = representante_session;
      } else {
        filter["representante_session"] = representante_session;
        filter["representante"] = representante;
      }

      if (dataOption != "todos") {
        filter[dataOption] = ano + mes;
      }

      return JSON.stringify(filter);
    },
    keyword() {
      let busca = event.target.value.toLowerCase();
      for (var i = 0; i < this.arrNome.length; i++) {
        if (busca !== "") {
          if (
            this.arrNome[i].split("").includes(busca) ||
            this.arrNome[i].includes(busca)
          ) {
            document.querySelector("#item_" + i).classList.remove("dNone");
          } else {
            document.querySelector("#item_" + i).classList.add("dNone");
          }
        } else {
          document.querySelector("#item_" + i).classList.remove("dNone");
        }
      }
    },
     limpaFiltros() {
      document.getElementById("representante").value = "todos";
      document.getElementById("select-profession").value = "todos";
      document.getElementById("status").value = "A";
      document.getElementById("dataOption").value = "todos";
      document.getElementById("ano").value = ano;
      document.getElementById("mes").value = mes;
      this.desabilitaSelect = true;
      this.mudaCorSelectData('#ccc');
    },

  },
  mounted(){
    this.iteraAno();
    this.reconheceClickForaDoElementoOpcoes();
    this.abreInclusaoTreinamento("-1000%");
    try{
      this.requisicaoTreinamento();
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style>

</style>