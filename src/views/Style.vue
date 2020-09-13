<template>
  <div class="hairstyle">
    <h1>Hairstyle</h1>
    <v-container>
      <v-row>
        <v-col v-for="post in posts" :key="post.id" cols="10">
          <v-card>
            <v-row>
              <v-col xs="4" sm="3" md="2">
                <v-img :src="post.imageURL"></v-img>
              </v-col>
              <v-col xs="6" sm="7" md="8">
                <v-card-title v-text="post.title"></v-card-title>
                <v-card-subtitle class=".justify-start">{{ post.date | date }}</v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn :to="'./post/' + post.id">
                    <v-icon left>arrow_forward</v-icon>View
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.getters.categorizedPosts("Style");
    },
  },
};
</script>