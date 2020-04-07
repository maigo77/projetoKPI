<template>
  <div id="login-teste">
    <div id="form-login-teste" v-show="abrirLoginTeste" class="bg-dark">
      <h3> Login a ser analisado </h3>
      <hr>
      <input type="text" placeholder="Digite o login" v-model="login" v-on:keyup.enter="setLogin()"> <!-- :placeholder="`Login atual: ${loginAtual}`" -->
      <Botao width="150px" height="15px" p="Alterar" :opacity="0.8" padding="15px" margin="10px auto" :funcao="setLogin"/>
    </div>
    <div id="btn-login-teste" v-on:click="abrirLoginTeste = !abrirLoginTeste" class="bg-dark">
      <i class="fas fa-user-cog"></i>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Botao from './Botao'

import { baseUrlApi } from '../../metodos/metodos'

export default {
  data(){
    return{ 
      abrirLoginTeste: false,
      login: ''
    }
  },
  components: {
    Botao
  },
  methods: {
    setLogin(){
       if(this.login == '' || this.login.trim() == ''){
         return
       }else{
         this.login = this.login.trim()

         let objLoginSimulacao = { 
           login_simulacao: this.login
         }

         objLoginSimulacao = JSON.stringify(objLoginSimulacao)

         axios.
            post(`${baseUrlApi}webservices/intergrallapi/kpi/simulacao`, objLoginSimulacao)
          .then(
            response => {
              if(response.data.status == 'OK'){
                setTimeout(() => {
                  window.location.reload()
                }, 500)
                if(document.querySelector('.toasted.toasted-primary.success')){
                  return
                }else{
                  this.$toasted.global.defaultSuccess();
                }
              }else{
                console.log('Login Simulacao Status NOK: ', response.data)
                if(document.querySelector('.toasted.toasted-primary.error')){
                  return
                }else{
                  this.$toasted.global.defaultError();
                }
              }
            }
          )
          .catch(
            error => {
              console.log('Erro Login Simulacao: ', error)
              if(document.querySelector('.toasted.toasted-primary.error')){
                return
              }else{
                this.$toasted.global.defaultError();
              }
            }
          )
       }
    }
  }
}
</script>

<style>

</style>