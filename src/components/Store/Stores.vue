<template>
  <v-container class="mt-0">
    <v-toolbar dark class="primary mb-4">
      <v-btn
        color="purple"
        dark
        small
        absolute
        bottom
        right
        fab
        @click.native.stop="showDialog = !showDialog"
      >
        <v-icon>add</v-icon>
        <v-dialog width="400px" persistent v-model="showDialog">
          <store-basic-info 
            :store="store"
            action="Create" 
            @close="showDialog = false"
          ></store-basic-info>
        </v-dialog>     
      </v-btn>
      <v-toolbar-title>Stores</v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap v-for="store in stores" :key="store.id" class="mb-2">
      <v-flex xs12>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="store.imageUrl"
                  height="130px"
                  ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ store.title }}</h5>
                    <div>{{ store.description }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/store/' + store.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Store
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loadingState"></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StoreBasicInfo from './Edit/StoreBasicInfo'

export default {
  components: {
    StoreBasicInfo
  },
  data () {
    return {
      showDialog: false,
      store: null
    }
  }
}
</script>