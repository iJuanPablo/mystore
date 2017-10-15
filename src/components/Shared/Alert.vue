<template>
  <!-- <v-alert error dismissible @input="onClose" :value="true">
    {{ text }}
  </v-alert> -->
  <v-snackbar 
    color="error"
    :timeout="6000"
    :top="true"
    :value="true"
  >
    {{ text }}
    <v-btn flat dark @click.native="onClose">Close</v-btn>
  </v-snackbar>
  </v-card>
</template> 

<script>
  export default {
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }
</script>