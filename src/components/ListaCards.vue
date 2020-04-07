<template>
  <!-- v-on:mouseover="apareceTitulo($event)" -->
  <div 
    class="graph-line" >
    <div class="grafico">
      <div 
        :class="{'up': seta == 'up', 'down': seta == 'down', 'mesmo': seta == 'mesmo', 'ntem': seta == 'ntem', principal}" 
        class="seta-direcao"
        v-html="setSeta(seta)"
        />
      <div :title="titAtualizacao" :id="'chart'+id" ></div>
    </div>
  </div>
</template>

<script>
import Botao from './templates/Botao'
// import 'balloon-css'
import ApexCharts from 'apexcharts'

import { mapGetters } from 'vuex'

export default {
  props:[
    'id',
    'tamGrafico',
    'titFontSize',
    'titOffsetY',
    'lineSize',
    'principal',
    'rankingFontSize',
    'titAtualizacao',
    'status',
    'seta',
    'titulo',
    'titMeta',
    'valorMeta',
    'metaFormatada',
    'titVoce',
    'valorVoce',
    'voceFormatada',
    'titPrimeiro',
    'valorPrimeiro',
    'primeiroFormatada',
    'ranking'
  ],
  components: {
    ApexCharts,
    Botao
  },
  methods: {
    marcarComoLido(){
      // animation: chamaAtencao .7s infinite alternate
      let btn = document.querySelector('#btn_'+this.id)

      console.log(btn)
    },
    montaGrafico(){
      var options = {
        chart: {
          width: this.tamGrafico,
          type: "radialBar",
        },
        series: [this.valorMeta, this.valorVoce, this.valorPrimeiro],
        colors: ['#0367A6', '#FB8C00', '#009921'],
        title: {
          text: this.titulo,
          align: 'center',
          offsetY: this.titOffsetY,
          style: {
            fontSize:  this.titFontSize,
            fontWeight:  'bold',
            color:  '#000'
          },
        },
        labels: [this.titMeta, this.titVoce, this.titPrimeiro],
        tooltip: {
          enabled: true,
          onDatasetHover: {
            highlightDataSeries: true,
          },
          custom: ({series, seriesIndex, vazio, w}) => {
            if(seriesIndex == '0'){
              return '<p class="tooltip meta">'+ w.config.labels[seriesIndex] + ': ' + this.metaFormatada +'</p>'
            }else if(seriesIndex == '1'){
              return '<p class="tooltip voce">'+ w.config.labels[seriesIndex] + ': ' + this.voceFormatada +'</p>'
            }else{
              return '<p class="tooltip primeiro">'+ w.config.labels[seriesIndex] + ': ' + this.primeiroFormatada +'</p>'
            }
          }
          // y: {
          //   formatter: () => {
          //     return ''
          //   },
          //   title: {
          //       formatter: (seriesName) => {
          //         return seriesName + ': ' + this.metaFormatada
          //       },
          //   },
          // }   
        },
        plotOptions: {
          radialBar: {
            startAngle: -110,
            endAngle: 110,
            hollow: {
              margin: 5,
              size: this.lineSize,
              background: 'transparent',
              image: undefined,
            },
            track: {
              background: "#CCC"
            },
            dataLabels: {
              name:{
                show: true,
                color: '#000',
                formatter: () => {
                  if(this.ranking == '0'){
                    return '---'
                  }else{
                    if(this.visivel){
                      return '#' + this.ranking
                    }else{
                      return '---'
                    }
                  }
                }
              },
              value: {
                color: '#000',
                fontSize: this.rankingFontSize,
                fontWeight:  'bold',
                formatter: (val) => {
                  return ''
                }
              },
              total: {
                show: true,
                color: '#000',
                fontSize: this.rankingFontSize,
                label: '#'+this.ranking,
                formatter: () => {
                  return 
                }
              }
            },
          }
        }
      }

      if(document.querySelector("#chart"+this.id)){
        document.querySelector("#chart"+this.id).innerHTML = ''
        var chart = new ApexCharts(document.querySelector("#chart"+this.id), options);
        chart.render();
      }
    },
    valueToPercent (value, max) {
      value = parseInt(value);
      let result = (value * 100) / max;
      return Math.round(result);
    },
    setSeta(seta){
      switch(seta){
        case 'up':
          return '<i class="fas fa-sort-up"></i>';
        case 'down':
          return '<i class="fas fa-sort-down"></i>';
        case 'mesmo':
          return '<i class="fas fa-sort-up"></i>';
        default:
          return '';
      }
    }
  },
  mounted(){
    if(this.status){
      this.montaGrafico()
    }
  },
  watch: {
    visivel(){
      if(this.visivel == true){
        this.montaGrafico()
      }else{
        this.montaGrafico()
      }
    }
  },
  computed: {
    ...mapGetters({
      visivel: 'getVisibilidade'
    })
  }
}
</script>