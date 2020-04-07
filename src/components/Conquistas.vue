<template>
  <div :class="status" class="conquista">
    <i :class="icone" class="bg-transparent"></i>
    <h2>{{ titulo }}</h2>
  </div>
</template>

<script>
export default {
  props: ["icone", "titulo", "status"],
}
</script>

<style>

</style>