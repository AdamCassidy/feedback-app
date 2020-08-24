<template>
  <div class="createPost">
    <h1>Create Post</h1>
    <v-container>
      <v-row>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-container>
                <form @submit.prevent="addToUsers">
                  <v-row>
                    <v-flex>
                      <v-file-input label="Upload Image" outlined prepend-icon="image"></v-file-input>
                      <v-text-field v-model="text" label="Title" required></v-text-field>
                      <v-text-field v-model="text" label="Context"></v-text-field>
                      <v-btn type="submit">Submit</v-btn>
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    addToUsersPosts() {
      console.log({
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
    },
  },
};
</script>