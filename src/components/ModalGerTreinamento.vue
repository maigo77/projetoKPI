<template>
  <div class="modal" id="modal-add-treina">
    <div class="div-add-treinamento" id="inclusao-treinamento">
      <AddTreinamento />
    </div>
    <div id="add-treina">
      <div class="form-treina">
        <div class="panel teste5">
          <div class="panel-header">
            <p>{{ texto }}</p>
          </div>
          <div class="panel-body">
            <div class="search">
              <input
                placeholder="Digite o nome para pesquisa"
                type="text"
                v-on:keyup="keyword"
                v-on:focus="fechaDivFiltro"
              />
              <div class="icon">
                <i
                  class="fas fa-sort-down"
                  v-on:click="show = !show"
                  title="adicionar filtros"
                ></i>
              </div>
            </div>
            <div class="filtro" v-show="show">
              <table>
                <thead>
                  <tr>
                    <th>Representante:</th>
                    <th>
                      <MontaSelectRepre />
                    </th>
                  </tr>
                  <tr>
                    <th>KPI:</th>
                    <th>
                      <div class="sel">
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
                    </th>
                  </tr>
                  <tr>
                    <th>Status:</th>
                    <th>
                      <div class="filter-status">
                        <div class="sel">
                          <select name="status" id="status" class="objetoDados">
                            <option value="todos">Todos</option
                            >>
                            <option value="A">Ativo</option
                            >>
                            <option value="I">Suspenso</option
                            >>
                          </select>
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>Data:</th>
                    <th>
                      <div class="sel">
                        <select
                          name="dataOption"
                          id="dataOption"
                          v-on:change="condicao"
                          class="objetoDados"
                        >
                          <option value="todos"> Todos </option>
                          <option value="ano_mes">Data criação</option>
                          <option value="ano_mes_vigencia"
                            >Data de Vigência</option
                          >
                        </select>
                      </div>
                    </th>
                    <th>
                      <div class="sel">
                        <select
                          name="ano"
                          id="ano"
                          :disabled="desabilitaSelect"
                          class="objetoDados"
                        >
                          <option
                            v-for="ano in montaAno"
                            :key="ano"
                            v-bind:value="ano"
                            >{{ ano }}</option
                          >>
                        </select>
                      </div>
                    </th>
                    <th>/</th>
                    <th>
                      <div class="sel">
                        <select
                          name="mes"
                          id="mes"
                          :disabled="desabilitaSelect"
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
                    </th>
                  </tr>
                </thead>
              </table>
              <div class="mensagemErro">
                <p id="mensagemErroPesquisa"></p>
              </div>
              <div class="btn-filtrar">
                <a href="#" class="btn-two rounded small" v-on:click="pesquisaPersonalizada">Pesquisar</a>
                <i
                  class="fas fa-eraser"
                  title="Limpar Filtros"
                  v-on:click="limpaFiltros"
                ></i>
              </div>
            </div>
            <div class="tabela bg-white">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>KPI</th>
                    <th class="center">VersÃ£o</th>
                    <th class="center">Ãšltima ModificaÃ§Ã£o</th>
                    <th class="center">Status</th>
                    <th class="center">Apoio</th>
                    <th class="center">Gerenciar</th>
                    <th class="center">Editar Atributos</th>
                    <th class="center">Editar Versão</th>
                  </tr>
                </thead>
                <tbody
                  id="body-dados"
                  v-for="dados in dadosTabela"
                  :key="dados.index"
                >
                  <tr :class="dados.index">
                    <td>{{ dados.nome }}</td>
                    <td>{{ dados.kpi }}</td>
                    <td class="center">{{ dados.versao }}</td>
                    <td class="center">{{ dados.data }}</td>
                    <td class="center">{{ dados.status }}</td>
                    <td class="acao center">
                      <i class="fas fa-book  i-apoio"></i>
                    </td>
                    <td class="acao center">
                      <i class="fas fa-users i-ger"></i>
                    </td>
                    <td class="acao center">
                      <i class="fas fa-edit  i-edit"></i>
                    </td>
                    <td class="acao center">
                      <i class="fas fa-cogs  i-config"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="footer">
                <i class="fas fa-plus-circle" title="Adicionar treinamento" v-on:click="abreInclusaoTreinamento(6)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiTeste } from "../services/api";
import MontaSelectRepre from "../components/MontaSelectRepre";
import MontaSelectStatus from "../components/MontaSelectStatus";
import AddTreinamento from "../components/AddTreinamento";
import Datepicker from './Datepicker';

import { ano } from "../services/utils/DataAtual";
import { mes } from "../services/utils/DataAtual";

