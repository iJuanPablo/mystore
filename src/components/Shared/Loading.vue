<template>
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
</template>