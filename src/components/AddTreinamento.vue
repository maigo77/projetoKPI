<template>
  <div>
    <div class="panel">
      <div class="panel-header" id="panel-add-treinamento">
        <p>
          {{ texto }}
          <i class="fas fa-times" v-on:click="fechaModalAddTreinamento()"></i>
        </p>
      </div>
      <div class="panel-body">
        <div id="form-inc-treinamento">
          <div id="form-linha-1" class="linha">
            <Input
              type="text"
              placeholder="Nome do Treinamento"
              name="nome_treina"
              id="nome_treina"
            />
          </div>

          <CarrinhoRepresentante />

          <div id="form-linha-2" class="linha">
            <div class="form__group field">
              <textarea
                class="form__field"
                name="teste"
                id="teste"
                rows="2"
                placeholder="Descricao"
              ></textarea>
              <label for="teste" class="form__label">Descricao Do Treinamento</label>
            </div>
          </div>

          <div id="form-linha-3" class="linha">
            <div class="col50">
              <Input type="file" placeholder="Thumbnail" name="thumbnail" id="thumbnail" />
            </div>
            <div class="col50">
              <div class="select">
                <vSelect :options="options" id="teste" placeholder="Selecione o KPI" />
              </div>
            </div>
          </div>

          <div id="form-linha-datepicker">
            <h2>Data de vigencia:</h2>
            <Datepicker />
          </div>

          <div id="form-linha-4" class="linha">
            <div class="col50">
              <div class="create-playlist">
                <div class="add-conteudo-playlist">
                  <i class="far fa-plus-square"></i>
                  Incluir Conteudo / Prova
                </div>
                <div class="list-conteudo">
                  <div class="info-conteudo" v-for="index in 10" :key="index">
                    <div class="thumbnail-conteudo">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgN_X0WRFSx9YC9qsqcOEGONuILS0R43pL0-yTk02IKAQkUiz3"
                        alt
                      />
                    </div>
                    <div class="desc-conteudo">
                      <p>NOME DO VIDEO - Por: Vitor Bailon ha 2 meses 20/12/2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col50">
              <div class="create-playlist">
                <div class="add-conteudo-playlist">
                  <i class="far fa-plus-square" v-on:click="mostraCarrinhoRepre()"></i>
                  Incluir Representante
                </div>
                <div class="list-conteudo">
                  <div class="info-conteudo">
                    <div class="list-representante">
                      <ul>
                        <li v-for="(representante, index) in representantes" :key="index">{{representante.desc}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="form-linha-5">

            <ul class="div-btn">
              <li class="div-btn-2">
                <a href="#" class="btn-two green rounded">Adicionar</a>
              </li>
            </ul>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Input from './Input';
import vSelect from 'vue-select';
import { apiTeste } from '../services/api';
import CarrinhoRepresentante from './CarrinhoRepre';
import { mapGetters, mapMutations } from 'vuex';
import Datepicker from './Datepicker';
export default {
  data() {
    return {
      texto: "Incluir Treinamento",
      titulo1: "Nome de Treinamento",
      titulo2: "KPI",
      titulo3: "Descri??o",
      options: []
    };
  },
  methods: {
    ...mapMutations(['setCarrinhoRepre']),
    fechaModalAddTreinamento(){
      this.abreInclusaoTreinamento('-1000%');
      this.setCarrinhoRepre([]);
    },
    abreInclusaoTreinamento(numero){
      document.getElementById("inclusao-treinamento").style.left = numero;
    },
    montaOptionsKPI(dados){
      let arrOptions = [];
      if(dados){
        dados.forEach((obj, index) => {
          let objDados = {
            label: obj.desc_classe,
            value: obj.vlr_classe
          }
          arrOptions.push(objDados);
        });
        this.options = arrOptions;
      }else{
        console.log("Erro");
      }
    },
    mostraCarrinhoRepre(){
      document.getElementById("modal-add-representante").style.display = "block";
    },
    async getOptionsKPI(){
      const data = {
        cod_classe: "KPILI",
        representante: "URANET"
      };
      const dataEnvio = JSON.stringify(data);
      const response = await apiTeste.post("/rotinas/monta-combo", dataEnvio);
      this.montaOptionsKPI(response.data.ret);
    },
    abreModal(id, idModal){
      var link = document.querySelector("#"+id)
      link.click()

      $('#'+idModal).modal({
        fadeDuration: 100
      })
    },
  },
  components: {
    Input,
    vSelect,
    CarrinhoRepresentante,
    Datepicker
  },
  computed:{
    ...mapGetters({
      representantes:"getCarrinhoRepre"
    })
  },
  mounted() {
    this.getOptionsKPI();
  }
};
</script>