export default {
  data() {
    return {
      texto: "Gerenciar Treinamento",
      arrNome: [],
      show: false,
      montaAno: [],
      desabilitaSelect: true,
      dadosTabela: [],
    };
  },
  components: {
    MontaSelectRepre,
    MontaSelectStatus,
    AddTreinamento,
    Datepicker
  },
  methods: {
    abreInclusaoTreinamento(numero){
      document.getElementById("inclusao-treinamento").style.left = "50";
      this.fechaDivFiltro();
    },
    montaTabela(dados) {
      let arrDados = [];
      if (dados) {
        dados.forEach((obj, index) => {
          let data_ajustada = obj.data_cri
            .replace(/-/g, "/")
            .split("/")
            .reverse()
            .join("/");
          let hora_ajustada = obj.hora_cri.slice(0, 5).replace(":", "H");
          let objetoParaDadosTabela = {
            index: `tr_${index}`,
            nome: obj.nome,
            kpi: obj.id_kpi,
            versao: obj.versao,
            data: `${data_ajustada}-${hora_ajustada}`,
            status: obj.status
          };
          arrDados.push(objetoParaDadosTabela);
          this.arrNome.push(obj.nome.toLowerCase());
        });
        this.dadosTabela = arrDados;
      } else {
        throw new Error("Nenhum resultado encontrado");
      }
    },
    keyword() {
      let busca = event.target.value.toLowerCase();
      for (var i = 0; i < this.arrNome.length; i++) {
        if (busca !== "") {
          if (
            this.arrNome[i].split("").includes(busca) ||
            this.arrNome[i].includes(busca)
          ) {
            document.querySelector(".tr_" + i).classList.remove("dNone");
          } else {
            document.querySelector(".tr_" + i).classList.add("dNone");
          }
        } else {
          document.querySelector(".tr_" + i).classList.remove("dNone");
        }
      }
    },
    async requisicaoTreinamento() {
      const data = {
        representante: "BMG-CALLATE",
        representante_session: "BMG-CALLATE"
      };
      const dataEnvio = JSON.stringify(data);
      const response = await apiTeste.post("/kpi/treinamento/lista", dataEnvio);
      this.montaTabela(response.data.ret);
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

      const objetoParaBusca = await this.filtraObjetoApi(objetoParaSerFiltrado);

      const response = await apiTeste.post(
        "/kpi/treinamento/lista",
        objetoParaBusca
      );

      try {
        this.montaTabela(response.data.ret);
        this.mudaEstadoDivFiltro();
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
        filter[status] = status;
      }

      if (representante == "todos") {
        filter[representante_session] = representante_session;
      } else {
        filter[representante_session] = representante_session;
        filter[representante] = representante;
      }

      if (dataOption != "todos") {
        filter[dataOption] = ano + mes;
      }

      return JSON.stringify(filter);
    },
    mudaEstadoDivFiltro() {
      this.show = !this.show;
    },
    fechaDivFiltro() {
      if (this.show) this.show = !this.show;
    },
    condicao() {
      const data = document.querySelector("#dataOption").value;

      if (data != "todos") {
        this.desabilitaSelect = false;
        this.mudaCorSelectAnoData({ cor: "white" });
      } else {
        this.desabilitaSelect = true;
        this.mudaCorSelectAnoData({ cor: "#DCDCDC" });
      }
    },
    ano() {
      for (let i = 2020; i <= 2100; i++) {
        this.montaAno.push(i);
      }
    },
    async montaSelectAno() {
      await this.ano();
      this.mudaValorSelectAno({ ano });
    },
    limpaFiltros() {
      document.getElementById("representante").value = "todos";
      document.getElementById("select-profession").value = "todos";
      document.getElementById("status").value = "todos";
      document.getElementById("dataOption").value = "todos";
      document.getElementById("ano").value = ano;
      document.getElementById("mes").value = mes;
      this.desabilitaSelect = true;
      this.mudaCorSelectAnoData({ cor: "#DCDCDC" });
    },
    mudaCorSelectAnoData({ cor }) {
      document.getElementById("ano").style.backgroundColor = cor;
      document.getElementById("mes").style.backgroundColor = cor;
    },
    mudaValorSelectMes({ mes }) {
      document.getElementById("mes").value = mes;
    },
    mudaValorSelectAno({ ano }) {
      document.getElementById("ano").value = ano;
    },
  },
  mounted() {
    this.ano();
    this.mudaValorSelectMes({ mes });
    document.getElementById("mes").value = mes;
    this.mudaCorSelectAnoData({ cor: "#DCDCDC" });

    this.abreInclusaoTreinamento("-1000%");

    try{
      this.requisicaoTreinamento();
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
