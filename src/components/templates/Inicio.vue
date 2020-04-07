<template>
  <section class="inicio section-width">
    <Perfil />

    <ModalPerfil />

    <!-- <ModalPerfilDesempenho /> -->

    <ModalCarteira />

    <ModalExtrato />

    <ModalConquistas />
    
    <div id="bloco-central-lateral">
      <Carousel />

      <Informacoes />
    </div>
    
  </section>
</template>

<script>

import Perfil from '@/components/Perfil'
import ModalPerfil from '@/components/ModalPerfil'
// import ModalPerfilDesempenho from '@/components/ModalPerfilDesempenho'
import ModalCarteira from '@/components/ModalCarteira'
import ModalExtrato from '@/components/ModalExtrato'
import ModalConquistas from '@/components/ModalConquistas'
import Carousel from '@/components/Carousel'
import Informacoes from '@/components/Informacoes'

export default {
  components: {
    Perfil,
    ModalPerfil,
    // ModalPerfilDesempenho,
    ModalCarteira,
    ModalExtrato,
    ModalConquistas,
    Carousel,
    Informacoes
  }
};
</script>