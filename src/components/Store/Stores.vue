<template>
  <v-container>
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
  </v-container>
</template>