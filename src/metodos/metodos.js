import Vue from "vue";

export let baseUrlApi = ''
if(window.location.hostname == 'localhost' || window.location.hostname == '192.168.204.126'){
 baseUrlApi = 'https://linux03/'
}else{
  baseUrlApi = 'https://'+window.location.hostname+'/'
}

// Fun��o que adiciona classe em um elemento
Vue.prototype.$addClasse = (elem, classe) => {
  elem.classList.add(classe)
}

// Fun��o que remove classe de um elemento
Vue.prototype.$removeClasse = (elem, classe) => {
  elem.classList.remove(classe)
}

// Fun��o que faz o toggle da classe de um elemento
Vue.prototype.$toggleClasse = (elem, classe) => {
  elem.classList.toggle(classe)
}

export default {
  baseUrlApi
};
