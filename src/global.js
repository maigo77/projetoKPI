// Ao inves de usar esse arquivo, as vari�veis globais est�o setadas dentro de metodos/metodos.js

import Vue from "vue";

export const baseApiUrl = "http://localhost:3001";

export function showError() {
  Vue.toasted.global.defaultError();
}

export default { baseApiUrl, showError };