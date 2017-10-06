<template>
  <div class="navBar">
    <el-row>
      <el-col :span="2">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" 
        mode="horizontal" @select="handleSelect">
          <el-menu-item index="home"> 
            <img src="/static/iconoTienda.png">
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" 
        mode="horizontal" @select="handleSelect">
          <el-menu-item index="features">Features</el-menu-item>
          <el-menu-item index="pricing">Pricing</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" 
        mode="horizontal" @select="handleSelect">
          <el-menu-item index="auth">Sign In / Sign Up</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>    
  </div>
</template>

<script>

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