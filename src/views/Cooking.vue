<template>
  <v-container onload="loadPosts">
    <h1 style="font-size: 37px">
      <v-avatar class="mb-2">
        <img src="../logo/logo.png" />
      </v-avatar>nd Opinion
    </h1>
    <v-divider></v-divider>
    <h3>Cooking</h3>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-progress-circular v-if="loading" :size="50" indeterminate color="purple"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="!loading" justify="center">
      <v-col v-for="post in posts" :key="post.id" cols="12">
        <v-card :to="'./' + post.id" style="cursor: pointer">
          <v-row v-if="post.imageURL != undefined || post.imageURL != null">
            <v-col xs="5" sm="4" md="3">
              <v-img :src="post.imageURL"></v-img>
            </v-col>
            <v-col xs="7" sm="8" md="9">
              <v-card-title class="bold" style="font-size: 2.3rem; cursor: pointer">{{post.title}}</v-card-title>

              <v-card-title>{{post.date | date}}</v-card-title>
              <div class="text-start">
                <v-chip
                  v-for="tag in post.tags"
                  :key="tag.key"
                  color="#701487"
                  class="ma-2"
                  text-color="white"
                >{{tag}}</v-chip>
              </div>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <v-card-title class="bold" style="font-size: 2.3rem; cursor: pointer">{{post.title}}</v-card-title>

              <v-card-title>{{post.date | date}}</v-card-title>
              <div class="text-start">
                <v-chip
                  v-for="tag in post.tags"
                  :key="tag.key"
                  color="#701487"
                  class="ma-2"
                  text-color="white"
                >{{tag}}</v-chip>
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
    categorizedPosts() {
      return this.$store.getters.categorizedPosts("Cooking");
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    loadPosts() {
      this.$store.dispatch("loadPosts");
    },
  },
};
</script>
