<template>
  <v-div>
    <v-container>
      <v-row>
        <v-flex v-for="post in posts" :key="post.id" :to="post.link" cols="12">
          <v-card>
            <v-card-title class="headline" v-text="post.title"></v-card-title>
            <v-card-subtitle v-text="post.date"></v-card-subtitle>
            <v-card-media :src="post.src"></v-card-media>
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