<template>
  <div class="navBar">
    <el-row>
      <el-col :span="2">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" 
        mode="horizontal" @select="handleSelect">
          <el-menu-item index="dashboard"> 
            <img src="/static/iconoTienda.png">
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" 
        mode="horizontal" @select="handleSelect">
          <el-menu-item index="stores">Stores</el-menu-item>
          <el-menu-item index="products">Products</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        
        <el-menu :default-active="activeIndex2" class="el-menu-demo" 
        mode="horizontal">
          <el-submenu index="2">
            <template slot="title">User</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item @click="logOut" index="2-3">Logout</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>    
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'navBar',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect: function (key, keyPath) {
      this.$router.replace(key)
    },
    logOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('home')
      })
    }
  }
}
</script>

<style scoped>
img {
  height: 55px;
  width: 55px;
}
</style>