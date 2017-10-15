<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon 
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title v-if="!userIsAuthenticated">
        <router-link to="/" tag="span" style="cursor: pointer">mystore</router-link>
      </v-toolbar-title>
      <v-toolbar-title v-if="userIsAuthenticated">
        <router-link to="/Dashboard" tag="span" style="cursor: pointer">mystore</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <app-alert v-if="errorAlert" @dismissed="onDismissed" :text="errorAlert.message"></app-alert>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'business', title: 'Stores', link: '/stores'},
            {icon: 'shopping_basket', title: 'Products', link: '/products'},
            {icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/dashboard')
          this.$store.dispatch('loadStores')
        } else {
          this.$router.push('/')
          this.$store.dispatch('clearUserData')
        }
      }
    }
  }

</script>

<style lang="stylus">
  @import './stylus/main'
</style>
