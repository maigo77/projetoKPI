import Vue from "vue"
import Toasted from "vue-toasted"
import axios from 'axios'
import { baseUrlApi } from '../metodos/metodos'

let defaultMessage = "Operação realizada com sucesso!"
let defaultError   = "Oops.. Erro inesperado"
let novaMensagem   = "Nova mensagem recebida!"
let erroLoginUsu   = "Problemas com o login do usuário"
let semFolgaDisp   = "Você não possui folgas disponíveis"
let diaIndisp      = "Dia indisponível para solicitar folga"
let jaPossuFolga   = "Você já possui uma folga para esse dia"
let marcadoLido    = "Marcado como lido"

Vue.use(Toasted, {
  iconPack: "fontawesome",
  duration: 3000
});

// Mensagens Padr�es
Vue.toasted.register(
  "defaultSuccess",
  payload => (!payload.msg ? defaultMessage : payload.msg),
  { type: "success", icon: "check" }
);

Vue.toasted.register(
  "defaultError",
  payload => (!payload.msg ? defaultError : payload.msg),
  { type: "error", icon: "times" }
);

// Notificacao Mensagem
Vue.toasted.register(
  "novaMensagem",
  payload => (!payload.msg ? novaMensagem : payload.msg),
  { type: "success", icon: "comment" }
);

// Mensagem para os Termos
Vue.toasted.register(
  "problemaLogin",
  payload => (!payload.msg ? erroLoginUsu : payload.msg),
  { type: "info", icon: "times" }
)

// Mensagens para Folga
Vue.toasted.register(
  "folgaIndisponivel",
  payload => (!payload.msg ? semFolgaDisp : payload.msg),
  { type: "error", icon: "times" }
)

Vue.toasted.register(
  "diaIndisponivel",
  payload => (!payload.msg ? diaIndisp : payload.msg),
  { type: "error", icon: "times" }
)

Vue.toasted.register(
  "jaPossuiFolga",
  payload => (!payload.msg ? jaPossuFolga : payload.msg),
  { type: "error", icon: "times" }
)

// Mensagens para noticias lidas
Vue.toasted.register(
  "marcarComoLido",
  payload => (!payload.msg ? marcadoLido : payload.msg),
  { type: "success", icon: "times" }
)

axios
  .post(`${baseUrlApi}webservices/intergrallapi/kpi/dicionario`)
    .then(
      response => {
        if(response.data.status == 'OK'){
          defaultMessage = response.data.TIT_MSG_PADRAO
          defaultError   = response.data.TIT_MSG_PADRAO_ERRO
          novaMensagem   = response.data.TIT_NOVA_MSG
          erroLoginUsu   = response.data.TIT_ERRO_LOGIN_USU
          semFolgaDisp   = response.data.TIT_SEM_FOLGA_DISP
          diaIndisp      = response.data.TIT_DIA_INDISP
          jaPossuFolga   = response.data.TIT_JA_POSSUI_FOLGA
          marcadoLido    = response.data.TIT_MARCADO_LIDO
        }
      }
    )
    .catch(
      error => {
        console.log('Erro no Dicionario: ', error)
      }
    )