<template>
  <div class="home">
    <nav-bar></nav-bar>
    <img src="/static/iconoTienda.png">
    <h3>HOME</h3>
  </div>
</template>

<script>
import NavBar from '@/components/public/NavBar'

export default {
  name: 'home',
  components: {NavBar}
}
</script>

<style scoped>
img {
  height: 300px;
  width: 300px;
}
</style>