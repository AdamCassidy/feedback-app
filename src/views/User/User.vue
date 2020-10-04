<template>
  <v-container>
    <h1 style="font-size: 37px">
      <v-avatar class="mb-2"> <img src="../../logo/logo.png" /> </v-avatar>nd
      Opinion
    </h1>
    <v-divider></v-divider>
    <h3 v-if="userIsAuthenticated">{{ user.name }}</h3>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-progress-circular
          v-if="loading"
          :size="50"
          indeterminate
          color="purple"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="!loading" justify="center">
      <v-col v-for="post in posts" :key="post.id" cols="12">
        <v-card
          :to="'./' + post.id"
          style="cursor: pointer; word-break: normal"
        >
          <v-row
            v-if="post.imageURL !== undefined && post.imageURL !== null"
            class="text-start"
          >
            <v-col xs="5" sm="4" md="3">
              <v-img :src="post.imageURL" max-height="150"></v-img>
            </v-col>
            <v-col xs="7" sm="8" md="9">
              <v-card-title
                class="bold"
                style="font-size: 2.3rem; cursor: pointer; word-break: normal"
                >{{ post.title }}</v-card-title
              >

              <p class="ms-4">{{ post.date | date }}</p>

              <div class="ms-2">
                <v-chip
                  v-for="tag in post.tags"
                  :key="tag.key"
                  color="#701487"
                  class="ma-2"
                  text-color="white"
                  >{{ tag }}</v-chip
                >
              </div>
            </v-col>
          </v-row>
          <v-row v-else class="text-start">
            <v-col>
              <v-card-title
                class="bold"
                style="font-size: 2.3rem; cursor: pointer; word-break: normal"
                >{{ post.title }}</v-card-title
              >

              <p class="ms-4">{{ post.date | date }}</p>
              <div class="ms-2">
                <v-chip
                  v-for="tag in post.tags"
                  :key="tag.key"
                  color="#701487"
                  class="ma-2"
                  text-color="white"
                  >{{ tag }}</v-chip
                >
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
  props: ["id"],
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    posts() {
      return this.$store.getters.userPosts;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    if (
      this.posts === null ||
      this.posts === undefined ||
      this.posts.length === 0
    ) {
      this.$store.dispatch("loadPosts");
    }
  },
};
</script>
