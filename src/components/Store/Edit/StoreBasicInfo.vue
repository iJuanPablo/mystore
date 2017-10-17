<template>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>{{ action }} Store</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                required
              ></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="editedDescription"
                multi-line
                rows="3"
                required
              ></v-text-field>
              <v-btn raised class="primary" @click="onPickFile" accept="image/*">Upload Image</v-btn>
              <input 
                type="file" 
                style="display: none;" 
                ref="fileInput"
                @change="onFilePicked">
              <img :src="editedImageUrl" height="200px">
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" 
                @click="close"
              >Close</v-btn>
              <v-btn flat class="blue--text darken-1" 
                @click="onSaveChanges"
                :disabled="!formIsValid"
              >Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  
</template>

<script>
  export default {
    props: ['store', 'action'],
    data () {
      return {
        editedTitle: '',
        editedDescription: '',
        editedImageUrl: '',
        image: null
      }
    },
    created () {
      if (this.store) {
        this.editedTitle = this.store.title
        this.editedDescription = this.store.description
        this.editedImageUrl = ''
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.description !== ''
      }
    },
    methods: {
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.editedImageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
      onSaveChanges () {
        if (!this.formIsValid) {
          return
        }
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        if (this.action === 'Edit') {
          this.$store.dispatch('updateStoreData', {
            id: this.store.id,
            title: this.editedTitle,
            description: this.editedDescription,
            image: this.image
          })
        } else if (this.action === 'Create') {
          const store = {
            title: this.editedTitle,
            description: this.editedDescription,
            image: this.image
          }
          this.$store.dispatch('createStore', store)
        } else {
          return
        }
        this.$emit('close')
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>