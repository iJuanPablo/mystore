<template>
  <v-container class="mt-0">
    <v-dialog persistent v-model="loadingState">
      <app-loading></app-loading>
    </v-dialog>
    <v-toolbar dark class="primary mb-4">
      <v-btn
        v-if="userIsCreator"
        color="purple"
        dark
        small
        absolute
        bottom
        right
        fab
        @click.native.stop="showDialog = !showDialog"
      >
        <v-icon>edit</v-icon>
        <v-dialog width="400px" persistent v-model="showDialog">
          <store-basic-info 
            :store="store"
            action="Edit" 
            @close="showDialog = false"
          ></store-basic-info>
        </v-dialog>     
      </v-btn>
      <v-toolbar-title>{{ store.title }}</v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12 >
          <v-card >
            <v-container fluid class="elevation-5 pa-0">
              <v-layout row >
                <v-flex xs5 sm4 md3>
                  <v-card-media v-if="loadingImageState">
                    <app-loading-img></app-loading-img>
                  </v-card-media>
                  <v-card-media v-else
                    :src="store.thumbUrl"
                    height="100px"
                    ></v-card-media>
                  
                </v-flex>
                <v-flex xs7 sm8 md9>
                  <v-card-title>
                    {{ store.description}}
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
       
      </v-flex>
    </v-layout>
  </v-container>
</template>
    
<script>
import StoreBasicInfo from './Edit/StoreBasicInfo'

export default {
  props: ['id'],
  components: {
    StoreBasicInfo
  },
  data () {
    return {
      showDialog: false
    }
  },
  computed: {
    store () {
      return this.storeById(this.id)
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.user.id === this.store.creatorId
    }
  }
}
</script>