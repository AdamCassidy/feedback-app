<template>
  <v-container>
    <h1 style="font-size: 37px">
      <router-link to="/" tag="span" style="cursor: pointer; color: #701487">
        <v-avatar class="mb-1">
          <img v-if="webpSupported" src="../../logo/logo.webp" />
          <img v-else src="../../logo/logo.png" /> </v-avatar
        >nd Opinion
      </router-link>
    </h1>
    <v-row>
      <v-col>
        <v-progress-circular
          v-if="loading && (post === undefined || post === null)"
          :size="50"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="post !== undefined && post !== null">
      <v-col>
        <v-card>
          <v-row justify="center">
            <v-col class="text-start">
              <v-card-title style="flex-wrap: wrap-reverse; word-break: normal">
                <h1 style="color: #701487">
                  {{ post.title }}
                </h1>
                <template v-if="userIsCreator">
                  <v-spacer></v-spacer>
                  <EditPostDialog :post="post"></EditPostDialog>
                </template>
              </v-card-title>

              <v-card-text class="text-start" style="font-size: 1.3rem">{{
                post.date | date
              }}</v-card-text>
              <div class="ms-2; mb-2">
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
              <v-row
                v-if="
                  post.displayUser && creator !== null && creator !== undefined
                "
                class="ms-2"
              >
                <v-avatar>
                  <img
                    v-if="creator.photoURL"
                    :src="transformImg(creator.photoURL)"
                  />
                  <img
                    v-if="!creator.photoURL && webpSupported"
                    src="../../logo/logo.webp"
                  />
                  <img
                    v-if="!creator.photoURL && !webpSupported"
                    src="../../logo/logo.png"
                  />
                </v-avatar>
                <v-col>
                  <h5>{{ creator.userName }}</h5>
                </v-col>
              </v-row>
              <v-card-text class="text-start" style="font-size: 1.3rem">{{
                post.context
              }}</v-card-text>

              <v-img
                v-if="post.imageUrl"
                style="margin: 15px"
                max-height="400"
                contain
                :src="transformImg(post.imageURL)"
              ></v-img>
              <v-divider></v-divider>
              <CommentSection :post="post"></CommentSection>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      webpSupported: true,
    };
  },
  props: ["id"],
  computed: {
    creator() {
      if (this.userIsCreator) {
        return this.user;
      } else {
        return this.$store.getters.creator(this.post.creatorId);
      }
    },
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
  methods: {
    transformImg(url) {
      if (this.webpSupported) {
        return url.replace(/\.\w{1,5}$/, ".webp");
      } else {
        return url;
      }
    },
  },
  created() {
    if (this.postCreator === null || this.postCreator === undefined) {
      this.$store.dispatch("loadUsers");
    }
    if (this.post === null || this.post === undefined) {
      this.$store.dispatch("loadPosts");
    }
    if (
      this.comments === null ||
      this.comments === undefined ||
      this.comments.length === 0
    ) {
      this.$store.dispatch("loadComments");
    }
    if (
      this.replies === null ||
      this.replies === undefined ||
      this.replies.length === 0
    ) {
      this.$store.dispatch("loadReplies");
    }
    async () => {
      if (!self.createImageBitmap) {
        this.webpSupported = false;
        return false;
      }

      const webpData =
        "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";
      const blob = await fetch(webpData).then((r) => r.blob());
      this.webpSupported = await createImageBitmap(blob).then(
        () => true,
        () => false
      );
    };
  },
  components: {
    CommentSection: () =>
      import(
        /* webpackChunkName: "CommentSection" */
        "../../components/Comments/CommentSection.vue"
      ),
    EditPostDialog: () =>
      import(
        /* webpackChunkName: "EditPostDialog" */
        "../../components/Edit/EditPost.vue"
      ),
  },
};
</script>

<style lang="scss">
.hidden {
  visibility: hidden;
}
</style>
