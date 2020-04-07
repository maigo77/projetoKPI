import axios from "axios";

const apiTeste = axios.create({
  baseURL: "http://linux03/webservices/intergrallapi"
});

const apiTesteNew = axios.create({
  baseURL: "http://linux03/webservices/intergrallapi/kpi"
});

const api = axios.create({
  baseURL: "https://webproc.intergrall.com.br/webservices/intergrallapi"
});

export { apiTeste, api };
