<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ store.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-store-details-dialog :store="store"></app-edit-store-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="store.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div>{{ store.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Add User</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
    
<script>
export default {
  props: ['id'],
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