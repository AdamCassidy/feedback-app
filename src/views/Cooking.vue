<template>
  <v-container>
    <h1 style="font-size: 37px">Second Opinion</h1>
    <v-divider></v-divider>
    <h3>Cooking</h3>
    <v-divider></v-divider>
    <v-row justify="center">
      <v-col v-for="post in posts" :key="post.id" cols="10">
        <v-card>
          <v-row>
            <v-col xs="5" sm="4" md="3">
              <v-img :src="post.imageURL"></v-img>
            </v-col>
            <v-col xs="4" sm="5" md="6">
              <v-card-title class="bold" style="font-size: 2.3rem" justify="start">{{post.title}}</v-card-title>
              <v-card-title justify="start">{{post.date | date}}</v-card-title>
              <v-card-actions>
                <v-btn :to="'./' + post.id">
                  <v-icon left>arrow_forward</v-icon>View
                </v-btn>
              </v-card-actions>
            </v-col>
            <v-col xs="1" sm="2" md="3">
              <div v-for="tag in post.tags" :key="tag.key">
                <v-chip class="mb-2" style="font-size: 21px">{{tag}}</v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.getters.categorizedPosts("Automotive");
    },
  },
};
</script>
