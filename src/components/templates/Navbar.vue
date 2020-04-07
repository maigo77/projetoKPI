<template>
  <nav id="navbar-superior">
    <div id="_progress"></div> 
    <ModalConfig /> 
  </nav>
</template>

<script>
  import ModalConfig from '../ModalConfig'

  export default {
    components: {
      ModalConfig
    },
    methods: {
      progress(){
        document.addEventListener("scroll", function() {
            var scrollTop = document.documentElement["scrollTop"] || document.body["scrollTop"];
            var scrollBottom = (document.documentElement["scrollHeight"] || document.body["scrollHeight"]) - document.documentElement.clientHeight;
            var scrollPercent = scrollTop / scrollBottom * 100 + "%";
            document.getElementById("_progress").style.setProperty("--scroll", scrollPercent);
          }
        );
      }
    },
    mounted() {
      this.progress()
    }
  };
</script>