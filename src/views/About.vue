<template>
  <div>
    <h1 style="font-size: 37px; margin-top: 10px;">
      <router-link to="/" tag="span" style="cursor: pointer; color: #701487">
        <v-avatar class="mb-1">
          <img v-if="webpSupported" src="../logo/logo.webp" />
          <img v-else src="../logo/logo.png" /> </v-avatar
        >nd Opinion
      </router-link>
    </h1>
    <v-row v-if="loading">
      <v-col>
        <v-progress-circular
          v-if="loading"
          :size="50"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-parallax
      v-if="!loading && webpSupported"
      class="mt-4"
      src="../assets/sunglassesAbout.webp"
    >
      <v-row></v-row>
      <v-row class="mb-20" justify="center">
        <v-col class="ms-7">
          <h2 class="white--text">See through a different lens<br /></h2>
          <p class="white--text" style="font-size: 14px">
            A forum to gather opinions on whatever you post<br />
          </p>
          <v-btn v-if="!userIsAuthenticated" class="secondary" to="/signup"
            >Join</v-btn
          >
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row></v-row>
    </v-parallax>
    <v-parallax v-else src="../assets/sunglassesAbout.jpeg">
      <v-row></v-row>
      <v-row class="mb-20" justify="center">
        <v-col class="ms-7">
          <h2 class="white--text">See through a different lens<br /></h2>
          <p class="white--text" style="font-size: 14px">
            A forum to gather opinions on whatever you post<br />
          </p>
          <v-btn v-if="!userIsAuthenticated" class="secondary" to="/signup"
            >Join</v-btn
          >
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row></v-row>
    </v-parallax>
    <v-banner color="gradient">
      <h3 v-if="$vuetify.breakpoint.xs" class="white--text mt-6 ms-1">
        Share&nbsp;&nbsp;
      </h3>

      <v-row justify="center" class="me-1">
        <h3 v-if="!$vuetify.breakpoint.xs" class="white--text mt-6 ms-1">
          Share:&nbsp;&nbsp;
        </h3>

        <v-btn
          v-for="item in shareItems"
          color="secondary"
          :key="item.key"
          fab
          class="ma-2"
          transistion="scroll - y - reverse - transition"
        >
          <a :href="item.link" style="text-decoration: none">
            <v-icon color="white">{{ item.icon }}</v-icon>
          </a>
        </v-btn>
      </v-row>
    </v-banner>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      webpSupported: true,

      shareItems: [
        {
          icon: "mdi-facebook",
          link: "https://www.facebook.com/2ndOpinionForum/",
          color: "#3b5998",
        },
        {
          icon: "mdi-twitter",
          link:
            "https://twitter.com/intent/tweet?text=Check%20out%20this%20forum.&url=https%3a%2f%2fsecondopinionforum.com",
          color: "#00acee",
        },
        {
          icon: "mdi-reddit",
          link:
            "https://www.reddit.com/submit?title=Check%20out%20this%20forum.%20&url=https%3A%2F%2Fsecondopinionforum.com",
          color: "#FF4500",
        },
        {
          icon: "mdi-whatsapp",
          link:
            "https://wa.me/?text=Check%20out%20this%20forum.%20https%3A%2F%2Fsecondopinionforum.com",
          color: "#25d366",
        },
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
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

<style lang="scss">
@mixin gradient($start-color, $end-color, $orientation) {
  background: $start-color;

  @if $orientation== "vertical" {
    background: -webkit-linear-gradient(top, $start-color, $end-color);
    background: linear-gradient(to bottom, $start-color, $end-color);
  } @else if $orientation== "horizontal" {
    background: -webkit-linear-gradient(left, $start-color, $end-color);
    background: linear-gradient(to right, $start-color, $end-color);
  } @else {
    background: -webkit-radial-gradient(
      center,
      ellipse cover,
      $start-color,
      $end-color
    );
    background: radial-gradient(ellipse at center, $start-color, $end-color);
  }
}

.gradient {
  @include gradient(#701487, #bbc919, horizontal);
}
</style>
