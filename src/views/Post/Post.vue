<template>
  <v-container onload="load">
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
    <v-row v-if="!loading && post">
      <v-col>
        <v-card>
          <v-row>
            <v-col class="text-start">
              <v-card-title style="flex-wrap: wrap-reverse">
                <h1 style="color: #701487">{{ post.title }}</h1>
                <template v-if="userIsCreator">
                  <v-spacer></v-spacer>
                  <edit-post-dialog :post="post"></edit-post-dialog>
                </template>
              </v-card-title>

              <v-card-text class="text-start" style="font-size: 1.3rem">{{
                post.date | date
              }}</v-card-text>
              <v-card-text class="text-start" style="font-size: 1.3rem">{{
                post.context
              }}</v-card-text>
              <div class="ms-2">
                <v-chip
                  dark
                  v-for="tag in post.tags"
                  :key="tag.key"
                  color="#701487"
                  class="ma-2"
                  style="font-size: 21px"
                  >{{ tag }}</v-chip
                >
              </div>

              <v-img
                style="margin: 15px"
                max-height="400"
                contain
                :src="post.imageURL"
              ></v-img>
              <v-divider></v-divider>
              <comment-section :post="post"></comment-section>
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
    loading() {
      return this.$store.getters.loading;
    },
    post() {
      return this.$store.getters.post(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }

      return this.$store.getters.user.id === this.post.creatorId;
    },
  },
  watch: {
    post(value) {
      if (value === null || value === undefined) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    load() {
      this.$store.dispatch("loadPosts");
      this.$store.dispatch("loadComments");
      this.$store.dispatch("loadReplies");
    },
  },
};
</script>

<style lang="scss">
.hidden {
  visibility: hidden;
}
</style>
