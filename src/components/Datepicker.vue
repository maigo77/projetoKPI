<template>
  <div id="date-picker">
    <ul class="">
      <li>
        <datepicker class="date-picker" v-model="date" :value="date" :language="ptBR" format="dd-MM-yyyy"></datepicker>
      </li>
      <li>
        <i class="far fa-calendar-alt" v-on:click="showDatePicker"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ptBR } from 'vuejs-datepicker/dist/locale';

  export default {
    data(){
      return {
        ptBR: ptBR,
        date: new Date(),
        
      }
    },
    components: {
      Datepicker
    },
    methods: {
      showDatePicker(){
          document.querySelector('#date-picker * input[type=text]').click();
          document.querySelector('#date-picker * input[type=text]').focus();
      },
      getValue(){
        return document.querySelector('#date-picker * input[type=text]').value;
      }
    }
  } 
</script>