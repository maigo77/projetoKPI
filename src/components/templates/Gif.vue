<template>
  <div class="gif-container bg-transparent">
    <div class="gif bg-dark">
      <i class="fas fa-hourglass-start bg-dark"></i>
    </div>
    <p v-if="msg"> {{ msg }} </p>
  </div>
</template>

<script>
export default {
  props: ["msg"]
}
</script>