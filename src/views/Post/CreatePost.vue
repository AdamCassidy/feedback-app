<template>
  <div class="createPost">
    <h1>Create Post</h1>
    <v-container>
      <v-row>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-container>
                <form @submit.prevent="addPost">
                  <v-row>
                    <v-flex>
                      <v-text-field v-model="title" label="Title" single-line required></v-text-field>
                      <v-textarea v-model="context" label="Context" auto-grow></v-textarea>
                      <v-file-input
                        v-model="image"
                        label="Upload Image"
                        outlined
                        prepend-icon="image"
                      ></v-file-input>
                      <v-btn type="submit" :disabled="!validForm">Submit</v-btn>
                      <v-btn type="clear">Clear</v-btn>
                    </v-flex>
                  </v-row>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      context: "",
      image: "",
    };
  },
  methods: {
    addPost() {
      console.log({
        title: this.title,
        context: this.context,
        image: this.image,
      });
    },
  },
  computed: {
    validForm() {
      return this.title != "" && this.context != "" && this.image != "";
    },
  },
};
</script>