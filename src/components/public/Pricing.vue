<template>
  <div class="pricing">
    <nav-bar></nav-bar>
    <img src="/static/iconoTienda.png">
    <h1>Pricing</h1>
  </div>
</template>

<script>
import NavBar from '@/components/public/NavBar'

export default {
  name: 'pricing',
  components: {NavBar}
}
</script>

<style scoped>
img {
  height: 300px;
  width: 300px;
}
</style>