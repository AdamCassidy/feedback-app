<template>
  <v-div>
    <v-container>
      <v-row>
        <v-flex v-for="post in posts" :key="post.id" cols="12">
          <v-card>
            <v-card-title class="headline" v-text="post.title"></v-card-title>
            <v-card-subtitle v-text="post.date"></v-card-subtitle>
            <v-card-media :src="post.src"></v-card-media>
            <v-card-actions>
              <v-btn @click="'./post/' + post.id">
                <v-icon left>arrow_forward</v-icon>View
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-row>
    </v-container>
  </v-div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },
};
</script>