<template>
  <div>
    <webapp-header />
    <webapp-timer />
  </div>
</template>

<script>
import header from './views/Header.vue'
import timer from './views/Timer.vue'

export default {
  name: 'App',
  components: {
    'webapp-header':header,
    'webapp-timer':timer,
  },

  data(){
    return{
      
    }
  }
}
</script>

<style scoped>
  @import url("./assets/style.css");
</style>