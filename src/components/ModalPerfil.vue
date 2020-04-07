<template>
  <div id="perfil-modal" class="modal">
    <div id="gerador-avatar">
      <div class="gerador-opcoes">
        
        <div class="opcoes"
          v-for="(titulo, indice) in categorias"
          :key="indice">
          <h2 :id="titulo" v-on:click="toggleListaOpcoes(titulo)"> {{ titulo }} <i class="fas fa-arrow-right"></i> </h2>
          <div class="lista-de-opcoes">
            <ul>
              <li
                v-for="(valor, indice) in todosOsTextos.avatar[titulo]"
                :key="indice"
                v-on:click="selecionaOpcao(titulo, indice)">
                {{ valor }}
              </li>
            </ul>
          </div>
        </div>

        <Botao :funcao="gravaAvatar" width="100%" :p="txtSalvar" :opacity="0.8" padding="15px" margin="10px auto"/>
      </div>
    </div>
  </div>
</template>

<script>

import { apiTeste } from '../services/api'
import { mapGetters, mapMutations } from 'vuex'
import { baseUrlApi } from '../metodos/metodos'
import axios from 'axios'

import Botao from './templates/Botao'

export default {
  data(){
    return{
        categorias: [],
        objOpcoes: {
          Cabelo : [
            "NoHair",
            "Eyepatch",
            "Hat",
            "Hijab",
            "Turban",
            "WinterHat1",
            "WinterHat2",
            "WinterHat3",
            "WinterHat4",
            "LongHairBigHair",
            "LongHairBob",
            "LongHairBun",
            "LongHairCurly",
            "LongHairCurvy",
            "LongHairDreads",
            "LongHairFrida",
            "LongHairFro",
            "LongHairFroBand",
            "LongHairNotTooLong",
            "LongHairShavedSides",
            "LongHairMiaWallace",
            "LongHairStraight",
            "LongHairStraight2",
            "LongHairStraightStrand",
            "ShortHairDreads01",
            "ShortHairDreads02",
            "ShortHairFrizzle",
            "ShortHairShaggyMullet",
            "ShortHairShortCurly",
            "ShortHairShortFlat",
            "ShortHairShortRound",
            "ShortHairShortWaved",
            "ShortHairSides",
            "ShortHairTheCaesar",
            "ShortHairTheCaesarSidePart"
          ],
          "Cor do Cabelo": [
            "Auburn",
            "Black",
            "Blonde",
            "BlondeGolden",
            "Brown",
            "BrownDark",
            "PastelPink",
            "Platinum",
            "Red",
            "SilverGray"
          ],
          Acessorio: [
            "Blank",
            "Kurt",
            "Prescription01",
            "Prescription02",
            "Round",
            "Sunglasses",
            "Wayfarers",
          ],
          Barba: [
            "Blank",
            "BeardMedium",
            "BeardLight",
            // "BeardMagestic",
            "MoustacheFancy",
            "MoustacheMagnum",
          ],
          // "Cor da Barba": [
          //   "Auburn",
          //   "Black",
          //   "Blonde",
          //   "BlondeGolden",
          //   "Brown",
          //   "BrownDark",
          //   "Platinum",
          //   "Red"
          // ],
          Roupa: [
            "BlazerShirt",
            "BlazerSweater",
            "CollarSweater",
            "GraphicShirt",
            "Hoodie",
            "Overall",
            "ShirtCrewNeck",
            "ShirtScoopNeck",
            "ShirtVNeck"
          ],
          // "Detalhe Roupa": [
          //   "Bat",
          //   "Cumbia",
          //   "Deer",
          //   "Diamond",
          //   "Hola",
          //   "Pizza",
          //   "Resist",
          //   "Selena",
          //   "Bear",
          //   "SkullOutline",
          //   "Skull"
          // ],
          // "Cor da Roupa":[
          //   "Black",
          //   "Blue01",
          //   "Blue02",
          //   "Blue03",
          //   "Gray01",
          //   "Gray02",
          //   "Heather",
          //   "PastelBlue",
          //   "PastelGreen",
          //   "PastelOrange",
          //   "PastelRed",
          //   "PastelYellow",
          //   "Pink",
          //   "Red",
          //   "White"
          // ],
          Olho: [
            "Close",
            "Cry",
            "Default",
            "Dizzy",
            "EyeRoll",
            "Happy",
            "Hearts",
            "Side",
            "Squint",
            "Surprised",
            "Wink",
            "WinkWacky"
          ],
          Sobrancelha: [
            "Angry",
            "AngryNatural",
            "Default",
            "DefaultNatural",
            "FlatNatural",
            "RaisedExcited",
            "RaisedExcitedNatural",
            "SadConcerned",
            "SadConcernedNatural",
            "UnibrowNatural",
            "UpDown",
            "UpDownNatural"
          ],
          Boca: [
            "Concerned",
            "Default",
            "Disbelief",
            "Eating",
            "Grimace",
            "Sad",
            "ScreamOpen",
            "Serious",
            "Smile",
            "Tongue",
            "Twinkle",
            "Vomit",
          ],
          "Cor da Pele": [
            "Tanned",
            "Yellow",
            "Pale",
            "Light",
            "Brown",
            "DarkBrown",
            "Black"
          ]
        },
        txtSalvar: 'Salvar',
        arrUrlCompleta: []
    }
  },
  components: {
    Botao
  },
  methods: {
    ...mapMutations(['setUrlAvatar', 'setSvgAvatar']),

    toggleListaOpcoes(id){
      let i = document.getElementById(id).firstElementChild
      this.$toggleClasse(i, 'setaGira')
      
      let divDaLista = document.getElementById(id).nextElementSibling
      this.$toggleClasse(divDaLista, 'aberto')
    },

    selecionaOpcao(tipoOpcao, opcao){
      this.arrUrlCompleta = this.urlAvatar.split('&')
      let encontrouPosicao = ''

      switch(tipoOpcao){
        // Talvez (com certeza) haja uma maneira melhor de fazer isso
        case 'Cabelo':
          encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'topType')  

          if(encontrouPosicao){
            this.arrUrlCompleta[encontrouPosicao] = 'topType='+opcao
          }else{
            this.arrUrlCompleta = this.arrUrlCompleta.concat('topType='+opcao)
          }

          break;
        case 'Cor do Cabelo':
          encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'hairColor')  

          if(encontrouPosicao){
            this.arrUrlCompleta[encontrouPosicao] = 'hairColor='+opcao
          }else{
            this.arrUrlCompleta = this.arrUrlCompleta.concat('hairColor='+opcao)
          }
          break;
        case 'Complemento':
          encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'accessoriesType')  

          if(encontrouPosicao){
            this.arrUrlCompleta[encontrouPosicao] = 'accessoriesType='+opcao
          }else{
            this.arrUrlCompleta = this.arrUrlCompleta.concat('accessoriesType='+opcao)
          }
          break;
        case 'Barba':
          encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'facialHairType')  

          if(encontrouPosicao){
            this.arrUrlCompleta[encontrouPosicao] = 'facialHairType='+opcao
          }else{
            this.arrUrlCompleta = this.arrUrlCompleta.concat('facialHairType='+opcao)
          }
          break;
        // case 'Cor da Barba':
        //   encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'facialHairColor')  

        //   if(encontrouPosicao){
        //     this.arrUrlCompleta[encontrouPosicao] = 'facialHairColor='+opcao
        //   }else{
        //     this.arrUrlCompleta = this.arrUrlCompleta.concat('facialHairColor='+opcao)
        //   }
        //   break;
        case 'Roupa':
          encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'clotheType')  

          if(encontrouPosicao){
            this.arrUrlCompleta[encontrouPosicao] = 'clotheType='+opcao
          }else{
            this.arrUrlCompleta = this.arrUrlCompleta.concat('clotheType='+opcao)
          }
          break;
        // case 'Detalhe Roupa':
        //   encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'graphicType')  

        //   if(encontrouPosicao){
        //     this.arrUrlCompleta[encontrouPosicao] = 'graphicType='+opcao
        //   }else{
        //     this.arrUrlCompleta = this.arrUrlCompleta.concat('graphicType='+opcao)
        //   }
        //   break;
        // case 'Cor da Roupa':
        //   encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'clotheColor')  

        //   if(encontrouPosicao){
        //     this.arrUrlCompleta[encontrouPosicao] = 'clotheColor='+opcao
        //   }else{
        //     this.arrUrlCompleta = this.arrUrlCompleta.concat('clotheColor='+opcao)
        //   }
        //   break;
        case 'Olhos':
          encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'eyeType')  

          if(encontrouPosicao){
            this.arrUrlCompleta[encontrouPosicao] = 'eyeType='+opcao
          }else{
            this.arrUrlCompleta = this.arrUrlCompleta.concat('eyeType='+opcao)
          }
          break;
        case 'Sobrancelhas':
          encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'eyebrowType')  

          if(encontrouPosicao){
            this.arrUrlCompleta[encontrouPosicao] = 'eyebrowType='+opcao
          }else{
            this.arrUrlCompleta = this.arrUrlCompleta.concat('eyebrowType='+opcao)
          }
          break;
        case 'Boca':
          encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'mouthType')  

          if(encontrouPosicao){
            this.arrUrlCompleta[encontrouPosicao] = 'mouthType='+opcao
          }else{
            this.arrUrlCompleta = this.arrUrlCompleta.concat('mouthType='+opcao)
          }
          break;
        case 'Cor da Pele':
          encontrouPosicao = this.buscaStrNoArray(this.arrUrlCompleta, 'skinColor')  

          if(encontrouPosicao){
            this.arrUrlCompleta[encontrouPosicao] = 'skinColor='+opcao
          }else{
            this.arrUrlCompleta = this.arrUrlCompleta.concat('skinColor='+opcao)
          }
          break;
        default:
          return false
      }

      // let arrayOrder = []
      // avatarStyle
      // topType
      // acessoriesType
      // hairColor
      // facialHairType
      // clotheType
      // eyeType
      // eyebrownType
      // mounthType
      // skinColor

      //https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Grimace&skinColor=Tanned

      let arrayChaveValor = []

      for(let i = 0; i < this.arrUrlCompleta.length; i++){
        let arrayAux = this.arrUrlCompleta[i].split('=')
        arrayChaveValor[arrayAux[0]] = arrayAux[1]
      }

      this.arrUrlCompleta = this.arrUrlCompleta.join('&')

      this.setUrlAvatar(this.arrUrlCompleta)
      this.requestAvatar(this.arrUrlCompleta)
      
    },
    buscaStrNoArray(arr, str){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].search(str) !== -1){
          return i
        }else{
          if(i == arr.length - 1){
            return false
          }
        }
      }
    },
    async requestAvatar(url){
      let objUrlAvatar = {
        url: url
      }

      objUrlAvatar = JSON.stringify(objUrlAvatar)

      await axios.
        post(`${baseUrlApi}webservices/intergrallapi/kpi/avatar/request`, objUrlAvatar)
        .then(
          response => {
            if(response.data.status == 'OK'){
              this.setSvgAvatar(response.data.dados)
            }else{
              console.log('Avatar nao foi encontrado: ', response.data)
            }
          }
        )
        .catch(
          error => {
            console.log('Nao foi possivel carregar o avatar: ', error)
          }
        )
    },
    gravaAvatar(){

      let urlCompleta = ''
      if(this.arrUrlCompleta.length == 0){
        urlCompleta = this.urlAvatar
      }else{
        urlCompleta = this.arrUrlCompleta
      }

      let objSalvarAvatar = {
        avatar: urlCompleta,
        acao: 'AVATAR_ATUALIZA'
      }

      objSalvarAvatar = JSON.stringify(objSalvarAvatar)

      axios
        .post(`${baseUrlApi}webservices/intergrall-api/kpi/userconfig`, objSalvarAvatar)
        .then(
          response => {
            if(response.data.status == 'OK'){
              if(document.querySelector('.toasted.toasted-primary.success')){
                return
              }else{
                this.$toasted.global.defaultSuccess();
              }
            }else{
              console.log('Salvar Avatar Status NOK: ', response.data)
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
            console.log('Nao foi possivel salvar o avatar: ', error)
            if(document.querySelector('.toasted.toasted-primary.error')){
              return
            }else{
              this.$toasted.global.defaultError();
            }
          }
        )
    }
    
  },
  computed: {
    ...mapGetters({
      todosOsTextos: 'getTodosOsTextos',
      svgAvatar: 'getSvgAvatar',
      urlAvatar: 'getUrlAvatar'
    })
  },
  mounted(){
    
    setTimeout(
      ()=> {
        this.txtSalvar  = this.todosOsTextos.TIT_CONFIG_SALVAR
        this.categorias = this.todosOsTextos.avatar.categorias
      }, 300
    )
  }
}
</script>