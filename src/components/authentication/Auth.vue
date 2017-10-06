<template>
  <div class="auth">
    <nav-bar></nav-bar>

    <br><br>
    <el-row>
      <el-col :span="10">
        <img src="/static/iconoTienda.png">
      </el-col>
      <el-col :span="14">
        <h3>Sign In</h3>
        <el-input type="text" v-model="email" placeholder="Email" class="input"></el-input>
        <el-input type="password" v-model="password" placeholder="Password" class="input"></el-input>
        <el-button @click="signIn" type="success">Log In</el-button>

        <hr></hr>

        <h3>Sign Up</h3>
        <el-input type="text" v-model="emailNW" placeholder="Email" class="input"></el-input>
        <el-input type="password" v-model="passwordNW" placeholder="Password" class="input"></el-input>
        <el-button @click="signUp" type="info">Register</el-button>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import firebase from 'firebase'
import NavBar from '@/components/public/NavBar'

export default {
  name: 'authe',
  components: {NavBar},
  data: function () {
    return {
      email: '',
      password: '',
      emailNW: '',
      passwordNW: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('dashboard')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    },
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('dashboard')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
img {
  height: 300px;
  width: 300px;
}

hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 20px 60px;
    padding: 0;
}

.input {
  width: 180px;

}
</style>
