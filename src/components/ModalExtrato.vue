<template>
  <div id="extrato-modal" class="modal">
    <div v-if="dadosExtrato.length == 0" id="extrato-sem-registros">
      <i class="fas fa-file-invoice-dollar"></i>
      <h2> {{ titSemExtrato }} </h2>
    </div>
    <template v-else>
      <div id="container-extrato">  
        <table>
          <thead>
            <tr>
              <th> {{ titOrigem }} </th>
              <th> {{ titDescricao }} </th>
              <th> {{ titQtde }} </th>
              <th> {{ titStatus }} </th>
              <th> {{ titData }} </th>
              <th> {{ titHora }} </th>
              <th> {{ titDataFolga }} </th>
            </tr>
          </thead>
          <tbody id="tbody-extrato">
            <TabelaExtrato v-for="(dado, i) in dadosExtrato" :key="i"
            :origem="dado.pontos_origem"
            :descricao="dado.pontos_descricao"
            :qtde="dado.pontos_qtde"
            :operacao="dado.operacao"
            :status="dado.status"
            :data="dado.data"
            :hora="dado.hora"
            :dataFolga="dado.folga_data" />
          </tbody>
        </table>
      </div>
      <div id="extrato-rodape">
        <h2>
          {{ titSaldoAtual }}: <span class="selecionado"> {{ saldo }} </span>
        </h2>
        <!-- <div>
          <p> Filtrar por datas </p>
          <select name="filtro-datas-extrato" id="filtro-datas-extrato">
            <option v-for="(dado, indice) in dadosExtrato" :key="indice"
            :value="dado.data">
              {{ dado.data }}
            </option>
          </select>
        </div> -->
      </div>
    </template>
  </div>
</template>

<script>
import TabelaExtrato from './TabelaExtrato'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      titSemExtrato: "Ainda não há registros",
      titOrigem: "Origem",
      titDescricao: "Descrição",
      titQtde: "Koins",
      titOperacao: "Operação",
      titStatus: "Status",
      titData: "Data",
      titHora: "Hora",
      titSaldoAtual: "Saldo Atual",
      titDataFolga: "Data da Folga"
    };
  },
  components:{
    TabelaExtrato
  },
  methods: {
    traduzTexto(){
      setTimeout(() => {
        this.titSemExtrato = this.todosOsTextos.TIT_SEM_EXTRATO
        this.titOrigem     = this.todosOsTextos.TIT_EXTRATO_ORIGEM
        this.titDescricao  = this.todosOsTextos.TIT_EXTRATO_DESCRICAO
        this.titQtde       = this.todosOsTextos.TIT_EXTRATO_QUANTIDADE
        this.titOperacao   = this.todosOsTextos.TIT_EXTRATO_OPERACAO
        this.titStatus     = this.todosOsTextos.TIT_EXTRATO_STATUS
        this.titData       = this.todosOsTextos.TIT_EXTRATO_DATA
        this.titHora       = this.todosOsTextos.TIT_EXTRATO_HORA
        this.titSaldoAtual = this.todosOsTextos.TIT_EXTRATO_SALDO
        this.titDataFolga  = this.todosOsTextos.TIT_EXTRATO_DATA_FOLGA
      }, 300)
    }
  },
  computed: {
     ...mapGetters({
      saldo: 'saldoAtual',
      dadosExtrato: 'extratoAtual',
      todosOsTextos: 'getTodosOsTextos'
    })
  },
  mounted(){
    this.traduzTexto()
  }
};
</script>
