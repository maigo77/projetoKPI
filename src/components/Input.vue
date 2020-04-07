<template>
  <div class="form__group field">
    <input class="form__field" autocomplete="off" :type="type" :placeholder="placeholder" :name="name" :id='id' :required="required" />
    <label :for="name" class="form__label"> {{ descricao }} </label>
  </div>
</template>

<script>
export default {
  data(){
    return{
      descricao: ''
    }
  },
  props: {
    type: String,
    name: String,
    id: String,
    required: Boolean,
    placeholder: String
  },
  methods: {
    ajustaInput(){
      this.descricao = this.$props.placeholder
    }
  },
  mounted(){
    this.ajustaInput()
  }
}
</script>

<style>

</style>