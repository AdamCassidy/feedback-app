<template>
  <v-container>
    <h1 style="font-size: 37px">
      <router-link to="/" tag="span" style="cursor: pointer; color: #701487">
        <v-avatar class="mb-1">
          <img v-if="webpSupported" src="../logo/logo.webp" />
          <img v-else src="../logo/logo.png" /> </v-avatar
        >nd Opinion
      </router-link>
    </h1>
    <v-divider></v-divider>
    <h3>Cooking</h3>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-progress-circular
          v-if="loading"
          :size="50"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="!loading" justify="center">
      <v-col v-for="post in posts" :key="post.id" cols="12">
        <v-card :to="'./posts/' + post.id" style="cursor: pointer">
          <v-row
            v-if="post.imageURL !== undefined && post.imageURL !== null"
            class="text-start"
          >
            <v-col xs="5" sm="4" md="3">
              <v-img
                :src="transformImg(post.imageURL)"
                max-height="150"
              ></v-img>
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
    <div v-if="posts" v-observe-visibility="loadPosts"></div>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      webpSupported: true,
    };
  },
  computed: {
    posts() {
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
    transformImg(url) {
      if (this.webpSupported) {
        return url.replace(/\.\w{1,5}$/, ".webp");
      } else {
        return url;
      }
    },
  },
  created() {
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
  created() {
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
};
</script>
