<template>
   <div class="modal" id="modal-ger-conteudo">
      <div id="add-conteudo">
        <div class="form-conteudo">
          <div class="panel">
            <div class="panel-header">
              <p>{{ texto }}</p>
            </div>
            <div class="panel-body">
              <div class="filter">
                <div class="dados-filter">
                  <p>Adicionar Filtro</p>
                </div>
                <div class="incluir-dados">
                  <p>Adicionar Conteúdo</p>
                </div>
              </div>
              <div class="tabela bg-white">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>KPI</th>
                      <th class="center">Versão</th>
                      <th class="center">Última Modificação</th>
                      <th class="center">Status</th>
                      <th class="center">Apoio</th>
                      <th class="center">Gerenciar</th>
                      <th class="center">Editar Atributos</th>
                      <th class="center">Editar Versão</th>
                    </tr>
                  </thead>
                  <tbody v-for="dado in dados" :key="dado.kpi">
                    <tr :class="'tr_'+dado.index">
                      <td>{{ dado.nome }}</td>
                      <td>{{ dado.kpi }}</td>
                      <td class="center">{{ dado.versao }}</td>
                      <td class="center">{{ dado.data }}</td>
                      <td class="center">{{ dado.status }}</td>
                      <td class='acao center'><i class='fas fa-book  i-apoio'></i></td>
                      <td class='acao center'><i class='fas fa-users i-ger'></i></td>
                      <td class='acao center'><i class='fas fa-edit  i-edit'></i></td>
                      <td class='acao center'><i class='fas fa-cogs  i-config'></i></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { apiTeste } from '../services/api';

export default {
  data(){
    return{
      texto: "Gerenciar Conteúdos",
      dados: [],
    }
  },
  methods: {
    async carregaDadosApi(){
      const dados = {
        representante: "BMG-CALLATE",
      }
      const response = await apiTeste.post('/kpi/conteudo/lista',JSON.stringify(dados));
      const dadosFormatados = await this.formataDados(response.data.ret);
      this.insereDadosNoArray(dadosFormatados);
    },
    async formataDados(dados){
      const dadosFormatados = [];
      dados.forEach((obj, index) => {
        let data_ajustada = obj.data_cri.replace(/-/g,'/').split('/').reverse().join('/')
          let hora_ajustada = obj.hora_cri.slice(0, 5).replace(':', 'H')
          let objetoParaDadosTabela = {
            index: `tr_${index}`,
            nome: obj.nome,
            kpi: obj.id,
            versao: obj.versao,
            data: `${data_ajustada}-${hora_ajustada}`,
            status: obj.status
          }
          dadosFormatados.push(objetoParaDadosTabela);
      });
      return dadosFormatados;
    },
    async insereDadosNoArray(dados){
      this.dados = (dados);
    }
  },
  mounted() {
    this.carregaDadosApi();
  }
}
</script>