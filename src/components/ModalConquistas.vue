<template>
  <div id="conquistas-modal" class="modal">
    <div class="todas-conquistas">
      <Conquistas
        v-for="(conquista, i) in conquistas" :key="i"
        :icone="conquista.icone"
        :status="conquista.status"
        :titulo="conquista.titulo" />
    </div>
  </div>
</template>

<script>
import Conquistas from './Conquistas'

export default {
  data(){
    return {
      conquistas: [
        { icone: 'fas fa-award', status: 'adquirido', titulo: 'Título Conquista' },
        { icone: 'fab fa-algolia', status: 'adquirido', titulo: 'Título Conquista' },
        { icone: 'fas fa-certificate', status: 'bloqueado', titulo: 'Título Conquista' },
        { icone: 'fas fa-chalkboard-teacher', status: 'bloqueado', titulo: 'Título Conquista' },
        { icone: 'fas fa-crown', status: 'bloqueado', titulo: 'Título Conquista' },
        { icone: 'fas fa-dice-six', status: 'bloqueado', titulo: 'Título Conquista' },
        { icone: 'fas fa-cubes', status: 'bloqueado', titulo: 'Título Conquista' },
        { icone: 'fas fa-graduation-cap', status: 'bloqueado', titulo: 'Título Conquista' }
      ]
    }
  },
  components: {
    Conquistas
  }
}
</script>

<style>

</style>